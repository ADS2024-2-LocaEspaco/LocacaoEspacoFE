import React, { useState } from 'react';
import NavbarCadastro from '@/components/navbarCadastro';
import useNavigation from '@/hooks/CadImovel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const ValorEreserva: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  
  const [valor, setValor] = useState<string>("0,00");
  const [minDias, setMinDias] = useState<number>(0);
  const [maxDias, setMaxDias] = useState<number>(0);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleIncrementValor = () => {
    const valorNumerico = parseFloat(valor.replace(/\./g, '').replace(',', '.')) + 1;
    setValor(formatCurrency(valorNumerico));
  };

  const handleDecrementValor = () => {
    const valorNumerico = parseFloat(valor.replace(/\./g, '').replace(',', '.')) - 1;
    if (valorNumerico >= 0) {
      setValor(formatCurrency(valorNumerico));
    }
  };

  const handleInputChangeValor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d,]/g, ''); 
    setValor(inputValue);
  };

  const handleBlurValor = () => {
    const valorNumerico = parseFloat(valor.replace(/\./g, '').replace(',', '.'));
    if (!isNaN(valorNumerico)) {
      setValor(formatCurrency(valorNumerico));
    } else {
      setValor("0,00");
    }
  };

  const handleIncrementMinDias = () => {
    setMinDias(minDias + 1);
  };

  const handleDecrementMinDias = () => {
    if (minDias > 1) {
      setMinDias(minDias - 1);
    }
  };

  const handleIncrementMaxDias = () => {
    setMaxDias(maxDias + 1);
  };

  const handleDecrementMaxDias = () => {
    if (maxDias > minDias) {
      setMaxDias(maxDias - 1);
    }
  };

  return (
    <>
      <NavbarCadastro />
      {/* Main Container */}
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Side */}
        <div className="w-full md:w-1/2">
          <img
            src="https://via.placeholder.com/800x600"
            alt="Imagem de imóvel"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-start items-center p-4 bg-white">
          <h1 className="mb-4 text-3xl text-gray-700 font-semibold">Valor e Reserva</h1>
          <div className="w-full px-8">
            <div className="px-8 flex flex-col items-center">
              <p className="text-gray-600 text-xl font-bold text-center mb-4 mt-10">Valor da diária</p>

              <div className="flex flex-col items-center w-full max-w-sm">
                <div className="flex items-center w-full">
                  <AiOutlineMinus 
                    className="text-3xl cursor-pointer text-black mr-2" 
                    onClick={handleDecrementValor} 
                  />
                  <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800">R$</span>
                    <input
                      type="text"
                      id="valor"
                      name="valor"
                      value={valor}
                      onChange={handleInputChangeValor}
                      onBlur={handleBlurValor} 
                      className="border border-gray-400 text-black h-16 rounded-lg text-center pl-12 w-full"
                    />
                  </div>
                  <AiOutlinePlus 
                    className="text-3xl cursor-pointer text-black ml-2" 
                    onClick={handleIncrementValor} 
                  />
                </div>

                <p className="text-gray-500 font-bold text-center mt-2">por dia</p>
                <p className="text-gray-600 text-xl font-bold text-center mb-4 mt-10">Reserva</p>
                
                <div className="flex w-full justify-between mt-6 mb-4 space-x-8"> 
                  
                  <div className="flex flex-col items-center w-1/2">
                    <p className="text-gray-600 text-center mb-2">mínimo</p>
                    <div className="flex items-center w-full">
                      <AiOutlineMinus 
                        className="text-3xl cursor-pointer text-black mr-2" 
                        onClick={handleDecrementMinDias} 
                      />
                      <input
                        type="number"
                        id="minDias"
                        name="minDias"
                        value={minDias}
                        readOnly
                        className="border border-gray-400 text-black h-16 rounded-lg text-center w-full"
                      />
                      <AiOutlinePlus 
                        className="text-3xl cursor-pointer text-black ml-2" 
                        onClick={handleIncrementMinDias} 
                      />
                    </div>
                    <p className="text-gray-500 text-center mt-2">dias</p>
                  </div>

                  <div className="flex flex-col items-center w-1/2">
                    <p className="text-gray-600 text-center mb-2">máximo</p>
                    <div className="flex items-center w-full">
                      <AiOutlineMinus 
                        className="text-3xl cursor-pointer text-black mr-2" 
                        onClick={handleDecrementMaxDias} 
                      />
                      <input
                        type="number"
                        id="maxDias"
                        name="maxDias"
                        value={maxDias}
                        readOnly
                        className="border border-gray-400 text-black h-16 rounded-lg text-center w-full"
                      />
                      <AiOutlinePlus 
                        className="text-3xl cursor-pointer text-black ml-2" 
                        onClick={handleIncrementMaxDias} 
                      />
                    </div>
                    <p className="text-gray-500 text-center mt-2">dias</p>
                  </div>
                </div>

              </div>
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

export default ValorEreserva;
