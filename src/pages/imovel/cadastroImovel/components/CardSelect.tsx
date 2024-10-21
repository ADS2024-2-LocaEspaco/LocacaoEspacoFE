interface CardSelectProps {
  name: string;
  value: string;
  icon?: React.ReactNode;
  selected: boolean;
  onSelect: (name: string, value: number) => void;
}

const CardSelect: React.FC<CardSelectProps> = ({ name, value, icon, selected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(name, value)} // Passando tanto o name quanto o value
      className={`flex flex-col items-center justify-center border p-4 h-40 w-40 rounded-lg cursor-pointer ${
        selected ? 'border-blue-500 bg-blue-100' : 'border-gray-400 bg-white'
      }`}
    >
      <p className="text-gray-700">{icon}</p>
      <p className="mt-2 text-center font-josefin text-gray-700">{name}</p>
    </div>
  );
};

export default CardSelect;
