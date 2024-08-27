import React from 'react';
import NavbarCadastro from '@/components/navbarCadastro';

const TipoEspaco: React.FC = () => {
  return (
    <>
     <NavbarCadastro />
     <div className='main-container'>
        <h1>Tipo de Espaço</h1>
        <p>Defina o tipo de espaço do imóvel.</p>
      </div>
    </>
  );
};

export default TipoEspaco;
