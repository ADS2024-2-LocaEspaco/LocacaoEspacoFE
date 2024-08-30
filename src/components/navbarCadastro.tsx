import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Logo from '@/assets/logo.svg'



const NavbarCadastro: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter()
  const handleBackToHomePage = () => {
    router.push('/')

  }

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-2 py-2 flex justify-between items-center">
          <Image
            src={Logo}
            alt='Logo'
            onClick={() => handleBackToHomePage}
            height={92}
            width={92}
            className='cursor-pointer'
          />

          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Salvar e Sair
          </button>
        </div>
      </nav>
    </>
  );
};


export default NavbarCadastro;