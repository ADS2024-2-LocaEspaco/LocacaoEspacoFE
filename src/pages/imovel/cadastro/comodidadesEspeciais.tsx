import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as TbIcons from 'react-icons/tb';
import * as PiIcons from 'react-icons/pi';
import CardSelect from './components/CardSelect';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans';

interface SpecialAmenity {
  name: string;
  value: number;
  icon: React.ReactNode;
}

const ComodidadeEspecial: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [specialAmenities, setSpecialAmenities] = useState<SpecialAmenity[]>([]);
  const [selectedItems, setSelectedItems] = useState<SpecialAmenity[]>([]);
  const [error, setError] = useState<string | null>(null);

  const resolveIcon = (iconName: string): React.ReactNode => {
    const iconLibrary = { ...FaIcons, ...MdIcons, ...TbIcons, ...PiIcons };
    const IconComponent = iconLibrary[iconName as keyof typeof iconLibrary];
    return IconComponent ? <IconComponent size={32} /> : null;
  };

  useEffect(() => {
    const fetchSpecialAmenities = async () => {
      try {
        const response = await fetch('http://localhost:3000/anuncio/get-comodidades');
        if (!response.ok) {
          throw new Error('Erro ao buscar comodidades especiais');
        }
        const data = await response.json();

        const filteredAmenities = data.filter((item: any) => item.especial == 1);

        const amenitiesWithIcons = filteredAmenities.map((item: any) => ({
          ...item,
          icon: resolveIcon(item.icone),
        }));

        setSpecialAmenities(amenitiesWithIcons);
      } catch (error) {
        console.error('Erro ao buscar comodidades especiais:', error);
      }
    };

    fetchSpecialAmenities();

    const storedSelection = localStorage.getItem('comodidades');
    if (storedSelection) {
      const parsedSelection = JSON.parse(storedSelection);
      setSelectedItems(parsedSelection);
    }
  }, []);

  const handleSelect = (specialAmenity: SpecialAmenity) => {
    const isSelected = selectedItems.some(item => item.comodidade === specialAmenity.comodidade);

    let updatedSelection;
    if (isSelected) {
      updatedSelection = selectedItems.filter(item => item.comodidade !== specialAmenity.comodidade);
    } else {
      updatedSelection = [...selectedItems, specialAmenity];
    }

    setSelectedItems(updatedSelection);
    setError(null); 
    localStorage.setItem('comodidades', JSON.stringify(updatedSelection));
  };

  const validateFields = () => {
    if (!selectedItems) {
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
            src="/assets/imgs/comodidades-especiais-img.jfif"
            alt="Imagem de comodidades especiais"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <div className="flex flex-col items-center">
            <h1 className="mb-4 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
              Comodidades Especiais
            </h1>
            <div className="flex-shrink grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 rounded-md mt-40 mb-40">
              {specialAmenities.map((specialAmenity, index) => (
                <CardSelect
                  key={index}
                  value={specialAmenity.value}
                  name={specialAmenity.comodidade}
                  selected={selectedItems.some(item => item.comodidade === specialAmenity.comodidade)}
                  icon={specialAmenity.icon}
                  onSelect={() => handleSelect(specialAmenity)}
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

export default ComodidadeEspecial;
