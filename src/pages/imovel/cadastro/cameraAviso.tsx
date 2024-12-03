import React from 'react';
import Image from 'next/image';
import { FiCamera } from "react-icons/fi";
import styles from '@/styles/LayoutCadImovel.module.css'
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans';

const CameraAviso: React.FC = () => {

  const { goToPreviousPage, goToNextPage } = useNavigation();
  return (
    // Left Side
    <>
      <NavbarCadastro />
      <div className="flex h-screen overflow-hidden flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-full flex-1 flex-shrink-0 lg:block hidden">
          <Image
            src="/assets/imgs/atencao-img.jfif"
            alt="Imagem de imagens"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <div className="flex flex-col items-center">
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

export default CameraAviso;
