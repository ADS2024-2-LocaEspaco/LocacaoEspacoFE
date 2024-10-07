import Link from "next/link";

import UserImage from '../../assets/user.png'
import ArrowDropDownIcon from '../../../public/icons/arrow_drop_down.svg'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface DesktopMenuButtonsProps {
    openDropdownMenu: () => void
}

export default function DesktopMenuButtons() {
    const user = 'Lucas Santos'

    const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

    const [isOpenDropdownMenu, setIsOpenDropdownMenu] = useState(false)

    useEffect(() => {
        const handleClickOutsideDropdownMenu = (event: MouseEvent) => {
            if (dropdownMenuRef.current && (event.target instanceof Node && !dropdownMenuRef.current.contains(event.target))) {
                console.log('to aq')
                setIsOpenDropdownMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutsideDropdownMenu)

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdownMenu)
        }
    })

    return (
        <div className="relative flex gap-4">
            <button className="w-32 h-10 font-bold bg-blue-300 text-white border border-gray-100 rounded-2xl hover:opacity-80">
                Anunciar
            </button>

            <div ref={dropdownMenuRef}>
                <div
                    onClick={() => {
                        setIsOpenDropdownMenu(!isOpenDropdownMenu)
                        console.log(isOpenDropdownMenu)
                    }}
                    className="flex gap-2 items-center cursor-pointer"
                >
                    <h1 className="font-bold text-black-100">{user}</h1>

                    <Image
                        src={UserImage}
                        alt='Logo'
                        onClick={() => console.log()}
                        height={40}
                        width={40}
                    />

                    <Image
                        src={ArrowDropDownIcon}
                        alt='Logo'
                        onClick={() => console.log()}
                        height={8}
                        width={12}
                    />
                </div>

                {
                    isOpenDropdownMenu && (
                        <nav  className='absolute top-10 right-0 flex flex-col w-48 bg-white rounded-2xl text-black-300 shadow-xl'>
                            <Link href={'#'} className='pl-7 py-2 hover:opacity-80'>Ver perfil</Link>
                            <Link href={'#'} className='pl-7 py-2 hover:opacity-80'>Favoritos</Link>
                            <Link href={'#'} className='pl-7 py-2 hover:opacity-80'>Notificações</Link>
                            <Link href={'#'} className='pl-7 py-2 hover:opacity-80'>Viagens</Link>

                            <div className="border border-b-gray-100 opacity-30" />

                            <Link href={'#'} className='pl-7 py-2 hover:opacity-80'>Editar Perfil</Link>
                            <Link href={'#'} className='pl-7 py-2 hover:opacity-80 text-red-500'>Sair</Link>
                        </nav>
                    )
                }
            </div>
        </div>
    )
};
