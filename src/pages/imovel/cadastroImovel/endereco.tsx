import React, { useState } from 'react';
import NavbarCadastro from '@/components/navbarCadastro';
import useNavigation from '@/hooks/CadImovel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import axios from 'axios';

const Endereco: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();

  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(e.target.value);
  };

  const handleRuaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRua(e.target.value);
  };

  const handleBairroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBairro(e.target.value);
  };

  const handleCidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCidade(e.target.value);
  };

  const handleUfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUf(e.target.value);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();

          if (!data.erro) {
            setRua(data.logradouro);
            setBairro(data.bairro);
            setCidade(data.localidade);
            setUf(data.uf);
          } else {
            alert('CEP não encontrado');
          }
        } catch (error) {
          console.error('Erro ao buscar o CEP:', error);
        }
      } else {
        alert('CEP inválido');
      }
    }
  };

  return (
    <>
      <NavbarCadastro />
      {/* Left Side */}
      <div className="flex h-screen">
        <div className="w-1/2">
          <img
            src="https://via.placeholder.com/800x600"
            alt="Imagem de imóvel"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col justify-start items-center p-4 bg-white">
          <h1 className="mb-4 text-3xl text-black font-semibold">Endereço</h1>
          <div className="w-full px-8">
            <form className="bg-white p-6 rounded-lg w-full">
              <div className="mb-4">
                <label htmlFor="CEP" className="block text-gray-700 text-black font-bold mb-2">
                  CEP
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="cep"
                  name="CEP"
                  value={cep}
                  onChange={handleCepChange}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="Rua" className="block text-gray-700 text-black font-bold mb-2">Rua</label>
                <input
                  type="text"
                  id="rua"
                  name="Rua"
                  value={rua}
                  onChange={handleRuaChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="Bairro" className="block text-gray-700 text-black font-bold mb-2">Bairro</label>
                  <input
                    type="text"
                    id="bairro"
                    name="Bairro"
                    value={bairro}
                    onChange={handleBairroChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="Cidade" className="block text-gray-700 text-black font-bold mb-2">Cidade</label>
                  <input
                    type="text"
                    id="cidade"
                    name="Cidade"
                    value={cidade}
                    onChange={handleCidadeChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-1">
                  <label htmlFor="UF" className="block text-gray-700 text-black font-bold mb-2">UF</label>
                  <input
                    type="text"
                    id="uf"
                    name="UF"
                    value={uf}
                    onChange={handleUfChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="Número" className="block text-gray-700 text-black font-bold mb-2">Número</label>
                  <input
                    type="text"
                    id="numero"
                    name="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="Complemento" className="block text-gray-700 text-black font-bold mb-2">Complemento</label>
                  <input
                    type="text"
                    id="complemento"
                    name="Complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </form>
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

export default Endereco;
