import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavbarCadastro from '@/components/navbarCadastro';
import useNavigation from '@/hooks/CadImovel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const tituloEdescricao: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('tituloEdescricao') || '{}');
    if (storedData.titulo) setTitulo(storedData.titulo);
    if (storedData.descricao) setDescricao(storedData.descricao);
  }, []);

  const handleBlurTitulo = () => {
    const tituloEdescricao = JSON.parse(localStorage.getItem('tituloEdescricao') || '{}');
    tituloEdescricao.titulo = titulo;
    localStorage.setItem('tituloEdescricao', JSON.stringify(tituloEdescricao));
  };

  const handleBlurDescricao = () => {
    const tituloEdescricao = JSON.parse(localStorage.getItem('tituloEdescricao') || '{}');
    tituloEdescricao.descricao = descricao;
    localStorage.setItem('tituloEdescricao', JSON.stringify(tituloEdescricao));
  };

  const validateFields = () => {
    if (!titulo || !descricao) {
      setError("Título e descrição são obrigatórios!"); 
      return false;
    }
    setError(""); 
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
      {/* Main Container */}
      <div className="flex h-screen overflow-hidden flex-col lg:flex-row">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 h-full flex-1 flex-shrink-0 lg:block hidden">
          <Image
            src="/assets/imgs/imagens-img.jfif"
            alt="Imagem de imagens"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 h-screen flex-1 flex-col flex-shrink-0 justify-between bg-white p-4">
          <h1 className="mb-4 text-3xl text-gray-700 text-center font-semibold">Título e descrição</h1>
          <div className="w-full px-8">
            <form className="bg-white p-6 rounded-lg w-full">
              <div className="mb-4">
                <label htmlFor='Titulo' className="block text-gray-700 text-black font-bold mb-2">
                  Título
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  onBlur={handleBlurTitulo}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor='Descricao' className="block text-gray-700 text-black font-bold mb-2">
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  onBlur={handleBlurDescricao}
                  className="w-full h-[300px] px-4 py-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-scroll resize-none"
                />
              </div>
            </form>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
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
  )
}

export default tituloEdescricao;