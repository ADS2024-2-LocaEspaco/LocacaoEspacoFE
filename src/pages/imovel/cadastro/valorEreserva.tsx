import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import NavbarCadastro from '@/components/navbarCadastro';
import useNavigation from '@/hooks/CadImovel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import '@fontsource/josefin-sans'; 

const ValorEreserva: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  
  const [valor, setValor] = useState<string>("0,00");
  const [minDias, setMinDias] = useState<number>(0);
  const [maxDias, setMaxDias] = useState<number>(0);
  const [antecedencia, setAntecedencia] = useState<number>(0);

  const saveToLocalStorage = () => {
    const data = {
      valor,
      minDias,
      maxDias,
      antecedencia,
    };
    localStorage.setItem('valorEreserva', JSON.stringify(data));
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('valorEreserva') || '{}');
  
    if (storedData.minDias !== undefined) setMinDias(storedData.minDias);
    if (storedData.maxDias !== undefined) setMaxDias(storedData.maxDias);
    if (storedData.valor !== undefined) setValor(storedData.valor);
    if (storedData.antecedencia !== undefined) setAntecedencia(storedData.antecedencia);
  }, []);

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

      const valorEreserva = JSON.parse(localStorage.getItem('valorEreserva') || '{}');
      valorEreserva.valor = formatCurrency(valorNumerico);
      localStorage.setItem('valorEreserva', JSON.stringify(valorEreserva));
    } else {
      setValor("0,00");
    }
  };
  
  const handleAntecedenciaChange = (newAntecedencia: number) => {
    setAntecedencia(newAntecedencia);

    const valorEreserva = JSON.parse(localStorage.getItem('valorEreserva') || '{}');
    valorEreserva.antecedencia = newAntecedencia;
    localStorage.setItem('valorEreserva', JSON.stringify(valorEreserva));
  };

  const handleAntecedenciaBlur = () => {
    saveToLocalStorage();
  };

  const handleMinMaxBlur = () => {
    saveToLocalStorage();
  };

  const handleIncrementMinDias = () => {
    const newMinDias = minDias + 1;
    setMinDias(newMinDias);

    const valorEreserva = JSON.parse(localStorage.getItem('valorEreserva') || '{}');
    valorEreserva.minDias = newMinDias;
    localStorage.setItem('valorEreserva', JSON.stringify(valorEreserva));
  };

  const handleDecrementMinDias = () => {
    if (minDias > 1) {
      const newMinDias = minDias - 1;
      setMinDias(newMinDias);

      const valorEreserva = JSON.parse(localStorage.getItem('valorEreserva') || '{}');
      valorEreserva.minDias = newMinDias;
      localStorage.setItem('valorEreserva', JSON.stringify(valorEreserva));
    }
  };  

  const handleIncrementMaxDias = () => {
    const newMaxDias = maxDias + 1;
    setMaxDias(newMaxDias);

    const valorEreserva = JSON.parse(localStorage.getItem('valorEreserva') || '{}');
    valorEreserva.maxDias = newMaxDias; 
    localStorage.setItem('valorEreserva', JSON.stringify(valorEreserva));
  };


  const handleDecrementMaxDias = () => {
    if (maxDias > minDias) {
      const newMaxDias = maxDias - 1;
      setMaxDias(newMaxDias);
  
      const valorEreserva = JSON.parse(localStorage.getItem('valorEreserva') || '{}');
      valorEreserva.maxDias = newMaxDias;
      localStorage.setItem('valorEreserva', JSON.stringify(valorEreserva));
    }
  };

  return (
    <>
      <NavbarCadastro />
      {/* Main Container */}
      <div className="flex h-screen overflow-hidden flex-col lg:flex-row">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 h-full flex-1 flex-shrink-0 lg:block hidden">
          <Image
            src="/assets/imgs/valor-renda-img.jfif"
            alt="Imagem de valor"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <h1 className="mb-4 text-4xl text-gray-700 text-center font-semibold font-josefin">Valor e Reserva</h1>
          <div className="w-full px-8">

            {/* 1st input */}

            <div className="px-8 flex flex-col items-center">
              <p className="text-gray-600 text-2xl font-bold text-center mb-4 mt-10 font-josefin">Valor da diária</p>

              <div className="flex flex-col items-center w-full max-w-sm">
                <div className="flex items-center w-full">
                  <AiOutlineMinus 
                    className="text-3xl cursor-pointer text-black mr-2" 
                    onClick={handleDecrementValor} 
                  />
                  <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 font-josefin text-2xl">R$</span>
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

                <p className="text-gray-500 text-center mt-2 font-josefin text-lg">por dia</p>

                {/* 2nd Input */}

                <div className="flex flex-col items-center w-full max-w-sm">
                  <p className="text-gray-600 text-2xl font-bold text-center mb-4 mt-10 font-josefin">
                    Dias mínimos de antecedência de reserva
                  </p>

                  <div className="flex items-center w-full">
                    <AiOutlineMinus
                      className="text-3xl cursor-pointer text-black mr-2"
                      onClick={() => setAntecedencia(Math.max(antecedencia - 1, 0))}
                    />
                    <div className="relative w-full">
                    <input
                      type="number"
                      id="antecedencia"
                      name="antecedencia"
                      value={antecedencia}
                      onChange={(e) => setAntecedencia(parseInt(e.target.value) || 0)}
                      onBlur={handleAntecedenciaBlur}
                      className="border border-gray-400 text-black h-16 rounded-lg text-center pl-12 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    </div>
                    <AiOutlinePlus
                      className="text-3xl cursor-pointer text-black ml-2"
                      onClick={() => setAntecedencia(antecedencia + 1)}
                    />
                  </div>
                </div>

                {/* 3rd and 4th Input */}

                <p className="text-gray-600 font-bold text-center mb-4 mt-10 font-josefin text-2xl">Reserva</p>
                
                <div className="flex w-full justify-between mt-6 mb-4 space-x-8"> 
                  
                  <div className="flex flex-col items-center w-1/2">
                    <p className="text-gray-600 text-center mb-2 font-josefin text-lg">mínimo</p>
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
                        onBlur={handleMinMaxBlur}
                        className="border border-gray-400 text-black h-16 rounded-lg text-center w-full"
                      />
                      <AiOutlinePlus 
                        className="text-3xl cursor-pointer text-black ml-2" 
                        onClick={handleIncrementMinDias} 
                      />
                    </div>
                    <p className="text-gray-500 text-center mt-2 font-josefin text-lg">dias</p>
                  </div>

                  <div className="flex flex-col items-center w-1/2">
                    <p className="text-gray-600 text-center mb-2 font-josefin text-lg">máximo</p>
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
                        onBlur={handleMinMaxBlur}
                        className="border border-gray-400 text-black h-16 rounded-lg text-center w-full"
                      />
                      <AiOutlinePlus 
                        className="text-3xl cursor-pointer text-black ml-2" 
                        onClick={handleIncrementMaxDias} 
                      />
                    </div>
                    <p className="text-gray-500 text-center mt-2 font-josefin">dias</p>
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
