import React from 'react';
import { FaUserFriends, FaBed, FaShower  } from 'react-icons/fa'
import { MdOutlineBedroomChild  } from "react-icons/md";
import { FiCamera } from "react-icons/fi";
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
        <h1 className="mb-20 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
          Atenção!
        </h1>
        <div className="flex flex-col justify-center items-center">
            <div>
                <FiCamera className="h-16 w-16 mb-10 text-red-600" />
            </div>
            <div className="mb-40">
                <h2 className="mb-4 text-[35px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
                    <span className="text-red-600 font-bold">!</span> Câmeras de segurança nos espaços internos não são permitidas, mesmo quando desligadas.
                </h2>
                <h2 className="mb-4 text-[35px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
                    <span className="text-red-600 font-bold">!</span> Todas as câmeras disponíveis na acomodação deve ser informadas no cadastro do imóvel.
                </h2>
            </div>
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

export default Acomodacoes;
