import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans';

interface Amenity {
  name: string;
  value: number;
  especial: number;
}

const ComodidadeExtra: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItems, setSelectedItems] = React.useState<Amenity[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await fetch('http://localhost:3000/anuncio/get-comodidades');
        if (!response.ok) {
          throw new Error('Erro ao buscar comodidades');
        }
        const data: Amenity[] = await response.json();
  
        // Exibindo os dados recebidos no console
        console.log('Dados retornados da API:', data);
  
        // Definindo todas as comodidades sem filtrar
        setAmenities(data);
      } catch (error) {
        console.error('Erro ao buscar comodidades:', error);
      }
    };
  
    fetchAmenities();
  
    const storedAmenities = localStorage.getItem("comodidades");
    if (storedAmenities) {
      const parsedAmenities: Amenity[] = JSON.parse(storedAmenities);
      setSelectedItems(parsedAmenities);
    }
  }, []);
  
  

  const handleSelect = (amenity: Amenity) => {
    const isSelected = selectedItems.some(item => item.comodidade === amenity.comodidade);

    const updatedSelection = isSelected
      ? selectedItems.filter(item => item.comodidade !== amenity.comodidade)
      : [...selectedItems, amenity];

    setSelectedItems(updatedSelection);
    setError(null);
    localStorage.setItem("comodidades", JSON.stringify(updatedSelection));
  };

  const validateFields = () => {
    if (!selectedItems.length) {
      setError('Por favor, selecione ao menos uma etiqueta antes de continuar.');
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
            src="/assets/imgs/extra.jpeg"
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
            {/* Card */}
            <div className="p-4 border rounded-lg w-full bg-white">
              <h2 className="mb-4 text-[25px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
                Selecione as comodidades extras
              </h2>
              {/* Contêiner com rolagem */}
              <div className="max-h-300 overflow-y-auto">
                {amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center m-1 px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                      selectedItems.some(item => item.comodidade === amenity.comodidade)
                        ? 'border bg-blue-500 text-white border-blue-500'
                        : 'border bg-white text-gray-800 border-gray-400'
                    }`}
                    onClick={() => handleSelect(amenity)}
                  >
                    {amenity.comodidade}
                  </span>
                ))}
              </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
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

export default ComodidadeExtra;
