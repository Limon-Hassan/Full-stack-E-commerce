import React from 'react';

const Checkbox = ({ label, ClassName, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked} 
        onChange={onChange} 
        className="hidden"
      />
      <div
        className={`${ClassName} w-5 h-5 flex items-center justify-center border-2 rounded ${
          checked ? 'bg-red-600 border-red-600' : 'border-red-400'
        }`}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span className="text-[16px] font-Poppins_FONT font-normal text-[#000] leading-6">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
