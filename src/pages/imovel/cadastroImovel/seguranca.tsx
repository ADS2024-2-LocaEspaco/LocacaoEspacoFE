import React, { useEffect } from 'react';
import { FaCloud, FaFireAlt, FaFirstAid, FaExclamationTriangle } from 'react-icons/fa';
import NavbarCadastro from '@/components/navbarCadastro';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CardSelect from './components/CardSelect';
import useNavigation from '@/hooks/CadImovel';
import '@fontsource/josefin-sans'; 

interface SafetyItem {
  name: string;
  icon: React.ReactNode;
}

const safetyItems: SafetyItem[] = [
  { name: 'Detector de fumaça', icon: <FaCloud size={32} /> },
  { name: 'Extintor de incêndio', icon: <FaFireAlt size={32} /> },
  { name: 'Kit primeiros socorros', icon: <FaFirstAid size={32} /> },
  { name: 'Alarme de carbono', icon: <FaExclamationTriangle size={32} /> },
];

const Seguranca: React.FC = () => {
  const { goToPreviousPage, goToNextPage } = useNavigation();
  const [selectedItems, setSelectedItems] = React.useState<SafetyItem[]>([]);

  useEffect(() => {
    const storedSelection = localStorage.getItem("seguranca");
    if (storedSelection) {
      const parsedSelection: SafetyItem[] = JSON.parse(storedSelection);
      setSelectedItems(parsedSelection);
    }
  }, []);

  const handleSelect = (item: SafetyItem) => {
    const isSelected = selectedItems.some(selected => selected.name === item.name);

    let updatedSelection: SafetyItem[];
    if (isSelected) {
      updatedSelection = selectedItems.filter(selected => selected.name !== item.name);
    } else {
      updatedSelection = [...selectedItems, item];
    }

    setSelectedItems(updatedSelection);
    localStorage.setItem("seguranca", JSON.stringify(updatedSelection));
  };

  return (
    <>
      <NavbarCadastro />
      <div className="flex h-screen">
        <div className="w-1/2">
          <img
            src="https://s3-alpha-sig.figma.com/img/93b3/4f16/f2c5253605f82e28172c9b981bc02714?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iuTrDsl1x46bDySs~jMw1qGfRaHqH4FfxnQMZpIiuGp8mUM0fbDsq1L8AGz5zRVhgZnx6Yxxttl0zWS85VjWUrWaQNDj9a4CG9OaUeeyTFyCrs4cwirjgbwI~xJMGV~TrTSM9pbTbEnKJxHRP9kxc-C0QzoxXP54q4ywigzjsNxHEV5hgccaRcmS-HpvMZB3j4jsrD3A0fXSKFKHITRDi5HyPKVnMI3cJ06t3JEurVIE8m6frAGSIbUXpZn8mUbcLCQr75soWan12Yho1UVMyM2kxgct0j6QWuKDc4mfbz~CWFGZOQAV-rirn1TwlWI4yBwM7g6c7JDmxPEEz6YStw__"
            alt="Imagem de imóvel"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col justify-center items-center p-4 bg-white">
          <h1 className="mb-4 text-[42px] font-semibold leading-[42px] text-center font-josefin text-gray-700">
            Segurança
          </h1>
          <div className="grid grid-cols-2 gap-10 rounded-md mt-20">
            {safetyItems.map((safetyItem, index) => (
              <CardSelect
                key={index}
                name={safetyItem.name}
                icon={safetyItem.icon}
                selected={selectedItems.some(item => item.name === safetyItem.name)}
                onSelect={() => handleSelect(safetyItem)}
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

export default Seguranca;
