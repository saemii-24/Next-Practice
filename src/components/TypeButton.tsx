import React from "react";

const TypeButton = ({ type }: { type: string }) => {
  return (
    <button
      type="button"
      className={`mt-2 bg-${type} text-white px-2 py-[0.1rem] rounded-md text-xs font-medium`}
    >
      {type}
    </button>
  );
};

export default TypeButton;
