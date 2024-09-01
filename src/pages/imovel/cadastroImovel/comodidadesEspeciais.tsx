import React from 'react';
import { FaWifi, FaTv, FaSwimmingPool, FaUmbrellaBeach } from 'react-icons/fa';
import { TbAirConditioning  } from "react-icons/tb";
import { MdKitchen, MdLocalLaundryService, MdOutdoorGrill } from "react-icons/md";
import { RiBilliardsFill } from "react-icons/ri";
import { PiFanFill } from "react-icons/pi";
import styles from '@/styles/LayoutCadImovel.module.css'
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans'; 

interface ComodidadeEspecial {
  name: string;
  icon: React.ReactNode;
}

const comodidadesEspeciais: ComodidadeEspecial[] = [
  { name: 'Piscina', icon: <FaSwimmingPool size={32} /> },
  { name: 'Churrasqueira', icon: <MdOutdoorGrill size={32} /> },
  { name: 'Acesso à Praia', icon: <FaUmbrellaBeach size={32} /> },
  { name: 'Mesa de bilhar', icon: <RiBilliardsFill size={32} /> },
];

const ComodidadeEspecial: React.FC = () => {

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
        Comodidades Especiais
      </h1>
        <div className="grid grid-cols-2 gap-10 rounded-md mt-20">
          {comodidadesEspeciais.map((comodidadeEspecial, index) => (
            <div
              key={index}
              className="flex flex-col items-center border border-gray-400 justify-center bg-white p-4 h-40 w-40 rounded-lg"
            >
              <p className="text-gray-700">{comodidadeEspecial.icon}</p>
              <p className="mt-2 text-center font-josefin text-gray-700">{comodidadeEspecial.name}</p>
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

export default ComodidadeEspecial;
