import React from 'react';
import { FaRegBuilding, FaHouseUser } from 'react-icons/fa';
import { FaHouseChimney, FaTreeCity, FaTent   } from "react-icons/fa6";
import { MdOutlineHouseSiding } from "react-icons/md";
import { PiShippingContainerFill, PiFarm } from "react-icons/pi";
import { GiEcology } from "react-icons/gi";

interface Categoria {
  name: string;
  icon: React.ReactNode;
}

const categorias: Categoria[] = [
  { name: 'Casa', icon: <FaHouseChimney size={32} /> },
  { name: 'Apartamento', icon: <FaRegBuilding size={32} /> },
  { name: 'Cabana', icon: <MdOutlineHouseSiding size={32} /> },
  { name: 'Contêiner', icon: <PiShippingContainerFill size={32} /> },
  { name: 'Fazenda', icon: <PiFarm size={32} /> },
  { name: 'Casa Ecológica', icon: <GiEcology size={32} /> },
  { name: 'Casa de Hóspedes', icon: <FaHouseUser size={32} /> },
  { name: 'Casa de Árvore', icon: <FaTreeCity size={32} /> },
  { name: 'Tenda', icon: <FaTent size={32} /> },
];

const TipoImovel: React.FC = () => {
  return (
    <div className="flex flex-end">
      <h1>Tipo de Imóvel</h1>
      {categorias.map(( categoria ) => (
        <p>{categoria.icon}</p>
      ))}
    </div>
  );
};

export default TipoImovel;
