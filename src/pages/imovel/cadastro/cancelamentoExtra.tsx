import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans';

interface Amenity {
  name: string;
}

const CancelamentoExtra: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItem, setSelectedItem] = useState<Amenity | null>(null); // Só pode escolher uma
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedItem = localStorage.getItem("politicaCancelamento");
    if (storedItem) {
      const parsedItem: Amenity = JSON.parse(storedItem);
      setSelectedItem(parsedItem);
    }
  }, []);

  const handleSelect = (amenity: Amenity) => {
    setSelectedItem(amenity);
    localStorage.setItem("politicaCancelamento", JSON.stringify(amenity)); // Salva no localStorage
    setError(null); // Reseta o erro ao selecionar uma etiqueta
  };

  const validateFields = () => {
    if (!selectedItem) {
      setError('Por favor, selecione uma política de cancelamento antes de continuar.');
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
              Política de Cancelamento
            </h1>
            {/* Card */}
            <div className="p-4 border rounded-2xl border-gray-400 w-full bg-white">
              <h2 className="mb-4 text-[25px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
                Opções de política de cancelamento
              </h2>
              {/* Texto genérico */}
              <li className="text-gray-600">Multa por Cancelamento:
                <ul className="list-disc list-inside mt-2 text-gray-500 pl-6">
                  <li>Cancelamento feito 24h antes: 10% do valor.</li>
                </ul>
              </li>
              <br></br>
              <li className="text-gray-600">Políticas de Cancelamento:
                <ul className="list-disc list-inside mt-2 text-gray-500 pl-6">
                  <li>Rígida:</li>
                    <ul className="list-decimal list-inside mt-2 text-gray-600 pl-8">
                      <li>Cancelamento sem multa: 15 dias de antecedência.</li>
                    </ul>
                  <li>Moderada:</li>
                    <ul className="list-decimal list-inside mt-2 text-gray-600 pl-8">
                      <li>Cancelamento sem multa: 7 dias de antecedência.</li>
                    </ul>
                  <li>Flexível:</li>
                    <ul className="list-decimal list-inside mt-2 text-gray-600 pl-8">
                      <li>Cancelamento sem multa: 3 dias de antecedência.</li>
                    </ul>
                </ul>
              </li>
            </div>

            {/* Etiquetas abaixo do card */}
            <div className="flex justify-center gap-4 mt-6">
              {["Cancelamento Flexível", "Cancelamento Moderado", "Cancelamento Rigoroso"].map((label, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium cursor-pointer border ${
                    selectedItem?.name === label
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-800 border-gray-400'
                  }`}
                  onClick={() => handleSelect({ name: label})}
                >
                  {label}
                </span>
              ))}
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>

          <div className="w-full mt-4 flex justify-end">
            <button className="px-12 py-4 mt-10 text-white bg-blue-500 border rounded-3xl hover:bg-blue-600 focus:outline-none font-josefin"
            >
                Salvar e Sair
            </button>
          </div>

          {/* Navegação */}
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

export default CancelamentoExtra;
