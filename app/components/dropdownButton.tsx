'use client';

import React, { useState } from 'react';

interface DropdownButtonProps {
  menuName: string;
  options: string[];
}

export default function DropdownButton({ menuName, options }: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div>
      <button onClick={toggleDropdown}>{menuName}</button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <p key={index}>{option}</p>
          ))}
        </div>
      )}
    </div>
  );
}
