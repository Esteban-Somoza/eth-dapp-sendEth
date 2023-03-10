import React from 'react';

export const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step='0.0001'
    value={value}
    onChange={e => handleChange(e, name)}
    className='my-2 w-full rounded-sm p-2 outline-none bh-transparent text-white border-none text-sm white-glassmorphism' />
);
