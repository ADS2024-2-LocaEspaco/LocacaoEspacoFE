import React from 'react';
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans';

const prototipo: React.FC = () => {
    const { goToPreviousPage, goToNextPage } = useNavigation();
    
    return (
        <>
            <NavbarCadastro />
            {/* Main Container */}
            <div className="flex flex-col md:flex-row h-screen">
                {/* Left Side */}
                <div className="w-full md:w-1/2">
                    <img
                        src="https://via.placeholder.com/800x600"
                        alt="Imagem de imóvel"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2 flex flex-col justify-start items-center p-4 bg-white">
                    <h1 className="mb-4 text-3xl text-gray-700 font-semibold">Título e descrição</h1>
                    <div className="w-full px-8">
                        
                    </div>
                    <div className="flex justify-between items-center w-full mt-4">
                        <IoIosArrowBack className="text-6xl cursor-pointer text-black" onClick={goToPreviousPage} />
                        <IoIosArrowForward className="text-6xl cursor-pointer text-black" onClick={goToNextPage} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default prototipo;