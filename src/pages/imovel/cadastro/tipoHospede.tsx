import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNavigation from '@/hooks/CadImovel';
import CardSelect from './components/CardSelect';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as TbIcons from 'react-icons/tb';
import * as PiIcons from 'react-icons/pi';
import * as LiaIcons from 'react-icons/lia';

interface TipoHospede {
    hospede: string;
    id: number;
    icone: string; // Nome do ícone
}

const TipoHospede: React.FC = () => {
    const { goToPreviousPage, goToNextPage } = useNavigation();
    const [selectedItem, setSelectedItem] = React.useState<TipoHospede | null>(null);
    const [tiposHospede, setTiposHospede] = useState<TipoHospede[]>([]);
    const [error, setError] = useState<string | null>(null);

    const resolveIcon = (iconName: string): React.ReactNode => {
        const iconLibrary = { ...FaIcons, ...MdIcons, ...TbIcons, ...PiIcons, ...LiaIcons };
        const IconComponent = iconLibrary[iconName];
        return IconComponent ? <IconComponent size={32} /> : null;
    };

    useEffect(() => {
        const fetchTiposHospede = async () => {
            try {
                const response = await fetch('http://localhost:3000/anuncio/get-tipo-hospede');
                if (!response.ok) {
                    throw new Error('Erro ao buscar tipos de hóspedes');
                }
                const data: TipoHospede[] = await response.json();

                // Adicionar os ícones resolvidos
                const tiposHospedeComIcones = data.map(item => ({
                    ...item,
                    iconeComponente: resolveIcon(item.icone),
                }));

                setTiposHospede(tiposHospedeComIcones);
            } catch (error) {
                console.error('Erro ao buscar tipos de hóspedes:', error);
            }
        };

        fetchTiposHospede();

        // Carregar seleção do localStorage
        const storedTiposHospede = localStorage.getItem('tipos_hospede');
        if (storedTiposHospede) {
            const parsedTiposHospede = JSON.parse(storedTiposHospede);
            setSelectedItem(parsedTiposHospede);
        }
    }, []);

    const handleSelect = (item: TipoHospede) => {
        setSelectedItem(item);
        setError(null);
        localStorage.setItem('tipos_hospede', JSON.stringify(item));
    };

    const validateFields = () => {
        if (!selectedItem) {
            setError('Por favor, selecione uma opção antes de continuar.');
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validateFields()) {
            goToNextPage();
        }
    };

    return (
        <>
            <NavbarCadastro />
            <div className="flex h-screen overflow-hidden flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 h-full flex-1 flex-shrink-0 lg:block hidden">
                    <Image
                        src="/assets/imgs/tipo-hospede-img.png"
                        alt="Imagem de tipos de hóspedes"
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
                        <p className="block text-gray-600 text-black font-bold mt-4 mb-4">Selecione o tipo de hóspede que deseja receber:</p>
                        <div className="flex-shrink grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-10 rounded-md mt-4">
                            {tiposHospede.map((tipoHospede, index) => (
                                <CardSelect
                                    key={index}
                                    value={tipoHospede.id}
                                    name={tipoHospede.hospede}
                                    selected={selectedItem?.id === tipoHospede.id}
                                    icon={tipoHospede.iconeComponente}
                                    onSelect={() => handleSelect(tipoHospede)}
                                />
                            ))}
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                    </div>

                    <div className="flex justify-between items-center w-full mt-24">
                        <IoIosArrowBack className="text-6xl cursor-pointer text-black" onClick={goToPreviousPage} />
                        <IoIosArrowForward
                            className="text-6xl cursor-pointer text-black"
                            onClick={handleNext}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TipoHospede;
