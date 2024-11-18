import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Logo from '../../../public/icons/logo.svg';
import CloseIcon from '../../../public/icons/x.svg';
import PlusIcon from '../../../public/icons/plus_circle_icon.svg'
import MinusIcon from '../../../public/icons/dash_circle_icon.svg';
import CalendarIcon from '../../../public/icons/calendar_icon.svg';
import Calendar from "../calendar";
import Checkbox from "./checkbox";

interface MobileModalSearchProps {
    closeModalSearch: () => void
}

interface Guests {
    adults: number
    children: number
    babies: number
    pets: number
}

export default function MobileModalSearch({ closeModalSearch }: MobileModalSearchProps) {
    const router = useRouter()

    const [local, setLocal] = useState('')
    const [checkInDate, setCheckInDate] = useState<Date | null>(null)
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)
    const [guests, setGuests] = useState<Guests>({
        adults: 0,
        children: 0,
        babies: 0,
        pets: 0
    })

    const [isOpenCheckInCalendar, setIsOpenCheckInCalendar] = useState(false)
    const [isOpenCheckOutCalendar, setIsOpenCheckOutCalendar] = useState(false)

    const [isCheckedGuests, setIsCheckedGuests] = useState(false)
    const [isCheckedCheckIn, setIsCheckedCheckIn] = useState(false)
    const [isCheckedCheckOut, setIsCheckedCheckOut] = useState(false)

    const handleBackToHomePage = () => {
        router.push('/')
    }

    const updateGuests = (type: keyof Guests, value: number) => {
        setGuests(prev => ({
            ...prev,
            [type]: Math.max(0, prev[type] + value)
        }));
    };

    const handleSearch = () => {
        if (local) {
            if (checkOutDate && checkInDate) {
                setCheckOutDate(checkOutDate <= checkInDate ? null : checkOutDate)
            }

            console.log(local, checkInDate, checkOutDate, guests)
        } else {
            alert('Insira um Destino!')
        }
    }

    useEffect(() => {
        if (checkInDate && checkOutDate && (checkOutDate <= checkInDate)) {
            setCheckOutDate(null)
        }
    }, [checkInDate, checkOutDate])

    useEffect(() => {
        if (isCheckedCheckIn) {
            setCheckInDate(null)
        }

        if (isCheckedCheckOut) {
            setCheckOutDate(null)
        }

        if (isCheckedGuests) {
            setGuests({
                adults: 0,
                children: 0,
                babies: 0,
                pets: 0
            })
        }
    }, [isCheckedCheckIn, isCheckedCheckOut, isCheckedGuests])

    return (
        <div className='fixed inset-0 overflow-hidden flex flex-col jus bg-white h-screen w-full min-[1300px]:hidden py-2 px-4 gap-6'>
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
                    onClick={closeModalSearch}
                    height={16}
                    width={16}
                    className='cursor-pointer'
                />
            </div>

            <div className="flex flex-col mx-auto gap-px max-w-[600px] w-full ">
                <label htmlFor="destiny">Destino: </label>

                <input onChange={(event) => setLocal(event.target.value)} type="text" id="destiny" className='flex-1 bg-transparent border-b focus:outline-none text-[12px] placeholder:text-gray-300' placeholder="Informe o local" />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => setIsOpenCheckInCalendar(true)} className='flex justify-center items-center text-sm border rounded-md text-black-100 w-40 py-2 gap-2 hover:bg-gray-100'>
                    <Image src={CalendarIcon} alt='Ícone de destino' />

                    {checkInDate ? checkInDate.toLocaleDateString() : 'Check-in'}
                </button>

                <button onClick={() => setIsOpenCheckOutCalendar(true)} className='flex justify-center items-center text-sm border rounded-md text-black-100 w-40 py-2 gap-2 hover:bg-gray-100'>
                    <Image src={CalendarIcon} alt='Ícone de destino' />

                    {checkOutDate ? checkOutDate.toLocaleDateString() : 'Check-out'}
                </button>
            </div>

            <div className='mx-auto px-5 pt-3 bg-white rounded-2xl max-w-96 w-full drop-shadow'>
                <Checkbox isChecked={isCheckedGuests} setIsChecked={setIsCheckedGuests} text="Sem número de hóspedes definido" />

                <div className={`divide-y-[0.5px] ${isCheckedGuests && 'pointer-events-none opacity-60'}`}>
                    <div className='flex py-3 justify-between gap-4'>
                        Adultos

                        <div className='flex gap-1'>
                            <Image onClick={() => updateGuests('adults', -1)} src={MinusIcon} alt='Ícone de menos' />
                            {guests.adults}
                            <Image onClick={() => updateGuests('adults', 1)} src={PlusIcon} alt='Ícone de mais' />
                        </div>
                    </div>

                    <div className='flex py-3 justify-between gap-4'>
                        Crianças

                        <div className='flex gap-1'>
                            <Image onClick={() => updateGuests('children', -1)} src={MinusIcon} alt='Ícone de menos' />
                            {guests.children}
                            <Image onClick={() => updateGuests('children', 1)} src={PlusIcon} alt='Ícone de mais' />
                        </div>
                    </div>

                    <div className='flex py-3 justify-between gap-4'>
                        Bebês

                        <div className='flex gap-1'>
                            <Image onClick={() => updateGuests('babies', -1)} src={MinusIcon} alt='Ícone de menos' />
                            {guests.babies}
                            <Image onClick={() => updateGuests('babies', 1)} src={PlusIcon} alt='Ícone de mais' />
                        </div>
                    </div>

                    <div className='flex py-3 justify-between gap-4'>
                        Animais de estimação

                        <div className='flex gap-1'>
                            <Image onClick={() => updateGuests('pets', -1)} src={MinusIcon} alt='Ícone de menos' />
                            {guests.pets}
                            <Image onClick={() => updateGuests('pets', 1)} src={PlusIcon} alt='Ícone de mais' />
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={handleSearch} className="mx-auto bg-blue-300 text-white font-bold hover:opacity-90 px-8 py-2 rounded-2xl">Pesquisar</button>

            {
                isOpenCheckInCalendar && (
                    <div className="fixed inset-0 h-screen w-screen flex flex-col items-center justify-center bg-white bg-opacity-90">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h1>Check-In</h1>

                                <Image
                                    src={CloseIcon}
                                    alt='Logo'
                                    onClick={() => setIsOpenCheckInCalendar(false)}
                                    height={16}
                                    width={16}
                                    className='cursor-pointer'
                                />
                            </div>

                            <Checkbox isChecked={isCheckedCheckIn} setIsChecked={setIsCheckedCheckIn} text="Sem data definida" />

                            <div className={`${isCheckedCheckIn && 'pointer-events-none opacity-60'}`}>
                                <Calendar selectedDate={checkInDate} onChangeDate={setCheckInDate} />
                            </div>
                        </div>
                    </div>
                )
            }

            {
                isOpenCheckOutCalendar && (

                    <div className="fixed inset-0 h-screen w-screen flex flex-col items-center justify-center bg-white bg-opacity-90">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <h1>Check-Out</h1>

                                <Image
                                    src={CloseIcon}
                                    alt='Logo'
                                    onClick={() => setIsOpenCheckOutCalendar(false)}
                                    height={16}
                                    width={16}
                                    className='cursor-pointer'
                                />
                            </div>

                            <Checkbox isChecked={isCheckedCheckOut} setIsChecked={setIsCheckedCheckOut} text="Sem data definida" />

                            <div className={`${isCheckedCheckOut && 'pointer-events-none opacity-60'}`}>
                                <Calendar minimumDateToSelect={checkInDate} selectedDate={checkOutDate} onChangeDate={setCheckOutDate} />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
};