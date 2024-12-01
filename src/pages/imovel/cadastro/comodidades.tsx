import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as TbIcons from 'react-icons/tb';
import * as PiIcons from 'react-icons/pi';
import styles from '@/styles/LayoutCadImovel.module.css'
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import CardSelect from './components/CardSelect';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans';

interface Amenity {
  name: string;
  value: number;
  icone: string;
}

const Comodidade: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItems, setSelectedItems] = React.useState<Amenity[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);

  const resolveIcon = (iconName: string): React.ReactNode => {
  const iconLibrary = { ...FaIcons, ...MdIcons, ...TbIcons, ...PiIcons };
  const IconComponent = iconLibrary[iconName];
  return IconComponent ? <IconComponent size={32} /> : null;
};

useEffect(() => {
  const fetchAmenities = async () => {
    try {
      const response = await fetch('http://localhost:3000/anuncio/get-comodidades');
      if (!response.ok) {
        throw new Error('Erro ao buscar comodidades');
      }
      const data: Amenity[] = await response.json();
      
      const amenitiesWithIcons = data.map((item) => ({
        ...item,
        icone: resolveIcon(item.icone)
      }));

      setAmenities(amenitiesWithIcons);
    } catch (error) {
      console.error('Erro ao buscar comodidades:', error);
    }
  };

  fetchAmenities();

  const storedAmenities = localStorage.getItem("comodidades");
  if (storedAmenities) {
    const parsedAmenities = JSON.parse(storedAmenities);
    const resolvedAmenities = parsedAmenities.map((item: Amenity) => ({
      ...item,
      icone: resolveIcon(item.icone),
    }));
    setSelectedItems(resolvedAmenities);
  }
}, []);

  function handleSelect(amenity: Amenity) {
    const isSelected = selectedItems.some(item => item.comodidade === amenity.comodidade);

    let updatedSelection;
    if (isSelected) {
      updatedSelection = selectedItems.filter(item => item.comodidade !== amenity.comodidade);
    } else {
      updatedSelection = [...selectedItems, amenity];
    }

    setSelectedItems(updatedSelection);
    localStorage.setItem("comodidades", JSON.stringify(updatedSelection));
  }

  return (
    // Left Side
    <>
      <NavbarCadastro />
      <div className="flex h-screen overflow-hidden flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-full flex-1 flex-shrink-0 lg:block hidden">
          <Image
              src="/assets/imgs/comodidades-img.png"
              alt="Imagem de comodidades"
              width={500}
              height={500}
              className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <div className="flex flex-col items-center">
            <h1 className="mb-4 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
              Comodidades
            </h1>
            <div className="flex-shrink grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-10 rounded-md mt-20">
              {amenities.map((amenity, index) => (
                <CardSelect
                  key={index}
                  value={amenity.value}
                  name={amenity.comodidade}
                  selected={selectedItems.some(item => item.comodidade === amenity.comodidade)}
                  icon={amenity.icone}
                  onSelect={() => handleSelect(amenity)}
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

export default Comodidade;