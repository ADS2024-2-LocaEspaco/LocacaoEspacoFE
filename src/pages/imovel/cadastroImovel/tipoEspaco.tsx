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
            src="https://s3-alpha-sig.figma.com/img/c195/1a63/a8166f15ab0f1918c9e2ead73f2abf6e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=X5qVGu-B0UEuW0oiytyQovTdF62A6cNUddZoLsurQU4cpDLzsA61hV-wD4mAaEehZt88d292lMtGruajU5CH9Xv0Zaeivl6tvZZdFEUo3innTJArhmcxz7F~sppUKLruxTJfmomwwaaEaZ9i1vKF0cCfzwyRB~FsqKxHFe9WKlmFjmV7OgoY14k8cxUHt3TVMYEnfDqM8oa-uaL~CkkKHKh5GxDDbkNXo-IuY0ilhOW0LriJFUjatdVVFZlB7Fd0L278z74Y-2BsmXRdVXPDLHwgYki4oG2dZV5ZfymaUPrxxE0Hm4Y1-DB2AFdsr9Rl-hbDTV5iNT5f5auJ~816lA__"
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
                onSelect={() => handleSelect(room)} value={''}
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
