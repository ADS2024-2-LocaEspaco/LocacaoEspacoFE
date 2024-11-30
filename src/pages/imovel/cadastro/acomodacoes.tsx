import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaUserFriends, FaBed, FaShower } from 'react-icons/fa';
import { MdOutlineBedroomChild } from "react-icons/md";
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans';

interface Acomodacao {
  name: string;
  label: string;
  icon: React.ReactNode;
}

const acomodacoes: Acomodacao[] = [
  { name: 'quartos', label: 'Quartos', icon: <MdOutlineBedroomChild size={32} /> },
  { name: 'camas', label: 'Camas', icon: <FaBed size={32} /> },
  { name: 'banheiros', label: 'Banheiros', icon: <FaShower size={32} /> },
  { name: 'hospedes', label: 'Hóspedes', icon: <FaUserFriends size={32} /> },
];

const Acomodacoes: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();

  const [values, setValues] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const savedValues = localStorage.getItem('acomodacoes');
    if (savedValues) {
      setValues(JSON.parse(savedValues));
    } else {

      const initialValues: { [key: string]: number } = {};
      acomodacoes.forEach((acomodacao) => {
        initialValues[acomodacao.name] = 0;
      });
      setValues(initialValues);
    }
  }, []);

  const handleInputChange = (name: string, value: number) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);

    localStorage.setItem('acomodacoes', JSON.stringify(newValues));
  };

  return (
    <>
      <NavbarCadastro />
      <div className="flex h-screen overflow-hidden flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-full flex-1 flex-shrink-0 lg:block hidden">
        <Image
            src="/assets/imgs/acomodacoes-img.jfif"
            alt="Imagem de imóvel"
            width={500}
            height={500}
            className="w-full h-full object-cover"
        />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <div className="flex flex-col items-center">
            <h1 className="mb-4 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
              Acomodações e Hóspedes
            </h1>
            <div className="flex-shrink grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 rounded-md mt-20 mb-40">
              {acomodacoes.map((acomodacao, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center border border-gray-400 justify-center bg-white p-4 h-40 w-40 rounded-lg"
                >
                  <p className="text-gray-700">{acomodacao.icon}</p>
                  <p className="mt-2 text-center font-josefin text-gray-700">{acomodacao.label}</p>
                  <div>
                    <input
                      type="number"
                      min="0"
                      value={values[acomodacao.name] || 0}
                      onChange={(e) => handleInputChange(acomodacao.name, parseInt(e.target.value))}
                      className="mt-2 ml-2 w-full text-center p-1 text-black font-josefin"
                      placeholder="0"
                    />
                  </div>
                </div>
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

export default Acomodacoes;