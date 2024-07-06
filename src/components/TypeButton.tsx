import React from "react";

const TypeButton = ({ type }: { type: string }) => {
  return (
    <button
      type="button"
      className="mt-2 bg-yellow-300 px-2 py-[0.1rem] rounded-md text-xs font-bold"
    >
      {type}
    </button>
  );
};

export default TypeButton;
