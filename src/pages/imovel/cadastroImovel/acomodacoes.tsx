import React from 'react';
import { FaUserFriends, FaBed, FaShower  } from 'react-icons/fa'
import { MdOutlineBedroomChild  } from "react-icons/md";
import { PiShippingContainerFill, PiFarm } from "react-icons/pi";
import { GiEcology } from "react-icons/gi";
import styles from '@/styles/LayoutCadImovel.module.css'
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans'; 

interface Acomodacao {
  name: string;
  icon: React.ReactNode;
}

const acomodacoes: Acomodacao[] = [
  { name: 'Quartos', icon: <MdOutlineBedroomChild size={32} /> },
  { name: 'Camas', icon: <FaBed size={32} /> },
  { name: 'Banheiros', icon: <FaShower size={32} /> },
  { name: 'Hóspedes', icon: <FaUserFriends size={32} /> },
];

const Acomodacoes: React.FC = () => {

  const { goToPreviousPage, goToNextPage } = useNavigation();

  function handleVaiCurintia()
  {
    localStorage.setItem("@stayeasy:imovel", "Olá mundo!");
  }

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
          Acomodações e Hóspedes
        </h1>
        <div className="grid grid-cols-2 gap-10 rounded-md mt-20">
          {acomodacoes.map((acomodacao, index) => (
            <div
              key={index}
              className="flex flex-col items-center border border-gray-400 justify-center bg-white p-4 h-40 w-40 rounded-lg"
            >
              <p className="text-gray-700">{acomodacao.icon}</p>
              <p className="mt-2 text-center font-josefin text-gray-700">{acomodacao.name}</p>
              <div className="">
                <input
                    type="number"
                    min="0"
                    className="mt-2 ml-2 w-full text-center p-1 text-black font-josefin"
                    placeholder={`0`}
                  />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center w-full mt-4">
          <IoIosArrowBack className="text-6xl cursor-pointer text-black" onClick={goToPreviousPage}/>
          <IoIosArrowForward className="text-6xl cursor-pointer text-black" onClick={handleVaiCurintia}/>
        </div>
      </div>
    </div>
    </>
  );
};

export default Acomodacoes;
