import React from 'react';
import { useEffect } from 'react';
import { FaWifi, FaTv, FaCar, FaHammer } from 'react-icons/fa';
import { TbAirConditioning  } from "react-icons/tb";
import { MdKitchen, MdLocalLaundryService, MdAttachMoney } from "react-icons/md";
import { PiFanFill } from "react-icons/pi";
import styles from '@/styles/LayoutCadImovel.module.css'
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import CardSelect from './components/CardSelect';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans'; 

interface Amenity {
  name: string;
  icon: React.ReactNode;
}

const amenities: Amenity[] = [
  { name: 'Wi-fi', icon: <FaWifi size={32} /> },
  { name: 'TV', icon: <FaTv size={32} /> },
  { name: 'Cozinha', icon: <MdKitchen size={32} /> },
  { name: 'Maquina de Lavar', icon: <MdLocalLaundryService size={32} /> },
  { name: 'Ar-Condicionado', icon: <TbAirConditioning size={32} /> },
  { name: 'Estacionamento', icon: <FaCar size={32} /> },
  { name: 'Estacionamento Pago', icon: <MdAttachMoney size={32} /> },
  { name: 'Espaço de Trabalho', icon: <FaHammer size={32} /> },
  { name: 'Ventilador', icon: <PiFanFill size={32} /> },
];

const Comodidade: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  useEffect(() => {
    console.log(localStorage.getItem("@stayeasy:imovel"));
  }, []);

  
  function getSelectable(selectedItem: string | null)
  {
    if(selectedItem){
      localStorage.setItem("@form:comodidade", selectedItem);
    }
  }


  const handleSelect = (item: string) => {
    setSelectedItem(item);
    getSelectable(item);
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
        Comodidades
      </h1>
        <div className="grid grid-cols-3 gap-10 rounded-md mt-20">
          {amenities.map((ameneity, index) => (
              <CardSelect
                key={index}
                name={ameneity.name}
                selected={selectedItem === ameneity.name}
                icon={ameneity.icon}
                onSelect={() => handleSelect(ameneity.name)}
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

export default Comodidade;
