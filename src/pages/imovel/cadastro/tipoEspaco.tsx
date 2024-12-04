import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNavigation from '@/hooks/CadImovel';
import CardSelect from './components/CardSelect';
import '@fontsource/josefin-sans';

interface Room {
  espaco: string;
  id: number;
}

const TipoEspaco: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItem, setSelectedItem] = React.useState<Room | null>(null);
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:3000/anuncio/get-tipo-espaco');
        if (!response.ok) {
          throw new Error('Erro ao buscar tipos de espaço');
        }
        const data: Room[] = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Erro ao buscar tipos de espaço:', error);
      }
    };

    fetchRooms();

    const storedSelection = localStorage.getItem("tipo_espaco");
    if (storedSelection) {
      const parsedSelection = JSON.parse(storedSelection);
      setSelectedItem(parsedSelection);
    }
  }, []);

  const handleSelect = (item: Room) => {
    setSelectedItem(item);
    setError(null); 
    localStorage.setItem("tipo_espaco", JSON.stringify(item));
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
        {/* Left Side */}
        <div className="w-full lg:w-1/2 h-full flex-1 flex-shrink-0 lg:block hidden">
          <Image
            src="/assets/imgs/tipo-espaco-img.png"
            alt="Imagem de tipo espaço"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <div className="flex flex-col items-center">
            <h1 className="flex-1 flex-shrink-0 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
              Tipo de Espaço
            </h1>

            <div className="flex-shrink grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 flex-1 flex-grow-0 gap-10 rounded-md place-self-center mt-60 mb-60">
              {rooms.map((room) => (
                <CardSelect
                  key={room.id}
                  name={room.espaco}
                  selected={selectedItem?.id === room.id}
                  onSelect={() => handleSelect(room)}
                  value=""
                />
              ))}
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div className="flex justify-between items-center w-full mt-4">
            <IoIosArrowBack
              className="text-6xl cursor-pointer text-black"
              onClick={goToPreviousPage}
            />
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

export default TipoEspaco;
