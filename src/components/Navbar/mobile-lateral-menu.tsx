import Image from "next/image"
import Link from "next/link"

import Logo from '../../../public/icons/logo.svg';

interface MobileLateralMenuProps {
    closeLateralmenu: () => void
}

export default function MobileLateralMenu({ closeLateralmenu }: MobileLateralMenuProps) {
    const user = ''

    return (
        <div className='fixed inset-0 flex font-sans h-screen w-screen min-[1300px]:hidden'>
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

            <div className='w-[40%] bg-white opacity-35 cursor-pointer' onClick={closeLateralmenu} />
        </div>
    )
};
