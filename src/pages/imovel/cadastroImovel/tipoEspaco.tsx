import React from 'react';
import { FaRegBuilding, FaHouseUser } from 'react-icons/fa';
import { FaHouseChimney, FaTreeCity, FaTent   } from "react-icons/fa6";
import { MdOutlineHouseSiding } from "react-icons/md";
import { PiShippingContainerFill, PiFarm } from "react-icons/pi";
import { GiEcology } from "react-icons/gi";
import styles from '@/styles/LayoutCadImovel.module.css'
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans'; 

interface Espaco {
  name: string;
}

const espacos: Espaco[] = [
  { name: 'Espaço Inteiro' },
  { name: 'Quarto Privativo' },
  { name: 'Quarto Compartilhado'}
];

const TipoEspaco: React.FC = () => {

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
      <div>
        <h1 className="mb-4 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
          Tipo de espaço
        </h1>
      </div>
        <div className="grid grid-cols-3 gap-10 rounded-md mt-20 mb-40">
          {espacos.map((espaco, index) => (
            <div
              key={index}
              className="flex flex-col items-center border border-gray-400 justify-center bg-white h-40 w-40 p-4 text-xl rounded-lg"
            >
              <p className="mt-2 text-center font-josefin text-gray-700">{espaco.name}</p>
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

export default TipoEspaco;
