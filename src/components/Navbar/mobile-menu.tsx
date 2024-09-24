import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Logo from '../../../public/icons/logo.svg';
import MenuHamburgerIcon from '../../../public/icons/menu_icon.svg';
import SearchIcon from '../../../public/icons/search_icon.svg';
import Link from "next/link";

interface MobileMenuProps {
    handleBackToHomePage: () => void;
}

export default function MobileMenu() {
    const user = ''
    const router = useRouter()

    const [isOpenLateralMenu, setIsOpenLateralMenu] = useState(false)

    const handleBackToHomePage = () => {
        router.push('/')
    }

    const openLateralMenu = () => {
        setIsOpenLateralMenu(true)
    }

    const closeLateralMenu = () => {
        setIsOpenLateralMenu(false)
    }

    return (
        <>
            <nav className='flex relative w-full px-6 py-2 justify-between items-center md:hidden '>
                <Image
                    src={MenuHamburgerIcon}
                    alt='Ícone do menu'
                    onClick={openLateralMenu}
                    height={18}
                    width={28}
                    className='cursor-pointer'
                />

                <Image
                    src={Logo}
                    alt='Logo'
                    onClick={handleBackToHomePage}
                    height={52}
                    width={48}
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

            {
                isOpenLateralMenu && (
                    <div className='flex font-sans absolute h-screen w-screen md:hidden'>
                        <div className='flex-1 bg-white'>
                            <div className='flex gap-7 py-2 items-center px-4 border-b border-[#797986]'>
                                <Image
                                    src={user ? Logo : Logo}
                                    alt='Logo'
                                    height={52}
                                    width={48}
                                    className='rounded-full'
                                />

                                {
                                    !user && (
                                        <button className="font-bold">
                                            Entre ou se cadastre
                                        </button>
                                    )
                                }
                            </div>

                            {
                                user ? (
                                    <nav className='flex flex-col text-black-300'>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Ver perfil</Link>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Notificações</Link>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Editar Perfil</Link>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Viagens</Link>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Favoritos</Link>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80 text-red-500'>Sair</Link>
                                    </nav>
                                ) : (
                                    <nav className='flex flex-col text-black-300'>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Home</Link>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Sobre</Link>
                                    </nav>
                                )
                            }
                        </div>

                        <div className='w-[40%] bg-white opacity-35 cursor-pointer' onClick={closeLateralMenu} />
                    </div>
                )}
        </>
    )
}