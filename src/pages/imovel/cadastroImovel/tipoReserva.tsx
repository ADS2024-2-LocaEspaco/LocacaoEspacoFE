import React from 'react';
import styles from '@/styles/LayoutCadImovel.module.css';
import { SlEnergy } from "react-icons/sl";
import { MdBlock } from "react-icons/md";
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import CardSelect from './components/CardSelect';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans'; 

interface TipoReserva {
  name: string;
  icon: React.ReactNode;
}

const tipoReservas: TipoReserva[] = [
  { name: 'Reserva instantânea', icon: <SlEnergy size={32} /> },
  { name: 'Reserva não instantânea', icon: <MdBlock size={32} /> }
];

const TipoReserva: React.FC = () => {

  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);


  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };

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
        <div className="text-gray-700 font-semibold text-center font-josefin">
          <h1 className="mb-40 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
            Tipo de Reserva
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-10 rounded-md mb-40">
          {tipoReservas.map((tipoReserva, index) => (
              <CardSelect
                key={index}
                name={tipoReserva.name}
                selected={selectedItem === tipoReserva.name}
                icon={tipoReserva.icon}
                onSelect={() => handleSelect(tipoReserva.name)}
              />
          ))}
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

export default TipoReserva;
