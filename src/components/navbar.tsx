import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import Logo from '../../public/icons/logo.svg';
import MenuHamburgerIcon from '../../public/icons/menu_icon.svg';
import AccountIcon from '../../public/icons/account_circle_icon.svg';
import SearchIcon from '../../public/icons/search_icon.svg';

interface MobileMenuProps {
  openMobileMenu: () => void;
  handleBackToHomePage: () => void;
}

interface MobileMenuNavbarProps {
  closeMobileMenu: () => void;
}

interface MenuProps {
  handleBackToHomePage: () => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>) => void;
  setSearchInput: Dispatch<SetStateAction<string>>;
}

function MobileMenu({ openMobileMenu, handleBackToHomePage }: MobileMenuProps) {
  return (
    <nav className='flex relative w-full h-24 px-6 justify-between items-center md:hidden'>
      <Image
        src={MenuHamburgerIcon}
        alt='Ícone do menu'
        onClick={openMobileMenu}
        height={24}
        width={36}
        className='cursor-pointer'
      />

      <Image
        src={Logo}
        alt='Logo'
        onClick={handleBackToHomePage}
        height={60}
        width={60}
        className='cursor-pointer'
      />

      <Image
        src={SearchIcon}
        alt='Botão de pesquisa'
        height={24}
        width={24}
        className='cursor-pointer'
      />
    </nav>
  );
}

function MobileMenuNavbar({ closeMobileMenu }: MobileMenuNavbarProps) {
  const user = ''; // Aqui você pode verificar o estado de autenticação

  return (
    <div className='flex absolute h-screen w-screen md:hidden'>
      <div className='flex-1 bg-white'>
        <div className='flex h-24 items-center px-6 border-b border-[#797986]'>
          <Image
            src={user ? Logo : AccountIcon}
            alt='Logo'
            height={60}
            width={60}
            className='rounded-full'
          />
        </div>

        {user ? (
          <nav className='flex flex-col'>
            <Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Ver perfil</Link>
            <Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Notificações</Link>
            <Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Editar Perfil</Link>
            <Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Viagens</Link>
            <Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Favoritos</Link>
            <Link href={'#'} className='pl-7 py-4 hover:opacity-80 text-red-500'>Sair</Link>
          </nav>
        ) : (
          <nav className='flex flex-col'>
            <Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Home</Link>
            <Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Sobre</Link>
          </nav>
        )}
      </div>

      <div className='w-[40%] bg-white opacity-35 cursor-pointer' onClick={closeMobileMenu} />
    </div>
  );
}

function Menu({ handleBackToHomePage, handleSearch, setSearchInput }: MenuProps) {
  const router = useRouter();

  // Redirecionar para a página de anunciar
  const handleAnunciarClick = () => {
    router.push('/anunciar');
  };

  return (
    <nav className="flex w-full h-28 px-20 gap-24 justify-between items-center max-md:hidden">
      <Image
        src={Logo}
        alt='Logo'
        onClick={handleBackToHomePage}
        height={80}
        width={80}
        className='cursor-pointer'
      />

      <form onSubmit={handleSearch} className="flex gap-3 max-w-[640px] w-full h-12 px-4 justify-between items-center border-[0.5px] border-[#797986] rounded-2xl">
        <input 
          type='text'
          className="flex-1 bg-transparent focus:outline-none mt-1"
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <Image
          src={SearchIcon}
          alt='Logo'
          onClick={handleSearch}
          height={20}
          width={20}
          className='cursor-pointer'
        />
      </form>

      <div className="flex gap-4">
        <button
          className="bg-white text-blue-500 border border-grey rounded-[16px] w-[148px] h-[48px]"
          onClick={handleAnunciarClick}
        >
          Anunciar
        </button>

        <button
          className="bg-orange-500 text-white rounded-[16px] w-[148px] h-[48px]"
          onClick={() => router.push('/login')}
        >
          Entrar
        </button>
      </div>
    </nav>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [searchInput, setSearchInput] = useState<string>('');

  const handleBackToHomePage = () => {
    router.push('/');
  };

  const openMobileMenu = () => {
    setIsOpenMobileMenu(true);
  };

  const closeMobileMenu = () => {
    setIsOpenMobileMenu(false);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    if (searchInput) {
      console.log(`/search/${searchInput}`);
      // router.push(`/search/${searchInput}`); // Descomente esta linha para fazer o redirecionamento
    }
  };

  return (
    <>
      <MobileMenu openMobileMenu={openMobileMenu} handleBackToHomePage={handleBackToHomePage} />

      <Menu handleBackToHomePage={handleBackToHomePage} handleSearch={handleSearch} setSearchInput={setSearchInput} />

      {isOpenMobileMenu && (
        <MobileMenuNavbar closeMobileMenu={closeMobileMenu} />
      )}
    </>
  );
}
