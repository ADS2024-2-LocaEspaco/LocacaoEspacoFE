import React, { useEffect } from 'react';
import Image from 'next/image';
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNavigation from '@/hooks/CadImovel';
import CardSelect from './components/CardSelect';
import '@fontsource/josefin-sans';

interface Room {
  name: string;
  value: number;
}

const rooms: Room[] = [
  { name: 'Espaço Inteiro', value: 1 },
  { name: 'Quarto Privativo', value: 2 },
  { name: 'Quarto Compartilhado', value: 3 },
];

const TipoEspaco: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItem, setSelectedItem] = React.useState<Room | null>(null);

  useEffect(() => {
    const storedSelection = localStorage.getItem("tipo_espaco");
    if (storedSelection) {
      const parsedSelection = JSON.parse(storedSelection);
      setSelectedItem(parsedSelection);
    }
  }, []);

  const handleSelect = (item: Room) => {
    setSelectedItem(item);
    localStorage.setItem("tipo_espaco", JSON.stringify(item));
  };

  return (
    <>
      <NavbarCadastro />
      <div className="flex h-screen overflow-visible">
        {/* Left Side */}
        <div className="w-1/2 h-full flex-1 flex-shrink-0">
        <Image
            src="/assets/imgs/tipo-espaco-img.png"
            alt="Imagem de tipo de espaço"
            width={500}
            height={500}
            className="w-full h-full object-cover"
        />
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex-1 flex-shrink-0 h-screen grid grid-rows-[auto_1fr_auto] bg-white p-4">
          {/* Title */}
          <h1 className="flex-1 flex-shrink-0 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
            Tipo de Espaço
          </h1>

          {/* Content */}
          <div className="grid grid-cols-3 flex-1 flex-grow-0 gap-10 rounded-md place-self-center">
            {rooms.map((room, index) => (
              <CardSelect
                key={index}
                name={room.name}
                selected={selectedItem?.value === room.value}
                onSelect={() => handleSelect(room)}
                value=""
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center w-full mt-4">
            <IoIosArrowBack
              className="text-6xl cursor-pointer text-black"
              onClick={goToPreviousPage}
            />
            <IoIosArrowForward
              className="text-6xl cursor-pointer text-black"
              onClick={goToNextPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TipoEspaco;
