import React, { useEffect } from 'react';
import Image from 'next/image';
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
      <div className="flex h-screen overflow-hidden flex-col lg:flex-row">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 h-full flex-1 flex-shrink-0 lg:block hidden">
        <Image
            src="/assets/imgs/tipo-imovel-img.jfif"
            alt="Imagem de imóvel"
            width={500}
            height={500}
            className="w-full h-full object-cover"
        />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <div className="flex flex-col items-center">
            <h1 className="text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
              Tipo de Imóvel
            </h1>
            <div className="flex-shrink grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 rounded-md mt-20">
              {categorias.map((categoria, index) => (
                <CardSelect
                  key={index}
                  name={categoria.name}
                  icon={categoria.icon}
                  selected={selectedCategory?.value === categoria.value}
                  onSelect={() => handleSelect(categoria)}
                  value={''}
                />
              ))}
            </div>
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

export default TipoImovel;