'use client';

import React from 'react';

interface ButtonProps {
  buttonName: string;
  onClick: () => void;
  className?: string;
}

export default function Button({ buttonName, onClick }: ButtonProps) {
  return (
    <div
      className='bg-[#255AB4] hover:bg-[#255AB4]/75 flex justify-center px-4 py-2.5 rounded-md cursor-pointer select-none text-lg font-bold'
      onClick={onClick}
    >
      {buttonName}
    </div>
  );
}