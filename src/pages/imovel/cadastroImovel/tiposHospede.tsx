import React from 'react';
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNavigation from '@/hooks/CadImovel';
import { FaPerson } from "react-icons/fa6";
import { PiBabyLight } from "react-icons/pi";
import { PiBabyCarriageLight } from "react-icons/pi";

interface tiposHospede {
    name: string;
    icon: React.ReactNode;
}

const TiposHospede: tiposHospede[] = [
    { name: 'Adultos', icon: <FaPerson size={32} /> },
    { name: 'Crainças', icon: <PiBabyLight size={32} /> },
    { name: 'Bebês', icon: <PiBabyCarriageLight size={32} /> },
];

const tiposHospede: React.FC = () => {
    const { goToPreviousPage, goToNextPage } = useNavigation();
    return (
        <>  {/* Left Side */}
            <NavbarCadastro />
            <div className="flex h-screen">
                <div className="w-1/2">
                    <img
                        src="https://s3-alpha-sig.figma.com/img/dbc3/7368/b1a08463f573ddb97543b76154339184?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d0pwqVCDrLuVsGQ1Pe5~RtnzkEry-A~E90kEwD57h77FuPpXEryhcWyCzObl9VpoBvMo6c9xlloA97lSI5-xl7FKgAMKzRK0q1tlVZlPiqQkVY~2vE63OAVYWtEavNxvzctTa7iFI-i1BDDLIkQdFLk3lSxM5QWeBI7ym2rl-~bLRdJ~nAf0SoEiFRFgm3CLaBpx8gexzMmAu1nXeu7lvtn5kqj4sSlYwTyb9giaaZifJQf5m3gnodt7qNcr4yB7V~dr0JMPhF9-gfn8nRoTzu5UxFe~pPC5zWS1AxoULb4k6MJdGMKPpcECfvdffhv8OGWMWAapTiq6hbABOO3XLg__"
                        alt="Imagem de imóvel"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Side */}
                <div className="w-1/2 flex flex-col justify-start items-center p-4 bg-white">
                    <h1 className="mb-20 text-[36px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
                        Tipos de Hóspedes
                    </h1>
                    <p className="block text-gray-600 text-black font-bold mb-4">Selecione o tipo de hóspede que deseja receber:</p>
                    <div className="grid grid-cols-3 gap-10 rounded-md mt-4">
                        {TiposHospede.map((tipoHospede, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center border border-gray-400 justify-center bg-white p-4 h-40 w-40 rounded-lg"
                            >
                                <p className="text-gray-700">{tipoHospede.icon}</p>
                                <p className="text-center font-josefin text-gray-700">{tipoHospede.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center w-full mt-24">
                        <IoIosArrowBack className="text-6xl cursor-pointer text-black" onClick={goToPreviousPage} />
                        <IoIosArrowForward className="text-6xl cursor-pointer text-black" onClick={goToNextPage} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default tiposHospede;