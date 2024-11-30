import React, { useEffect } from 'react';
import Image from 'next/image';
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNavigation from '@/hooks/CadImovel';
import CardSelect from './components/CardSelect';
import { FaPerson } from "react-icons/fa6";
import { PiBabyLight } from "react-icons/pi";
import { PiBabyCarriageLight } from "react-icons/pi";

interface tipoHospede {
    name: string;
    value: number;
    icon: React.ReactNode;
}

const TipoHospede: tipoHospede[] = [
    { name: 'Adultos', value: 1, icon: <FaPerson size={32} /> },
    { name: 'Crainças', value: 2, icon: <PiBabyLight size={32} /> },
    { name: 'Bebês', value: 3, icon: <PiBabyCarriageLight size={32} /> },
];

const tipoHospede: React.FC = () => {
    const { goToPreviousPage, goToNextPage } = useNavigation();
    const [selectedItem, setSelectedItem] = React.useState<tipoHospede | null>(null);

    useEffect(() => {
        const storedTiposHospede = localStorage.getItem('tipos_hospede');
        if (storedTiposHospede) {
            const parsedTiposHospede = JSON.parse(storedTiposHospede);
            setSelectedItem(parsedTiposHospede);
        }
    }, []);

    const handleSelect = (item: tipoHospede) => {
        setSelectedItem(item);
        localStorage.setItem('tipos_hospede', JSON.stringify(item));
    }

    return (
        <>
            <NavbarCadastro />
            <div className="flex h-screen overflow-hidden flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 h-full flex-1 flex-shrink-0 lg:block hidden">
                <Image
                    src="/assets/imgs/tipo-hospede-img.png"
                    alt="Imagem de camera"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                />
                </div>

                {/* Right Side */}
                <div className="w-full lg:w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
                    <div className="flex flex-col items-center">
                        <h1 className="mb-20 text-[36px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
                            Tipos de Hóspedes
                        </h1>
                        <p className="block text-gray-600 text-black font-bold mb-4">Selecione o tipo de hóspede que deseja receber:</p>
                        <div className="flex-shrink grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-10 rounded-md mt-4">
                            {TipoHospede.map((tipoHospede, index) => (
                                <CardSelect
                                    key={index}
                                    value={tipoHospede.value}
                                    name={tipoHospede.name}
                                    selected={selectedItem?.value == tipoHospede.value}
                                    icon={tipoHospede.icon}
                                    onSelect={() => handleSelect(tipoHospede)}
                                />
                            ))}
                        </div>
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

export default tipoHospede;