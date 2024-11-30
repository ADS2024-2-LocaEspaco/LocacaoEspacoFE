import React, { useEffect } from 'react';
import Image from 'next/image';
import { FaWifi, FaTv, FaSwimmingPool, FaUmbrellaBeach } from 'react-icons/fa';
import { TbAirConditioning } from "react-icons/tb";
import { MdKitchen, MdLocalLaundryService, MdOutdoorGrill } from "react-icons/md";
import { RiBilliardsFill } from "react-icons/ri";
import { PiFanFill } from "react-icons/pi";
import styles from '@/styles/LayoutCadImovel.module.css'
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import CardSelect from './components/CardSelect';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans';

interface SpecialAmenity {
  name: string;
  value: number;
  icon: React.ReactNode;
}

const specialAmenities: SpecialAmenity[] = [
  { name: 'Piscina', value: 1, icon: <FaSwimmingPool size={32} /> },
  { name: 'Churrasqueira', value: 2, icon: <MdOutdoorGrill size={32} /> },
  { name: 'Acesso à Praia', value: 3, icon: <FaUmbrellaBeach size={32} /> },
  { name: 'Mesa de bilhar', value: 4, icon: <RiBilliardsFill size={32} /> },
];

const ComodidadeEspecial: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItems, setSelectedItems] = React.useState<SpecialAmenity[]>([]);

  useEffect(() => {
    const storedSpecialAmenities = localStorage.getItem('comodidades_especiais');
    if (storedSpecialAmenities) {
      const parsedSpecialAmenities = JSON.parse(storedSpecialAmenities);
      setSelectedItems(parsedSpecialAmenities);
    }
  }, []);

  const handleSelect = (specialAmenity: SpecialAmenity) => {
    const isSelected = selectedItems.some(item => item.name === specialAmenity.name);

    let updatedSelection;
    if (isSelected) {
      updatedSelection = selectedItems.filter(item => item.name !== specialAmenity.name);
    } else {
      updatedSelection = [...selectedItems, specialAmenity];
    }

    setSelectedItems(updatedSelection);
    localStorage.setItem('comodidades_especiais', JSON.stringify(updatedSelection));
  };

  return (
    // Left Side
    <>
      <NavbarCadastro />
      <div className="flex h-screen overflow-hidden flex-col lg:flex-row">
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
                  name={specialAmenity.name}
                  selected={selectedItems.some(item => item.name === specialAmenity.name)}
                  icon={specialAmenity.icon}
                  onSelect={() => handleSelect(specialAmenity)}
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

export default ComodidadeEspecial;
