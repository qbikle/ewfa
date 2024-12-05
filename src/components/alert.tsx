import React from "react";

interface AlertProps {
  text: string;
  logo: React.ReactNode;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ text, logo, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 flex items-center p-4 bg-white border rounded-lg shadow-lg z-[999999999999]">
      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
        {logo}
      </div>
      <div className="ml-3 text-sm font-medium text-gray-800">{text}</div>
      <button
        onClick={onClose}
        className="ml-4 bg-transparent border p-2 py-1 text-black hover:text-white hover:bg-accent-900 brightness-50 focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};

export default Alert;
