"use client";
import React from 'react';

const Input = ({ index,vals }:{index:number,vals:string}) => {
  return (
    <div className="relative">
      <input
        className="border-2 rounded-md border-gray-300 p-2 w-full text-center"
        type="text"
        value={vals}
        name={`input-${index}`}
        id={`input-${index}`}
        maxLength={12} 
        readOnly
      />
    </div>
  );
}

export default Input;
