import React from 'react';
import NavbarCadastro from '@/components/navbarCadastro';

const Acomodacoes: React.FC = () => {
  return (
    <>
    <NavbarCadastro/>
    <div className='mainContainer'>
      <h1>Acomodações do Imóvel</h1>
      <p>Informe as acomodações disponíveis no imóvel.</p>
    </div>
    </>
    
  );
};

export default Acomodacoes;
