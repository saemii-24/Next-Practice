import React from "react";
//https://tailwindcomponents.com/gradient-generator/

const Header = ({ text }: { text: string }) => {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-pink-500 h-10 font-bold flex items-center justify-center">
      <div className="container text-white flex items-center justify-center text-center">
        {text}
      </div>
    </div>
  );
};

export default Header;
