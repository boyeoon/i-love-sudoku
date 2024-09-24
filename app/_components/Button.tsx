"use client";

import React from "react";

interface ButtonProps {
  buttonName: string;
  onClick: () => void;
  className?: string;
}

export default function Button({ buttonName, onClick }: ButtonProps) {
  return (
    <div className="bg-[#255AB4] flex justify-center px-4 py-2.5 rounded-md hover:bg-[#255AB4]/75">
      <button onClick={onClick}>
        {buttonName}
      </button>
    </div>
  );
}
