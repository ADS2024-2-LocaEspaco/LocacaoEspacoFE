import React from 'react';
import NavbarCadastro from '@/components/navbarCadastro';

const TipoImovel: React.FC = () => {
  return (
    <>
     <NavbarCadastro />
      <div className='main-container'>
        <h1>Tipo de Imóvel</h1>
        <p>Selecione o tipo de imóvel para continuar.</p>
      </div>
    </>
  );
};

export default TipoImovel;
