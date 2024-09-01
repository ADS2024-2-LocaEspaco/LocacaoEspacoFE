import React from 'react';
import { FaWifi, FaTv, FaCar, FaHammer } from 'react-icons/fa';
import { TbAirConditioning  } from "react-icons/tb";
import { MdKitchen, MdLocalLaundryService, MdAttachMoney } from "react-icons/md";
import { PiFanFill } from "react-icons/pi";
import styles from '@/styles/LayoutCadImovel.module.css'
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans'; 

interface Comodidade {
  name: string;
  icon: React.ReactNode;
}

const comodidades: Comodidade[] = [
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
          {comodidades.map((comodidade, index) => (
            <div
              key={index}
              className="flex flex-col items-center border border-gray-400 justify-center bg-white p-4 h-40 rounded-lg"
            >
              <p className="text-gray-700">{comodidade.icon}</p>
              <p className="mt-2 text-center font-josefin text-gray-700">{comodidade.name}</p>
            </div>
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
