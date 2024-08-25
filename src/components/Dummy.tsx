"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Dummy = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["dummyData"],
    queryFn: () => fetch("/api/dummy").then((res) => res.json()),
  });
  console.log(data);
  return <div>Dummy</div>;
};

export default Dummy;
