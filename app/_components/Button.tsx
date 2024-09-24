"use client";

import React from "react";

interface ButtonProps {
  buttonName: string;
}

export default function Button({ buttonName }: ButtonProps) {
  return (
    <div className="bg-[#255AB4] flex justify-center px-4 py-2.5 rounded-md hover:bg-[#255AB4]/75">
      <button>{buttonName}</button>
    </div>
  );
}
