import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNavigation from '@/hooks/CadImovel';
import CardSelect from './components/CardSelect';
import '@fontsource/josefin-sans';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as MdIcons from 'react-icons/md';
import * as PiIcons from 'react-icons/pi';
import * as GiIcons from 'react-icons/gi';
import * as IoIcons from 'react-icons/io';

interface Categoria {
  imovel: string;
  id: number;
  icone: React.ReactNode;
}

const TipoImovel: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<Categoria | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [error, setError] = useState<string | null>(null);

  const resolveIcon = (iconName: string): React.ReactNode => {
    const iconLibrary = { ...FaIcons, ...Fa6Icons, ...MdIcons, ...PiIcons, ...GiIcons, ...IoIcons };
    const IconComponent = iconLibrary[iconName as keyof typeof iconLibrary];
    return IconComponent ? <IconComponent size={32} /> : null;
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://localhost:3000/anuncio/get-tipo-imovel');
        if (!response.ok) {
          throw new Error('Erro ao buscar tipos de imóveis');
        }
        const data: Categoria[] = await response.json();

        const categoriasWithIcons = data.map((item) => ({
          ...item,
          icone: resolveIcon(item.icone),
        }));

        setCategorias(categoriasWithIcons);
      } catch (error) {
        console.error('Erro ao buscar tipos de imóveis:', error);
      }
    };

    fetchCategorias();

    const storedSelection = localStorage.getItem("tipo_imovel");
    if (storedSelection) {
      const parsedSelection: Categoria = JSON.parse(storedSelection);
      const resolvedIcon = resolveIcon(parsedSelection.icone);
      setSelectedCategory({
        ...parsedSelection,
        icone: resolvedIcon,
      });
    }
  }, []);

  const handleSelect = (category: Categoria) => {
    const resolvedIcon = resolveIcon(category.icone);
    setSelectedCategory({
      ...category,
      icone: resolvedIcon,
    });
    setError(null);
    localStorage.setItem("tipo_imovel", JSON.stringify({
      ...category,
      icone: category.icone,
    }));
  };

  const validateFields = () => {
    if (!selectedCategory) {
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
              {categorias.map((categoria) => (
                <CardSelect
                  key={categoria.id}
                  value={categoria.id}
                  name={categoria.imovel}
                  selected={selectedCategory?.id === categoria.id}
                  icon={categoria.icone}
                  onSelect={() => handleSelect(categoria)}
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

export default TipoImovel;
