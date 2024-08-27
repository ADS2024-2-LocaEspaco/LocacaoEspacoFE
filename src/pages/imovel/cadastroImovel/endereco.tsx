import React from 'react';
import NavbarCadastro from '@/components/navbarCadastro';

const Endereco: React.FC = () => {
  return (
    <>
    <NavbarCadastro/>
    <div className='main-container'>
      <h1>Endereço do Imóvel</h1>
      <p>Insira o endereço completo do imóvel.</p>
    </div>
    </>
    
  );
};

export default Endereco;
