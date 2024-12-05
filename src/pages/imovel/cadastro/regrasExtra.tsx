import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans';

interface Amenity {
  name: string;
}

const RegrasExtra: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();

  // Estado unificado para etiquetas e campos
  const [data, setData] = useState({
    etiquetas: [] as Amenity[],
    campos: {
      pets: '',
      quietHours: '',
      checkIn: '',
      checkOut: '',
      additionalRules: '',
    },
  });

  const fixedAmenities = [
    { name: 'Animais de estimação' },
    { name: 'Eventos' },
    { name: 'Fotografia comercial' },
    { name: 'Fumar' },
    { name: 'Horário de silêncio' },
  ];

  // Carregar dados do localStorage apenas uma vez, no início
  useEffect(() => {
    const storedData = localStorage.getItem('regrasCasaData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
    }
  }, []);

  // Salvar os dados no localStorage apenas quando houver uma mudança importante
  useEffect(() => {
    if (data.etiquetas.length > 0 || data.campos.pets || data.campos.quietHours || data.campos.checkIn || data.campos.checkOut || data.campos.additionalRules) {
      localStorage.setItem('regrasCasaData', JSON.stringify(data));
    }
  }, [data]); // Só atualiza o localStorage quando o estado 'data' mudar

  const handleSelect = (amenity: Amenity) => {
    const isSelected = data.etiquetas.some(item => item.name === amenity.name);
    const updatedEtiquetas = isSelected
      ? data.etiquetas.filter(item => item.name !== amenity.name)
      : [...data.etiquetas, amenity];

    setData(prevData => ({
      ...prevData,
      etiquetas: updatedEtiquetas,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      campos: {
        ...prevData.campos,
        [name]: value,
      },
    }));
  };

  const validateFields = () => {
    if (!data.etiquetas.length) {
      alert('Por favor, selecione ao menos uma regra antes de continuar.');
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
            alt="Imagem de regras"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <div className="flex flex-col items-center">
            <h1 className="mb-4 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-800">
              Regras da Casa
            </h1>

            {/* Etiquetas */}
            <div className="max-h-300 overflow-y-auto flex justify-center items-center flex-wrap gap-2 mt-4">
              {fixedAmenities.map((amenity, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center m-1 px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                    data.etiquetas.some(item => item.name === amenity.name)
                      ? 'bg-blue-500 text-white border border-gray-500'
                      : 'bg-white text-gray-800 border border-gray-500'
                  }`}
                  onClick={() => handleSelect(amenity)}
                >
                  {amenity.name}
                </span>
              ))}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4 mt-6 w-full">
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Pets</label>
                <input
                  type="number"
                  name="pets"
                  value={data.campos.pets}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Horário de Silêncio</label>
                <input
                  type="number"
                  name="quietHours"
                  value={data.campos.quietHours}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Check In</label>
                <input
                  type="number"
                  name="checkIn"
                  value={data.campos.checkIn}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Check Out</label>
                <input
                  type="number"
                  name="checkOut"
                  value={data.campos.checkOut}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>
            </div>

            {/* Regras Adicionais */}
            <div className="mt-6 w-full">
              <label className="block text-gray-800 font-semibold mb-2">Regras Adicionais</label>
              <textarea
                name="additionalRules"
                value={data.campos.additionalRules}
                onChange={handleInputChange}
                rows={3}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              ></textarea>
            </div>

            {/* Estilos Internos para esconder as setas */}
            <style jsx>{`
              input[type="number"]::-webkit-outer-spin-button,
              input[type="number"]::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }

              input[type="number"] {
                -moz-appearance: textfield; /* Para Firefox */
              }
            `}</style>
          </div>

          {/* Navegação */}
          <div className="flex justify-between items-center w-full mt-4">
            <IoIosArrowBack className="text-6xl cursor-pointer text-black" onClick={goToPreviousPage} />
            <IoIosArrowForward className="text-6xl cursor-pointer text-black" onClick={handleNext} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegrasExtra;
