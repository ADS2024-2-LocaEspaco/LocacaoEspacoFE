import React, { useState, useEffect } from 'react';
import { FaUserFriends, FaBed, FaShower } from 'react-icons/fa';
import { MdOutlineBedroomChild } from "react-icons/md";
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans'; 

interface Acomodacao {
  name: string;
  icon: React.ReactNode;
}

const acomodacoes: Acomodacao[] = [
  { name: 'Quartos', icon: <MdOutlineBedroomChild size={32} /> },
  { name: 'Camas', icon: <FaBed size={32} /> },
  { name: 'Banheiros', icon: <FaShower size={32} /> },
  { name: 'Hóspedes', icon: <FaUserFriends size={32} /> },
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
            Acomodações e Hóspedes
          </h1>
          <div className="grid grid-cols-2 gap-10 rounded-md mt-20">
            {acomodacoes.map((acomodacao, index) => (
              <div
                key={index}
                className="flex flex-col items-center border border-gray-400 justify-center bg-white p-4 h-40 w-40 rounded-lg"
              >
                <p className="text-gray-700">{acomodacao.icon}</p>
                <p className="mt-2 text-center font-josefin text-gray-700">{acomodacao.name}</p>
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
          <div className="flex justify-between items-center w-full mt-4">
            <IoIosArrowBack className="text-6xl cursor-pointer text-black" onClick={goToPreviousPage}/>
            <IoIosArrowForward className="text-6xl cursor-pointer text-black" onClick={goToNextPage}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Acomodacoes;