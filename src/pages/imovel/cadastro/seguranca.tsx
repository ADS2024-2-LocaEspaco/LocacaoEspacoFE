import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import * as FaIcons from 'react-icons/fa';
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CardSelect from './components/CardSelect';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans';

interface SafetyItem {
  item_seguranca: string;
  icon: React.ReactNode;
  value: number;
  especial: number;
}

const Seguranca: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItems, setSelectedItems] = useState<SafetyItem[]>([]);
  const [safetyItems, setSafetyItems] = useState<SafetyItem[]>([]);

  // Resolução de ícones
  const resolveIcon = (iconName: string): React.ReactNode => {
    const iconLibrary = { ...FaIcons };
    const IconComponent = iconLibrary[iconName];
    return IconComponent ? <IconComponent size={32} /> : null;
  };

  // Busca de dados da API
  useEffect(() => {
    const fetchSafetyItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/anuncio/get-seguranca');
        if (!response.ok) {
          throw new Error('Erro ao buscar itens de segurança');
        }
        const data = await response.json();

        const itemsWithIcons = data.map((item: SafetyItem) => ({
          ...item,
          icon: resolveIcon(item.icon),
        }));

        setSafetyItems(itemsWithIcons);
      } catch (error) {
        console.error('Erro ao buscar itens de segurança:', error);
      }
    };

    fetchSafetyItems();

    const storedSelection = localStorage.getItem('seguranca');
    if (storedSelection) {
      const parsedSelection: SafetyItem[] = JSON.parse(storedSelection);
      setSelectedItems(parsedSelection);
    }
  }, []);

  // Manipulação de seleção
  const handleSelect = (item: SafetyItem) => {
    const isSelected = selectedItems.some(selected => selected.item_seguranca === item.item_seguranca);

    let updatedSelection: SafetyItem[];
    if (isSelected) {
      updatedSelection = selectedItems.filter(selected => selected.item_seguranca !== item.item_seguranca);
    } else {
      updatedSelection = [...selectedItems, item];
    }

    setSelectedItems(updatedSelection);
    localStorage.setItem('seguranca', JSON.stringify(updatedSelection));
  };

  return (
    <>
      <NavbarCadastro />
      <div className="flex h-screen">
        <div className="w-1/2">
          <Image
            src="/assets/imgs/seguranca-img.jfif"
            alt="Imagem de segurança"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Lado direito */}
        <div className="w-full lg:w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <div className="flex flex-col items-center">
            <h1 className="mb-4 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
              Segurança
            </h1>
            <div className="flex-shrink grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 rounded-md mt-40 mb-40">
              {safetyItems.map((item, index) => (
                <CardSelect
                  key={index}
                  name={item.item_seguranca}
                  icon={item.icon}
                  selected={selectedItems.some(selected => selected.item_seguranca === item.item_seguranca)}
                  onSelect={() => handleSelect(item)}
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

export default Seguranca;
