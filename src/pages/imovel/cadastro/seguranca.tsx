import React, { useEffect } from 'react';
import Image from 'next/image';
import { FaCloud, FaFireAlt, FaFirstAid, FaExclamationTriangle } from 'react-icons/fa';
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CardSelect from './components/CardSelect';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans';

interface SafetyItem {
  name: string;
  icon: React.ReactNode;
}

const safetyItems: SafetyItem[] = [
  { name: 'Detector de fumaça', icon: <FaCloud size={32} /> },
  { name: 'Extintor de incêndio', icon: <FaFireAlt size={32} /> },
  { name: 'Kit primeiros socorros', icon: <FaFirstAid size={32} /> },
  { name: 'Alarme de carbono', icon: <FaExclamationTriangle size={32} /> },
];

const Seguranca: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItems, setSelectedItems] = React.useState<SafetyItem[]>([]);

  useEffect(() => {
    const storedSelection = localStorage.getItem("seguranca");
    if (storedSelection) {
      const parsedSelection: SafetyItem[] = JSON.parse(storedSelection);
      setSelectedItems(parsedSelection);
    }
  }, []);

  const handleSelect = (item: SafetyItem) => {
    const isSelected = selectedItems.some(selected => selected.name === item.name);

    let updatedSelection: SafetyItem[];
    if (isSelected) {
      updatedSelection = selectedItems.filter(selected => selected.name !== item.name);
    } else {
      updatedSelection = [...selectedItems, item];
    }

    setSelectedItems(updatedSelection);
    localStorage.setItem("seguranca", JSON.stringify(updatedSelection));
  };

  return (
    <>
      <NavbarCadastro />
      <div className="flex h-screen">
        <div className="w-1/2">
          <Image
            src="/assets/imgs/seguranca-img.jfif"
            alt="Imagem de seguranca"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <div className="flex flex-col items-center">
            <h1 className="mb-4 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
              Segurança
            </h1>
            <div className="flex-shrink grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 rounded-md mt-40 mb-40">
              {safetyItems.map((safetyItem, index) => (
                <CardSelect
                  key={index}
                  name={safetyItem.name}
                  icon={safetyItem.icon}
                  selected={selectedItems.some(item => item.name === safetyItem.name)}
                  onSelect={() => handleSelect(safetyItem)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center w-full mt-4">
            <IoIosArrowBack className="text-6xl cursor-pointer text-black" onClick={goToPreviousPage} />
            <IoIosArrowForward className="text-6xl cursor-pointer text-black" onClick={goToNextPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Seguranca;
