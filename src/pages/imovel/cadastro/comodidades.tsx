import React from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import { FaWifi, FaTv, FaCar, FaHammer } from 'react-icons/fa';
import { TbAirConditioning } from "react-icons/tb";
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
  { name: 'Wi-fi', value: 1, icon: <FaWifi size={32} /> },
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
<<<<<<< HEAD
    <>
      <NavbarCadastro />
      <div className="flex h-screen overflow-hidden flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-full flex-1 flex-shrink-0 lg:block hidden">
          <img
            src="https://s3-alpha-sig.figma.com/img/e1eb/9285/ad1198100852a31197292568de9a2002?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PuuwR0bcKLSfKzI-ORsykxeqXHR6YBHZPdpmrjNTmFw2inpO5tmXZwLrH0IVZLvOD~XhzMxau1xYbq18oZGzCnuWtrcxKC5pCxveyjUzryEy-uuNjPqj5i1o9w5wLIH3sxdw3IHkNcDNtRXO~tVmUGCaJyAz6yIAfhvAQBg5CU7IPShnMcjWnoJK809hufs~RzG1abIjBJoA~1AoWWGcDHLVZzCH99vDQQFNDZNQeOe2R96YbZjEH0793AXGU9GIvNMGjao6UFU-XTpZ7f9rqmPkSkH3JzGL7yNVStkjW6FQGtF8O80jDCEH6ffLbj3iTOQ-1kk5srtsIxLBNuz4zw__"
            alt="Imagem de imóvel"
            className="w-full h-full object-cover"
          />
        </div>
=======
  <>
    <NavbarCadastro />
    <div className="flex h-screen">
      <div className="w-1/2">
        <Image
          src="/assets/imgs/comodidades-img.png"
          alt="Imagem de comodidades"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>
>>>>>>> e2c23574a2229964150297c2dc3b1a09b1276b5e

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
                  name={amenity.name}
                  selected={selectedItems.some(item => item.name === amenity.name)} // Verificar se está selecionado
                  icon={amenity.icon}
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