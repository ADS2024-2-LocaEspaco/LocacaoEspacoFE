import React from 'react';
import { WiSmoke } from "react-icons/wi";
import { FaWifi, FaTv, FaSwimmingPool, FaUmbrellaBeach, FaFireAlt, FaCloud, FaFirstAid, FaExclamationTriangle  } from 'react-icons/fa';
import { TbAirConditioning  } from "react-icons/tb";
import { MdKitchen, MdLocalLaundryService, MdOutdoorGrill } from "react-icons/md";
import { RiBilliardsFill } from "react-icons/ri";
import { PiFanFill } from "react-icons/pi";
import styles from '@/styles/LayoutCadImovel.module.css'
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
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
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);



  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };

  return (
    // Left Side
  <>
    <NavbarCadastro />
    <div className="flex h-screen">
      <div className="w-1/2">
        <img
          src="https://via.placeholder.com/800x600"
          alt="Imagem de imóvel"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col justify-center items-center p-4 bg-white">
      <h1 className="mb-4 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
        Segurança
      </h1>
        <div className="grid grid-cols-2 gap-10 rounded-md mt-20">
          {safetyItems.map((safetyItem, index) => (
            <CardSelect
              key={index}
              name={safetyItem.name}
              icon={safetyItem.icon}
              selected={selectedItem === safetyItem.name}
              onSelect={() => handleSelect(safetyItem.name)}
            />
          ))}
        </div>
        <div className="flex justify-between items-center w-full mt-4">
          <IoIosArrowBack className="text-6xl cursor-pointer text-black" onClick={goToPreviousPage}/>
          <IoIosArrowForward className="text-6xl cursor-pointer text-black" onClick={goToNextPage}/>
        </div>
      </div>
    </div>
    </>
  );
};

export default Seguranca;
