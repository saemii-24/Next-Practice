"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import React from "react";

// postData 함수가 text 매개변수를 받도록 수정합니다.
const postData = async (text: string) => {
  const response = await fetch("/api/dummy", {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify({ text: "텍스트" }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

const Dummy = () => {
  // useQuery에서 isLoading, isError, data를 사용할 수 있습니다.
  const { isLoading, error, data } = useQuery({
    queryKey: ["dummyData"],
    queryFn: () => fetch("/api/dummy").then((res) => res.json()),
  });

  // useMutation에서 타입을 명시합니다.
  const mutation = useMutation({
    mutationFn: (text: string) => postData(text),
  });

  const handleClick = () => {
    // text를 인자로 넘겨줍니다.
    mutation.mutate("Hello, World!");
  };

  if (isLoading) return <div>Loading...</div>;
  if (mutation.isError) return <div>Error: {mutation.error.message}</div>;
  if (mutation.isSuccess)
    return <div>Success: {JSON.stringify(mutation.data)}</div>;

  return (
    <div>
      <button onClick={handleClick}>Send Data</button>
      {/* 데이터와 에러를 렌더링 */}
      {data && <div>Data: {JSON.stringify(data)}</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default Dummy;
