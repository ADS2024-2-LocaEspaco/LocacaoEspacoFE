import React, { useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/LayoutCadImovel.module.css';
import { PiVideoCameraFill, PiVideoCameraSlashFill } from "react-icons/pi";
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CardSelect from './components/CardSelect';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans'; 

interface Camera {
  name: string;
  value: boolean;
  icon: React.ReactNode;
}

const cameras: Camera[] = [
  { name: 'Sim', value: true, icon: <PiVideoCameraFill size={32} /> },
  { name: 'Não', value: false, icon: <PiVideoCameraSlashFill size={32} /> }
];

const Camera: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItem, setSelectedItem] = React.useState<Camera | null>(null);

  useEffect(() => {
    const selectedOption = localStorage.getItem('opcao_camera');
    if (selectedOption) {
      setSelectedItem(JSON.parse(selectedOption)[0]);
    }
  }, []);

  const handleSelect = (item: Camera) => {
    setSelectedItem(item);
    localStorage.setItem('opcao_camera', JSON.stringify([item]));
  };

  return (
    <>
      <NavbarCadastro />
      <div className="flex h-screen overflow-hidden flex-col lg:flex-row">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 h-full flex-1 flex-shrink-0 lg:block hidden">
          <Image
            src="/assets/imgs/camera-img.jfif"
            alt="Imagem de camera"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col justify-center items-center p-4 bg-white">
          <div className="text-gray-700 font-semibold text-center font-josefin">
            <h1 className="mb-40 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
              Câmeras
            </h1>
            <p className="text-[30px] mb-20">
              Existem câmeras na parte externa, aparelhos de monitoramento de ruído ou armas na acomodação?
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 rounded-md mb-40">
            {cameras.map((camera, index) => (
              <CardSelect
                key={index}
                name={camera.name}
                selected={selectedItem?.name === camera.name}
                icon={camera.icon}
                onSelect={() => handleSelect(camera)}
              />
            ))}
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

export default Camera;
