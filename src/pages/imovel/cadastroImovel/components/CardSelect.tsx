import React from 'react';

interface CardSelectProps {
  name: string;
  icon?: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}

const CardSelect: React.FC<CardSelectProps> = ({ name, icon, selected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`flex flex-col items-center justify-center border p-4 h-40 rounded-lg cursor-pointer ${
        selected ? 'border-blue-500 bg-blue-100' : 'border-gray-400 bg-white'
      }`}
    >
      <p className="text-gray-700">{icon}</p>
      <p className="mt-2 text-center font-josefin text-gray-700">{name}</p>
    </div>
  );
};

export default CardSelect;
