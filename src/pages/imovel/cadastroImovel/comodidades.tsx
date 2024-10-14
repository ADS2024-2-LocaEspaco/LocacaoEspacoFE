import React from 'react';
import { useEffect } from 'react';
import { FaWifi, FaTv, FaCar, FaHammer } from 'react-icons/fa';
import { TbAirConditioning  } from "react-icons/tb";
import { MdKitchen, MdLocalLaundryService, MdAttachMoney } from "react-icons/md";
import { PiFanFill } from "react-icons/pi";
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
  icon: React.ReactNode;
}

const amenities: Amenity[] = [
  { name: 'Wi-fi', value: 1 , icon: <FaWifi size={32} /> },
  { name: 'TV', value: 2, icon: <FaTv size={32} /> },
  { name: 'Cozinha', value: 3, icon: <MdKitchen size={32} /> },
  { name: 'Maquina de Lavar', value: 4, icon: <MdLocalLaundryService size={32} /> },
  { name: 'Ar-Condicionado', value: 5, icon: <TbAirConditioning size={32} /> },
  { name: 'Estacionamento', value: 6, icon: <FaCar size={32} /> },
  { name: 'Estacionamento Pago', value: 7, icon: <MdAttachMoney size={32} /> },
  { name: 'Espaço de Trabalho', value: 8, icon: <FaHammer size={32} /> },
  { name: 'Ventilador', value: 9, icon: <PiFanFill size={32} /> },
];

const Comodidade: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItems, setSelectedItems] = React.useState<Amenity[]>([]);

  useEffect(() => {
    const storedAmenities = localStorage.getItem("comodidades");
    if (storedAmenities) {
      const parsedAmenities = JSON.parse(storedAmenities);
      setSelectedItems(parsedAmenities);
    }
  }, []);
  
  function handleSelect(amenity: Amenity) {
    const isSelected = selectedItems.some(item => item.name === amenity.name);

    let updatedSelection;
    if (isSelected) {
      updatedSelection = selectedItems.filter(item => item.name !== amenity.name);
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
            Comodidades
          </h1>
          <div className="grid grid-cols-3 gap-10 rounded-md mt-20">
            {amenities.map((amenity, index) => (
              <CardSelect
                key={index}
                value={amenity.value}
                name={amenity.name}
                selected={selectedItems.some(item => item.name === amenity.name)} // Verificar se está selecionado
                icon={amenity.icon}
                onSelect={() => handleSelect(amenity)}
              />
            ))}
          </div>
          <div className="flex justify-between items-center w-full mt-4">
            <IoIosArrowBack className="text-6xl cursor-pointer text-black" onClick={goToPreviousPage}/>
            <IoIosArrowForward className="text-6xl cursor-pointer text-black" onClick={goToNextPage}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comodidade;