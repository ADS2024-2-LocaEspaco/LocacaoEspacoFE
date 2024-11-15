import React from 'react';
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
    <div className="flex h-screen">
      <div className="w-1/2">
        <img
          src="https://s3-alpha-sig.figma.com/img/3e8e/4bb0/e6350a8eb6bab056ae304b6c2912325b?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OmKhoTynFacnIDmnwp9ozG23X4IMWkmc5g7-LK1826IM2ohpcC~oCJG-mU6j68o8fuESxdiuQhuPK8rj5IPy~Fp8IlUkzK4zxBWslI4o9kHseElzq5~xldWxKNsKDPheildX6AuUD~9Quwa-Yxv47xL4HIxfapRMUqPhpcrqkHk9baSbPS~3NeG~NtmjDZmGPJy02hDjF8qIAwgTI3WNUeeJTeDnwfGkd5cUrPs70au7wyn0h7f05fl~OqA5dHNE1Msv6yzOAenx3-9ja6GjoW9sPGTiK8~im0axQVzYuucC1U-IRDMXqMjPyPBpsrIfU1rXGqAi60Ez05voPlO7Fw__"
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

export default CameraAviso;
