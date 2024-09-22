import React from 'react';
import styles from '@/styles/LayoutCadImovel.module.css';
import { PiVideoCameraFill, PiVideoCameraSlashFill } from "react-icons/pi";
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import CardSelect from './components/CardSelect';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans'; 

interface Camera {
  name: string;
  icon: React.ReactNode;
}

const cameras: Camera[] = [
  { name: 'Sim', icon: <PiVideoCameraFill size={32} /> },
  { name: 'Não', icon: <PiVideoCameraSlashFill size={32} /> }
];

const Camera: React.FC = () => {

  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);


  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };

  return (
    // Left Side
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
        <div className="text-gray-700 font-semibold text-center font-josefin">
          <h1 className="mb-40 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
            Câmeras
          </h1>
          <p className="text-[30px] mb-20">Existe câmeras na parte externa, aparelhos de monitoramento de ruído ou armas na acomodação?</p>
        </div>
        <div className="grid grid-cols-2 gap-10 rounded-md mb-40">
          {cameras.map((camera, index) => (
              <CardSelect
                key={index}
                name={camera.name}
                selected={selectedItem === camera.name}
                icon={camera.icon}
                onSelect={() => handleSelect(camera.name)}
              />
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

export default Camera;
