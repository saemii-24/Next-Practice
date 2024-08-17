"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface LoginFormData {
  id: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      id: data.id,
      password: data.password,
      callbackUrl: "/ ",
    });

    if (result?.error) {
      setMessage("로그인 실패!: " + result.error);
    } else if (result?.ok) {
      setMessage("로그인 성공!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>ID:</label>
        <input
          type="text"
          {...register("id", { required: "아이디를 작성해주세요!" })}
        />
        {errors.id && <span>{errors.id.message}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register("password", { required: "비밀번호를 작성해주세요!" })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
}
