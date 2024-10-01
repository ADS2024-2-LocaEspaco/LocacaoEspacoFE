import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Logo from '../../../public/icons/logo.svg';
import CloseIcon from '../../../public/icons/x.svg';
import DestinyIcon from '../../../public/icons/destiny_icon.svg'
import PlusIcon from '../../../public/icons/plus_circle_icon.svg'
import MinusIcon from '../../../public/icons/dash_circle_icon.svg';
import CalendarIcon from '../../../public/icons/calendar_icon.svg';

interface MobileModalSearchProps {
    closeModalSearch: () => void
}

export default function MobileModalSearch({ closeModalSearch }: MobileModalSearchProps) {
    const router = useRouter()

    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        babies: 0,
        pets: 0
    })

    const handleBackToHomePage = () => {
        router.push('/')
    }

    const handleSearch = () => {
        console.log('Hello')
    }

    return (
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
                    onClick={closeModalSearch}
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
                        <Image onClick={() => guests.adults > 0 && setGuests({ ...guests, adults: guests.adults - 1 })} src={MinusIcon} alt='Ícone de menos' />
                        {guests.adults}
                        <Image onClick={() => setGuests({ ...guests, adults: guests.adults + 1 })} src={PlusIcon} alt='Ícone de mais' />
                    </div>
                </div>

                <div className='flex py-3 justify-between gap-4 border-y-[0.5px] border-gray-200'>
                    Crianças

                    <div className='flex gap-1'>
                        <Image onClick={() => guests.children > 0 && setGuests({ ...guests, children: guests.children - 1 })} src={MinusIcon} alt='Ícone de menos' />
                        {guests.children}
                        <Image onClick={() => setGuests({ ...guests, children: guests.children + 1 })} src={PlusIcon} alt='Ícone de mais' />
                    </div>
                </div>

                <div className='flex py-3 justify-between gap-4 border-b-[0.5px] border-gray-200'>
                    Bebês

                    <div className='flex gap-1'>
                        <Image onClick={() => guests.babies > 0 && setGuests({ ...guests, babies: guests.babies - 1 })} src={MinusIcon} alt='Ícone de menos' />
                        {guests.babies}
                        <Image onClick={() => setGuests({ ...guests, babies: guests.babies + 1 })} src={PlusIcon} alt='Ícone de mais' />
                    </div>
                </div>

                <div className='flex py-3 justify-between gap-4'>
                    Animais de estimação

                    <div className='flex gap-1'>
                        <Image onClick={() => guests.pets > 0 && setGuests({ ...guests, pets: guests.pets - 1 })} src={MinusIcon} alt='Ícone de menos' />
                        {guests.pets}
                        <Image onClick={() => setGuests({ ...guests, pets: guests.pets + 1 })} src={PlusIcon} alt='Ícone de mais' />
                    </div>
                </div>
            </div>

            <button onClick={handleSearch} className="mx-auto bg-blue-300 text-white font-bold hover:opacity-90 px-8 py-2 rounded-2xl">Pesquisar</button>
        </div>
    )
};
