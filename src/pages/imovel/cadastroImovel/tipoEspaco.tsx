import React, { useEffect } from 'react';
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
          <h1 className="mb-4 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
            Tipo de espaço
          </h1>
          <div className="grid grid-cols-3 gap-10 rounded-md mt-20 mb-40">
            {rooms.map((room, index) => (
              <CardSelect
                key={index}
                name={room.name}
                selected={selectedItem?.value === room.value}
                onSelect={() => handleSelect(room)}
              />
            ))}
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

export default TipoEspaco;
