import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/router";

import ArrowDropDownIcon from '../../../public/icons/arrow_drop_down.svg'
import Image from "next/image";

interface DesktopMenuButtonsProps {
    username: string
    picture: string
}

export default function DesktopMenuButtons({ username, picture }: DesktopMenuButtonsProps) {
    const session = useSession()
    const router = useRouter()

    const dropdownMenuRef = useRef<HTMLElement | null>(null);
    const [isOpenDropdownMenu, setIsOpenDropdownMenu] = useState(false);

    const handleLogout = () => {
        session.deleteSession()
        router.push('/')
    }

    useEffect(() => {
        const handleClickOutsideDropdownMenu = (event: MouseEvent) => {
			if (dropdownMenuRef.current && event.target instanceof Node && !dropdownMenuRef.current.contains(event.target)) {
				setIsOpenDropdownMenu(false)
			}
		}

        document.addEventListener('mousedown', handleClickOutsideDropdownMenu)

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideDropdownMenu)
        }
    })

    return (
        <div className="relative flex items-center gap-4">
            <button className="w-32 h-10 font-bold bg-blue-300 text-white border border-gray-100 rounded-2xl hover:opacity-80">
                Anunciar
            </button>

            <div onClick={() => setIsOpenDropdownMenu(!isOpenDropdownMenu)} className="flex gap-2 items-center cursor-pointer">
                <h1 className="font-bold text-black-100 truncate">{username}</h1>

                <Image
                    src={picture}
                    alt='Logo'
                    onClick={() => console.log()}
                    height={62}
                    width={62}
                    className="rounded-full"
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
                    <nav ref={dropdownMenuRef} className='absolute top-10 right-0 flex flex-col w-48 bg-white rounded-2xl text-black-300 shadow-xl'>
                        <Link href={'#'} className='pl-7 py-2 hover:opacity-80'>Ver perfil</Link>
                        <Link href={'#'} className='pl-7 py-2 hover:opacity-80'>Favoritos</Link>
                        <Link href={'#'} className='pl-7 py-2 hover:opacity-80'>Notificações</Link>
                        <Link href={'#'} className='pl-7 py-2 hover:opacity-80'>Viagens</Link>
                        
                        <div className="border border-b-gray-100 opacity-30" />
                        
                        <Link href={'#'} className='pl-7 py-2 hover:opacity-80'>Editar Perfil</Link>
                        <button onClick={handleLogout} className='pl-7 py-2 self-start hover:opacity-80 text-red-500'>Sair</button>
                    </nav>
                )
            }
        </div>
    )
};
