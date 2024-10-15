import React from 'react';

export default function About() {
  return (
    <div className="content-between grid w-80 mt-4">
      <p>
        <span className="block text-2xl font-bold">About</span>
        <span>
          This app is one of my side projects. You can view the source code on&nbsp;
          <a className="font-bold underline decoration-double decoration-[#255AB4] hover:text-[#255AB4]" href="https://github.com/BoYeonJang/i-love-sudoku" target="_blank" rel="noopener noreferrer">GitHub</a>, created by Boyeon Jang.
        </span>
      </p>
    </div>
  );
}