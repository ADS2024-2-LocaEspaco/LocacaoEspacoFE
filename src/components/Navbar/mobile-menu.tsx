import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Logo from '../../../public/icons/logo.svg';
import MenuHamburgerIcon from '../../../public/icons/menu_icon.svg';
import SearchIcon from '../../../public/icons/search_icon.svg';

import MobileLateralMenu from "./mobile-lateral-menu";
import MobileModalSearch from "./mobile-modal-search";

export default function MobileMenu() {
    const router = useRouter()

    const [isOpenLateralMenu, setIsOpenLateralMenu] = useState(false)
    const [isOpenSearch, setIsOpenSearch] = useState(false)

    const handleBackToHomePage = () => {
        router.push('/')
    }

    const closeLateralmenu = () => {
        setIsOpenLateralMenu(false)
    }

    const closeModalSearch = () => {
        setIsOpenSearch(false)
    }

    return (
        <nav className='flex relative w-full px-6 py-2 justify-between items-center min-[1400px]:hidden border-b border-gray-300'>
            <Image
                src={MenuHamburgerIcon}
                alt='Ícone do menu'
                onClick={() => setIsOpenLateralMenu(true)}
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

            {
                isOpenLateralMenu && (
                    <MobileLateralMenu closeLateralmenu={closeLateralmenu} />
                )
            }

            {
                isOpenSearch && (
                    <MobileModalSearch closeModalSearch={closeModalSearch} />
                )
            }
        </nav>
    )
}