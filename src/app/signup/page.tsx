"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface SignupFormData {
  id: string;
  password: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("가입 성공!");
      } else {
        setMessage("가입 실패!");
      }
    } catch (error) {
      console.error("가입 에러 발생!", error);
      setMessage("가입 실패!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Id:</label>
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
      <button type="submit">Sign Up</button>
      {message && <p>{message}</p>}
    </form>
  );
}