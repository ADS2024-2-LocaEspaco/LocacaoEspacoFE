'use-client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Image from 'next/image'

import Logo from '@/assets/logo.svg'
import menuHamburgerIcon from '@/assets/menuHamburgerIcon.svg'
import accountIcon from '@/assets/accountIcon.svg'

export default function Navbar() {
    const router = useRouter()

    const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false)

    const handleBackToHomePage = () => {
        router.push('/')
    }

    const openMobileMenu = () => {
        console.log(isOpenMobileMenu)
        setIsOpenMobileMenu(true)
    }

    const closeMobileMenu = () => {
        console.log(isOpenMobileMenu)
 
        setIsOpenMobileMenu(false)
    }

    return (
        <>
            <nav className='flex relative w-full px-3 py-3 justify-between items-center md:hidden '>
                <Image
                    src={menuHamburgerIcon}
                    alt='Logo'
                    onClick={openMobileMenu}
                    height={48}
                    width={48}
                    className='cursor-pointer'
                />

                <Image
                    src={Logo}
                    alt='Logo'
                    onClick={handleBackToHomePage}
                    height={92}
                    width={92}
                    className='cursor-pointer'
                />

                <div className="material-symbols-outlined text-5xl cursor-pointer font-thin">search</div>
            </nav>

            <nav className="flex w-full px-20 py-8 gap-24 justify-between items-center max-md:hidden">
                <Image
                    src={Logo}
                    alt='Logo'
                    onClick={() => handleBackToHomePage}
                    height={92}
                    width={92}
                    className='cursor-pointer'
                />

                <form className="max-w-[640px] w-full h-12 flex gap-3 justify-between border items-center border-[#797986] bg- px-7 py-2 rounded-2xl">
                    <input className="flex-1 bg-transparent focus:outline-none"></input>

                    <div className="material-symbols-outlined text-3xl cursor-pointer font-thin">search</div>
                </form>

                <div>
                    <button>Anunciar</button>
                    <button>Entrar</button>
                </div>
            </nav>

            {
                isOpenMobileMenu && (
                    <div className='flex absolute h-screen w-screen md:hidden'>
                        <div className='flex-1 bg-white'>
                            <div className='p-4 border-b border-[#797986]'>
                                <Image
                                    src={accountIcon}
                                    alt='Logo'
                                    height={72}
                                    width={72}
                                />
                            </div>

                            <nav className='flex flex-col'>
                                <Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Ver perfil</Link>
                                <Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Notificações</Link>
                                <Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Editar Perfil</Link>
                                <Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Viagens</Link>
                                <Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Favoritos</Link>
                            </nav>
                        </div>

                        <div className='w-[40%] bg-white opacity-35 cursor-pointer' onClick={closeMobileMenu} />
                    </div>
                )
            }
        </>
    )
}