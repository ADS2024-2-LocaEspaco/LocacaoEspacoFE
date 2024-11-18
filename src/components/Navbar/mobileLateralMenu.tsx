import Image from "next/image"
import Link from "next/link"

import Logo from '../../../public/icons/logo.svg';
import { useUserStore } from "@/lib/store/userStore";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import ModalLogin from "../ModalLogin";
import { useState } from "react";

interface MobileLateralMenuProps {
    closeLateralmenu: () => void
}

export default function MobileLateralMenu({ closeLateralmenu }: MobileLateralMenuProps) {
    const user = useUserStore((state) => state.user)
    const session = useSession()
    const router = useRouter()
    
    const [isOpenModalLogin, setIsOpenModalLogin] = useState(false)

    const handleLogout = () => {
        session.deleteSession()
        router.push('/')
    }

    const openModalLogin = () => {
		setIsOpenModalLogin(true)
	}
    
    return (
        <div className='fixed inset-0 flex font-sans h-screen w-screen min-[1300px]:hidden'>
            <div className='flex-1 bg-white'>
                <div className='flex gap-7 py-2 items-center px-4 border-b border-gray-300'>
                    <Image
                        src={user ? user.picture : Logo}
                        alt='Logo'
                        height={52}
                        width={48}
                        className='rounded-full'
                    />

                    {
                        !user && (
                            <button onClick={openModalLogin} className="font-bold text-sm text-gray-400">
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
                            <button onClick={handleLogout} className='pl-4 py-2 self-start hover:opacity-80 text-red-500'>Sair</button>
                        </nav>
                    ) : (
                        <nav className='flex flex-col text-black-100'>
                            <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Home</Link>
                            <Link href={'#'} className='pl-4 py-2 hover:opacity-80'>Sobre</Link>
                        </nav>
                    )
                }
            </div>

            <div className='w-[40%] bg-white opacity-35 cursor-pointer' onClick={closeLateralmenu} />

            { 
				isOpenModalLogin && (
					<ModalLogin closeModal={() => setIsOpenModalLogin(false)} />
				)
			}
        </div>
    )
};
