import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Logo from '@/assets/logo.svg'
import Link from 'next/link'
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdOutlineAccountCircle } from "react-icons/md";

const NavbarCadastro: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleBackToHomePage = () => {
    router.push('/');
  };

  const toggleMenu = () => {
    console.log("Menu toggled:", !isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-2 py-2 flex justify-between items-center">
          <Image
            src={Logo}
            alt="Logo"
            onClick={handleBackToHomePage}
            height={92}
            width={92}
            className="cursor-pointer"
          />

          <div className="sm:hidden">
            <RxHamburgerMenu
              className="text-2xl cursor-pointer"
              onClick={toggleMenu}
            />
          </div>

          {isOpen && (
            <div className="absolute top-16 left-0 w-full bg-white shadow-md sm:hidden">
              <ul className="flex flex-col space-y-2 p-4">
                <li>
                  <button className="text-gray-700 hover:bg-gray-100">
                    Link 1
                  </button>
                </li>
                <li>
                  <button className="text-gray-700 hover:bg-gray-100">
                    Link 2
                  </button>
                </li>
                <li>
                  <button className="text-gray-700 hover:bg-gray-100">
                    Link 3
                  </button>
                </li>
              </ul>
            </div>
          )}

          <button className="hidden sm:block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Salvar e Sair
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavbarCadastro;