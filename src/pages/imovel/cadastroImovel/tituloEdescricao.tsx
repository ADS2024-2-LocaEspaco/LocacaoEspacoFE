import React, { useEffect, useState } from 'react';
import NavbarCadastro from '@/components/navbarCadastro';
import useNavigation from '@/hooks/CadImovel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const tituloEdescricao: React.FC = () => {
    const { goToPreviousPage, goToNextPage } = useNavigation();

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');


    return(
        <>
        <NavbarCadastro />
        {/* Main Container */}
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Side */}
        <div className="w-full md:w-1/2">
          <img
            src="https://s3-alpha-sig.figma.com/img/c6e9/1b9b/5e7f842c0234981a348d3e239ef4523f?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IEcUXmY-xNnG3nP-yzxbKDB77TnZyVb7BDKizFwwvxUORJQscKZ6OtwynpHq~sObdssBb~OnJqAnITPute1HPbiANDr9hVAFge7SeZZ-aIu1t3RVdKPgT4LX5GrPCgRUsF3mahTLNJWBZLmA5Rf0ARythKDWYuzs3EqOf9SxQ~uW4LOvsyi9yKT-M3ejT3ql7NbEaLRXb-rqBwFbBwA6bKBd1HVQuqe7io4US6uggOUgOEnOD343a~16J~IZSdw7lFyF7tb9f92Tna3zU2FSbaVLy2vrewvAsjt6UMlvHXscUeG~VnlqR6lw~pBErnKnGf01lqJ4rYGpeGxY9tHq5A__"
            alt="Imagem de imóvel"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-start items-center p-4 bg-white">
          <h1 className="mb-4 text-3xl text-gray-700 font-semibold">Título e descrição</h1>
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
                      onChange={e => setTitulo(e.target.value)}
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
                      onChange={e => setDescricao(e.target.value)}
                      className="w-full h-[300px]  px-4 py-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-y-scroll resize-none"
                    />
                    
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
    )
}

export default tituloEdescricao;