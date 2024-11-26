import React, { useEffect } from 'react';
import styles from '@/styles/LayoutCadImovel.module.css';
import { PiVideoCameraFill, PiVideoCameraSlashFill } from "react-icons/pi";
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CardSelect from './components/CardSelect';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans'; 

interface Camera {
  name: string;
  value: number;
  icon: React.ReactNode;
}

const cameras: Camera[] = [
  { name: 'Sim', value: 1, icon: <PiVideoCameraFill size={32} /> },
  { name: 'Não', value: 0, icon: <PiVideoCameraSlashFill size={32} /> }
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
      <div className="flex h-screen">
        {/* Left Side */}
        <div className="w-1/2">
          <img
            src="https://s3-alpha-sig.figma.com/img/2ed7/da69/10de204ec39c3164bb375faeadf39d2e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FbvvDeLgJnS-88~nJRrtAiEy0oKNmiUQYJ3ENyk1KSUu33FwXtu~LkPSDA2DhOjUF09BuUWy8lY8otQXwe9QUgbp04uIyC4pcUqnPtfa-AL1Wn3crHM9CaZRD3rv5ejjtxTtAv6AWiIuGR6KWVCRop0rs-GBC5W8GU9OD1KyegzVgmqcQz9we8ZvztP0CcVO2zaCcJhelfn8HQIoZW-St4VMJGNKoyCGMdF3j7RjPkSCrdC9LRTidNVEzJr0K0Y9VkQJh28RYHcAhPSN5K4qhtgEYPUHkkf8-ZfUT0yeyjILGmSjYLofqUFNr4VJ3Djg-m-XRcMtEcl2aBQxgQkppw__"
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
