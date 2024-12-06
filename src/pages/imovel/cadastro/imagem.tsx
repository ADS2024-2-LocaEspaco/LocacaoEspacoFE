import React, { useState } from "react";
import Image from "next/image";
import NavbarCadastro from "@/components/navbarCadastro";
import useNavigation from "@/hooks/CadImovel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";

const Imagem: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith("image/")
    );

    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...imageUrls]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file =>
      file.type.startsWith("image/")
    );

    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...imageUrls]);
  };

  return (
    <>
      <NavbarCadastro />
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
          <h1 className="mb-4 text-3xl text-gray-700 text-center font-semibold">Imagens</h1>
          <div className="w-full px-8">
            <p className="block text-gray-400 text-black font-bold mb-2">
              Tamanho mínimo de xMB e máximo de xMB
            </p>
            <div className="grid grid-cols-5 grid-rows-3 gap-6">
              {/* Drag and Drop Box */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`col-span-4 row-span-2 flex flex-col items-center justify-center border-2 ${
                  isDragging ? "border-blue-500" : "border-gray-300"
                } rounded-2xl p-4 cursor-pointer h-60`}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="w-full h-full flex flex-col items-center justify-center">
                  <AiOutlinePlus className="text-gray-800 text-8xl" />
                </label>
              </div>

              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-4 border border-gray-300 rounded-lg flex items-center justify-center"
                >
                  {selectedImages[index] && (
                    <img
                      src={selectedImages[index]}
                      alt={`Image ${index + 1}`}
                      className="max-h-full max-w-full object-cover rounded-lg"
                    />
                  )}
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

export default Imagem;
