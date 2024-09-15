import React, { useEffect, useState } from 'react';
import NavbarCadastro from '@/components/navbarCadastro';
import useNavigation from '@/hooks/CadImovel';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AiOutlinePlus } from "react-icons/ai";

const imagem: React.FC = () => {
    const { goToPreviousPage, goToNextPage } = useNavigation();

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            try {
                const imageUrl = URL.createObjectURL(file);
                setSelectedImage(imageUrl);
            } catch (error) {
                console.error("Erro ao gerar URL da imagem:", error);
            }
        } else {
            console.error("Arquivo não é uma imagem válida.");
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            try {
                const imageUrl = URL.createObjectURL(file);
                setSelectedImage(imageUrl);
            } catch (error) {
                console.error("Erro ao gerar URL da imagem:", error);
            }
        } else {
            console.error("Arquivo não é uma imagem válida.");
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
                    <h1 className="mb-4 text-3xl text-gray-700 font-semibold">Imagens</h1>
                    <div className="w-full px-8">
                        <p className="block text-gray-400 text-black font-bold mb-2">Tamanho mínimo de xMB e máximo de xMB</p>
                        <div className='grid grid-cols-5 grid-rows-3 gap-6'>
                            <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                className={`col-span-4 row-span-2 flex flex-col items-center justify-center border-2 ${isDragging ? "border-blue-500" : "border-gray-300"} rounded-2xl p-4 cursor-pointer h-60`}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload" className="w-full h-full flex flex-col items-center justify-center">
                                    {selectedImage ? (
                                        <img
                                            src={selectedImage}
                                            alt="Selected"
                                            className="max-h-full max-w-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div>
                                            <AiOutlinePlus className="text-gray-800 text-8xl" />
                                        </div>
                                    )}
                                </label>
                            </div>

                            <div className="bg-white p-4 border border-gray-300 rounded-lg">Caixa Menor 1</div>
                            <div className="bg-white p-4 border border-gray-300 rounded-lg">Caixa Menor 2</div>

                            <div className="bg-white p-4 border border-gray-300 rounded-lg">Caixa Menor 3</div>
                            <div className="bg-white p-4 border border-gray-300 rounded-lg">Caixa Menor 4</div>
                            <div className="bg-white p-4 border border-gray-300 rounded-lg">Caixa Menor 5</div>
                            <div className="bg-white p-4 border border-gray-300 rounded-lg">Caixa Menor 6</div>
                            <div className="bg-white p-4 border border-gray-300 rounded-lg">Caixa Menor 7</div>
                        </div>
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

export default imagem;