import React from 'react';
import { CiShare2, CiMap, CiHeart } from "react-icons/ci";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineShower } from "react-icons/md";
import { FiUsers  } from "react-icons/fi";
import styles from '@/styles/LayoutCadImovel.module.css'
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans'; 

interface Prototipo {
  name: string;
  amount?: number;
  icon: React.ReactNode;
}

const prototipos: Prototipo[] = [
  { name: 'Hospedes', amount: 2, icon: <FiUsers size={20} /> },
  { name: 'Quartos', amount: 2, icon: <IoBedOutline size={20} /> },
  { name: 'Banheiros', amount: 1, icon: <MdOutlineShower size={20} /> },
];

const Prototipo: React.FC = () => {

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
          Protótipo
        </h1>
        <div className="flex flex-col border border-gray-500 p-10 w-full h-auto rounded-2xl font-black text-gray-800">
          <div className="flex justify-start font-josefin text-2xl">
              Nome do Local
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 w-full h-auto border border-gray-400 rounded-lg">
              <img
                  src="https://via.placeholder.com/400x300"
                  alt="Imagem de imóvel"
                  className="w-200 h-300 object-cover"
              />
              <img
                  src="https://via.placeholder.com/400x300"
                  alt="Imagem de imóvel"
                  className="w-200 h-300 object-cover"
              />
          </div>
          <div className="flex w-full mt-4 space-x-4">
              <div className="flex justify-start gap-2">
                  {prototipos.map((prototipo, index) => (
                  <div key={index} className="border rounded-2xl p-2 gap-3 flex items-center space-x-2 bg-orange-200 font-josefin">
                      <span className="text-blue-500">
                          {prototipo.icon}
                      </span>
                      {prototipo.amount}
                  </div>
                  ))}
              </div>
              <div className="flex w-full justify-end gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 border rounded-3xl hover:bg-blue-600 focus:outline-none font-josefin">
                      <CiMap size={20}/>
                      Veja o Mapa
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border rounded-3xl hover:bg-gray-200 focus:outline-none">
                      <CiShare2 size={20}/>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border rounded-3xl hover:bg-gray-200 focus:outline-none">
                      <CiHeart size={20}/>
                  </button>
              </div>
          </div>
          <div className="flex col-span-2">
            <div className="flex-grow mt-20">
              <div className="flex items-center">
                <img
                    src="https://via.placeholder.com/400x300"
                    alt="Imagem de imóvel"
                    className="w-24 h-24 rounded-full object-cover float-left mr-4"
                />
                <h2 className="text-2xl font-josefin text-gray-700">
                    Lucas Santos
                </h2>
              </div>
                {/* TODO: The first line of text needs to be alongside the image */}
              <div className="p-2">
                  <p className="text-lg font-josefin font-thin text-gray-700">
                    Quando o texto ocupa mais de uma linha, ele automaticamente vai fluir abaixo da imagem. 
                    Isso é feito usando o CSS float na imagem, fazendo com que o conteúdo flua ao redor dela 
                    de forma natural. As linhas subsequentes, após a altura da imagem, ocupam todo o espaço 
                    disponível.
                  </p>
              </div>
            </div>
            <div className="flex-grow items-start ml-4 mt-20 border border-gray-400 rounded-xl p-8 w-full text-left">
              <span className="block text-xl font-josefin text-gray-700 text-orange-500">R$ 950 / diária</span>
              <span className="block text-md font-josefin text-gray-700 mt-2 font-thin">Endereço</span>
            </div>
          </div>
        </div>
        <div className="w-full mt-4">
          <label className="inline-flex">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
            <p className="ml-2 text-gray-700 font-josefin">Eu li e concordo com os termos da <span className='text-blue-800'>Política e Privacidade</span></p>
          </label>
        </div>
        <div className="w-full mt-4 flex justify-end">
          <button className="px-12 py-4 mt-4 text-white bg-blue-500 border rounded-3xl hover:bg-blue-600 focus:outline-none font-josefin">
              Cadastrar
          </button>
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

export default Prototipo;
