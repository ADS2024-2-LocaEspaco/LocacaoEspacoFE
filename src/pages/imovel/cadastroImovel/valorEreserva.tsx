import React, { useState } from 'react';
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
            src="https://s3-alpha-sig.figma.com/img/a46f/4a29/e28d2482d9492128db512efc3f429be3?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EcTKzebp1PjTjKfNz819MwyTMkNkj01qOoUix-wlTvuGKYfHoVo66j13ywHXArwIGstD9xsRy9Ai373ZwYS0EMcyol2AtlKLh8gzDXfmFR4M4qXYyPki0n~9VB1JRRoF4P0EFlY1xW9iLAcrzi0Y8n4zgQ3l1nzf1i9DqzXBU87VuqTQ589sIlDRihP0DFwn~wStADaQv-9V5khGhcW~qcbFfNjWfb8QvilEU5FmKt4Gg5OEMH38LXUat29xsuBdOElCpvh40wMVgPwGqQtkzKsEOqztK1xNyse7OxPwAayL4zCuXuV~lsi-ANGAn4CFEHIor-tCm76JDJ3NyMrBxA__"
            alt="Imagem de imóvel"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-start items-center p-4 bg-white">
          <h1 className="mb-4 text-4xl text-gray-700 font-semibold font-josefin">Valor e Reserva</h1>
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
                      onClick={() => setAntecedencia(Math.max(antecedencia - 1, 0))} // Prevent negative values
                    />
                    <div className="relative w-full">
                      <input
                        type="number"
                        id="antecedencia"
                        name="antecedencia"
                        value={antecedencia}
                        onChange={(e) => setAntecedencia(parseInt(e.target.value) || 0)} // Update antecedencia state
                        className="border border-gray-400 text-black h-16 rounded-lg text-center pl-12 w-full"
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
