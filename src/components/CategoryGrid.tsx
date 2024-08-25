import React from 'react';
import { FaHouseChimey, FaRegBuilding, MdOutlineHouse, PiShippingContainerBold, GiFarmTractor, GiEcology, FaHouseUser, FaTreeCity, FaTent } from 'react-icons/fa';

interface Category {
    name: string;
    icon: React.ReactNode;
}

const categories: Category[] = [
    { name: 'Casa', icon: <FaHouseChimey size={32} /> },
    { name: 'Apartamento', icon: <FaRegBuilding size={32} /> },
    { name: 'Cabana', icon: <MdOutlineHouse size={32} /> },
    { name: 'Contêiner', icon: <PiShippingContainerBold size={32} /> },
    { name: 'Fazenda', icon: <GiFarmTractor size={32} /> },
    { name: 'Casa Ecológica', icon: <GiEcology size={32} /> },
    { name: 'Casa de Hóspedes', icon: <FaHouseUser size={32} /> },
    { name: 'Casa de Árvore', icon: <FaTreeCity size={32} /> },
    { name: 'Tenda', icon: <FaTent size={32} /> },
  ];

  const CategoryGrid: React.FC = () => {
    return (
        <div>
            
        </div>
    );
  };