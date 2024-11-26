import React, { useEffect } from 'react';
import { FaRegBuilding, FaHouseUser } from 'react-icons/fa';
import { FaHouseChimney, FaTreeCity, FaTent } from "react-icons/fa6";
import { MdOutlineHouseSiding } from "react-icons/md";
import { PiShippingContainerFill, PiFarm } from "react-icons/pi";
import { GiEcology } from "react-icons/gi";
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNavigation from '@/hooks/CadImovel';
import CardSelect from './components/CardSelect';
import '@fontsource/josefin-sans'; 

interface Categoria {
  name: string;
  value: number;
  icon: React.ReactNode;
}

const categorias: Categoria[] = [
  { name: 'Casa', value: 1, icon: <FaHouseChimney size={32} /> },
  { name: 'Apartamento', value: 2, icon: <FaRegBuilding size={32} /> },
  { name: 'Cabana', value: 3, icon: <MdOutlineHouseSiding size={32} /> },
  { name: 'Contêiner', value: 4, icon: <PiShippingContainerFill size={32} /> },
  { name: 'Fazenda', value: 5, icon: <PiFarm size={32} /> },
  { name: 'Casa Ecológica', value: 6, icon: <GiEcology size={32} /> },
  { name: 'Casa de Hóspedes', value: 7, icon: <FaHouseUser size={32} /> },
  { name: 'Casa de Árvore', value: 8, icon: <FaTreeCity size={32} /> },
  { name: 'Tenda', value: 9, icon: <FaTent size={32} /> },
];

const TipoImovel: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedCategory, setSelectedCategory] = React.useState<Categoria | null>(null);

  useEffect(() => {
    const storedSelection = localStorage.getItem("tipo_imovel");
    if (storedSelection) {
      const parsedSelection: Categoria = JSON.parse(storedSelection);
      setSelectedCategory(parsedSelection);
    }
  }, []);

  const handleSelect = (category: Categoria) => {
    setSelectedCategory(category);
    localStorage.setItem("tipo_imovel", JSON.stringify(category));
  };

  return (
    <>
      <NavbarCadastro />
      <div className="flex h-screen overflow-hidden">
        {/* Left Side */}
        <div className="w-1/2 h-full flex-1 flex-shrink-0">
          <img
            src="https://s3-alpha-sig.figma.com/img/1501/2279/c79500a00fd6e87220ae2bf5fdd0d5e6?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=as7KjqgiZZKYf9IbGi339EYe5a3SZ5k0GRH9ZOx0GxvtG1ECY2HKbnKeNby0iOYHYNi1cY5TPIvm-~Q8v-Fq7rgMmDb78udBn0pClEfDkAqG8LiBzwikowwRfMMygdPmX-j3W8bri0W57FO-p299eoVb-mw8tOeLN23UzVZsiCjH46g9A5E32nJ6DXaYd9temE5Ku0uEqBOnOiyE4deAbGCOkuM4yMmBqDM-vc0RfgA8LFnSCoaXxhXJKezaMfM~9XNJmR-E4MIX5bFtkQGExbIcGaOpo6~P6F-FwMxxZTXC1~ouW~wkzL687TEwh9keY4TXxUYKn3HcNfs9Qu8n8A__"
            alt="Imagem de imóvel"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <div className="flex flex-col items-center">
            {/* Title */}
            <h1 className="text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
              Tipo de Imóvel
            </h1>
            {/* Content */}
            <div className="flex-shrink grid grid-cols-3 gap-10 rounded-md mt-20">
              {categorias.map((categoria, index) => (
                <CardSelect
                  key={index}
                  name={categoria.name}
                  icon={categoria.icon}
                  selected={selectedCategory?.value === categoria.value}
                  onSelect={() => handleSelect(categoria)} value={''}              />
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center w-full mt-4">
            <IoIosArrowBack className="text-6xl cursor-pointer text-black" onClick={goToPreviousPage} />
            <IoIosArrowForward className="text-6xl cursor-pointer text-black" onClick={goToNextPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TipoImovel;