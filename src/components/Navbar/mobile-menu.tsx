import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from '../../../public/icons/logo.svg';
import MenuHamburgerIcon from '../../../public/icons/menu_icon.svg';
import SearchIcon from '../../../public/icons/search_icon.svg';
import CloseIcon from '../../../public/icons/x.svg';
import DestinyIcon from '../../../public/icons/destiny_icon.svg'
import PlusIcon from '../../../public/icons/plus_circle_icon.svg'
import MinusIcon from '../../../public/icons/dash_circle_icon.svg';
import CalendarIcon from '../../../public/icons/calendar_icon.svg';

interface MobileMenuProps {
    handleBackToHomePage: () => void;
}

export default function MobileMenu() {
    const user = ''
    const router = useRouter()

    const [isOpenLateralMenu, setIsOpenLateralMenu] = useState(false)
    const [isOpenSearch, setIsOpenSearch] = useState(false)

    const [searchBar, setSearchBar] = useState({
        adults: 0,
        children: 0,
        babies: 0,
        pets: 0
    })

    const handleBackToHomePage = () => {
        router.push('/')
    }

    const openLateralMenu = () => {
        setIsOpenLateralMenu(true)
    }

    const closeLateralMenu = () => {
        setIsOpenLateralMenu(false)
    }

    const handleSearch = () => {
        console.log('Hello')
    }

    return (
        <>
            <nav className='flex relative w-full px-6 py-2 justify-between items-center min-[1150px]:hidden border-b border-gray-300'>
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
                    onClick={() => setIsOpenSearch(true)}
                />
            </nav>

            {
                isOpenLateralMenu && (
                    <div className='fixed inset-0 flex font-sans h-screen w-screen min-[1150px]:hidden'>
                        <div className='flex-1 bg-white'>
                            <div className='flex gap-7 py-2 items-center px-4 border-b border-gray-300'>
                                <Image
                                    src={user ? Logo : Logo}
                                    alt='Logo'
                                    height={52}
                                    width={48}
                                    className='rounded-full'
                                />

                                {
                                    !user && (
                                        <button className="font-bold text-sm text-gray-400">
                                            Entre ou se cadastre
                                        </button>
                                    )
                                }
                            </div>

                            {
                                user ? (
                                    <nav className='flex flex-col text-black-100'>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Ver perfil</Link>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Notificações</Link>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Editar Perfil</Link>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Viagens</Link>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Favoritos</Link>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80 text-red-500'>Sair</Link>
                                    </nav>
                                ) : (
                                    <nav className='flex flex-col text-black-100'>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Home</Link>
                                        <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Sobre</Link>
                                    </nav>
                                )
                            }
                        </div>

                        <div className='w-[40%] bg-white opacity-35 cursor-pointer' onClick={closeLateralMenu} />
                    </div>
                )
            }

            {
                isOpenSearch && (
                    <div className='fixed inset-0 overflow-hidden flex flex-col jus bg-white h-screen w-full min-[1150px]:hidden py-2 px-4 gap-6'>
                        <div className="flex justify-between">
                            <Image
                                src={Logo}
                                alt='Logo'
                                onClick={handleBackToHomePage}
                                height={52}
                                width={48}
                                className='cursor-pointer'
                            />

                            <Image
                                src={CloseIcon}
                                alt='Logo'
                                height={16}
                                width={16}
                                className='cursor-pointer'
                                onClick={() => setIsOpenSearch(false)}
                            />
                        </div>

                        <div className="flex flex-col gap-px">
                            <label htmlFor="destiny">Destino: </label>
                            <input type="text" id="destiny" className='flex-1 bg-transparent border-b focus:outline-none text-[12px] placeholder:text-gray-300' placeholder="Informe o local" />
                        </div>

                        <div className="flex justify-center gap-4">
                            <button className='flex items-center text-sm border rounded-md text-black-100 px-6 py-2 gap-2 hover:bg-gray-100'>
                                <Image src={CalendarIcon} alt='Ícone de destino' />

                                Check-in
                            </button>

                            <button className='flex items-center text-sm border rounded-md text-black-100 px-6 py-2 gap-2 hover:bg-gray-100'>
                                <Image src={CalendarIcon} alt='Ícone de destino' />
                                Check-out
                            </button>
                        </div>

                        <div className='mx-auto px-5 bg-white rounded-2xl max-w-96 w-full drop-shadow'>
                            <div className='flex py-3 justify-between gap-4'>
                                Adultos

                                <div className='flex gap-1'>
                                    <Image onClick={() => searchBar.adults > 0 && setSearchBar({ ...searchBar, adults: searchBar.adults - 1 })} src={MinusIcon} alt='Ícone de menos' />
                                    {searchBar.adults}
                                    <Image onClick={() => setSearchBar({ ...searchBar, adults: searchBar.adults + 1 })} src={PlusIcon} alt='Ícone de mais' />
                                </div>
                            </div>

                            <div className='flex py-3 justify-between gap-4 border-y-[0.5px] border-gray-200'>
                                Crianças

                                <div className='flex gap-1'>
                                    <Image onClick={() => searchBar.children > 0 && setSearchBar({ ...searchBar, children: searchBar.children - 1 })} src={MinusIcon} alt='Ícone de menos' />
                                    {searchBar.children}
                                    <Image onClick={() => setSearchBar({ ...searchBar, children: searchBar.children + 1 })} src={PlusIcon} alt='Ícone de mais' />
                                </div>
                            </div>

                            <div className='flex py-3 justify-between gap-4 border-b-[0.5px] border-gray-200'>
                                Bebês

                                <div className='flex gap-1'>
                                    <Image onClick={() => searchBar.babies > 0 && setSearchBar({ ...searchBar, babies: searchBar.babies - 1 })} src={MinusIcon} alt='Ícone de menos' />
                                    {searchBar.babies}
                                    <Image onClick={() => setSearchBar({ ...searchBar, babies: searchBar.babies + 1 })} src={PlusIcon} alt='Ícone de mais' />
                                </div>
                            </div>

                            <div className='flex py-3 justify-between gap-4'>
                                Animais de estimação

                                <div className='flex gap-1'>
                                    <Image onClick={() => searchBar.pets > 0 && setSearchBar({ ...searchBar, pets: searchBar.pets - 1 })} src={MinusIcon} alt='Ícone de menos' />
                                    {searchBar.pets}
                                    <Image onClick={() => setSearchBar({ ...searchBar, pets: searchBar.pets + 1 })} src={PlusIcon} alt='Ícone de mais' />
                                </div>
                            </div>
                        </div>

                        <button onClick={handleSearch} className="mx-auto bg-blue-300 text-white font-bold hover:opacity-90 px-8 py-2 rounded-2xl">Pesquisar</button>
                    </div>
                )
            }
        </>
    )
}