import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/LayoutCadImovel.module.css';
import { SlEnergy } from "react-icons/sl";
import { MdBlock } from "react-icons/md";
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNavigation from '@/hooks/CadImovel';
import CardSelect from './components/CardSelect';
import '@fontsource/josefin-sans';

interface TipoReserva {
  name: string;
  value: number;
  icon: React.ReactNode;
}

const tipoReservas: TipoReserva[] = [
  { name: 'Reserva instantânea', value: 1, icon: <SlEnergy size={32} /> },
  { name: 'Reserva não instantânea', value: 2, icon: <MdBlock size={32} /> }
];

const TipoReserva: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItem, setSelectedItem] = React.useState<TipoReserva | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedSelection = localStorage.getItem("tipo_reserva");
    if (storedSelection) {
      const parsedSelection: TipoReserva = JSON.parse(storedSelection);
      setSelectedItem(parsedSelection);
    }
  }, []);

  const handleSelect = (item: TipoReserva) => {
    setSelectedItem(item);
    setError(null);
    localStorage.setItem("tipo_reserva", JSON.stringify(item));
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
            src="/assets/imgs/tipo-reserva-img.jfif"
            alt="Imagem de tipo de reserva"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <div className="flex flex-col items-center">
            <h1 className="mb-40 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
              Tipo de Reserva
            </h1>

            <div className="flex-shrink grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 rounded-md mb-60 mt-20">
              {tipoReservas.map((tipoReserva, index) => (
                <CardSelect
                  key={index}
                  name={tipoReserva.name}
                  selected={selectedItem?.value === tipoReserva.value}
                  icon={tipoReserva.icon}
                  onSelect={() => handleSelect(tipoReserva)}
                />
              ))}
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div className="flex justify-between items-center w-full mt-4">
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

export default TipoReserva;
