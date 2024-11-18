import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Calendar from "../calendar";

import SearchIcon from '../../../public/icons/search_icon.svg';
import CalendarIcon from '../../../public/icons/calendar_icon.svg'
import DestinyIcon from '../../../public/icons/destiny_icon.svg'
import PersonIcon from '../../../public/icons/person_icon.svg'
import PlusIcon from '../../../public/icons/plus_circle_icon.svg'
import MinusIcon from '../../../public/icons/dash_circle_icon.svg'
import Checkbox from "./checkbox";

interface Guests {
    adults: number
    children: number
    babies: number
    pets: number
}

export default function DesktopSearch() {
    const modalGuestsRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLDivElement | null>(null);
    const modalCheckInRef = useRef<HTMLDivElement | null>(null);
    const modalCheckOutRef = useRef<HTMLDivElement | null>(null);

    const [local, setLocal] = useState('')
    const [checkInDate, setCheckInDate] = useState<Date | null>(null)
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)
    const [guests, setGuests] = useState<Guests>({
        adults: 0,
        children: 0,
        babies: 0,
        pets: 0
    })

    const [isOpenInputDestiny, setIsOpenInputDestiny] = useState(false)
    const [isOpenCheckInCalendar, setIsOpenCheckInCalendar] = useState(false)
    const [isOpenCheckOutCalendar, setIsOpenCheckOutCalendar] = useState(false)
    const [isOpenModalGuests, setIsOpenModalGuests] = useState(false)

    const [isCheckedGuests, setIsCheckedGuests] = useState(false)
    const [isCheckedCheckIn, setIsCheckedCheckIn] = useState(false)
    const [isCheckedCheckOut, setIsCheckedCheckOut] = useState(false)

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

        const handleClickOutside = (event: MouseEvent) => {
            if (modalGuestsRef.current && event.target instanceof Node && !modalGuestsRef.current.contains(event.target)) {
                setIsOpenModalGuests(false);
            }
        };

        const handleClickOutsideInput = (event: MouseEvent) => {
            if (inputRef.current && event.target instanceof Node && !inputRef.current.contains(event.target) && !local) {
                setIsOpenInputDestiny(false)
            }
        }

        const handleClickOutsideModalCheckIn = (event: MouseEvent) => {
            if (modalCheckInRef.current && event.target instanceof Node && !modalCheckInRef.current.contains(event.target)) {
                setIsOpenCheckInCalendar(false)
            }
        }

        const handleClickOutsideModalCheckOut = (event: MouseEvent) => {
            if (modalCheckOutRef.current && event.target instanceof Node && !modalCheckOutRef.current.contains(event.target)) {
                setIsOpenCheckOutCalendar(false)
            }
        }

        // Adiciona o event listener ao documento
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('mousedown', handleClickOutsideInput)
        document.addEventListener('mousedown', handleClickOutsideModalCheckIn)
        document.addEventListener('mousedown', handleClickOutsideModalCheckOut)

        // Limpa o event listener quando o componente desmontar
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('mousedown', handleClickOutsideInput)
            document.removeEventListener('mousedown', handleClickOutsideModalCheckIn)
            document.removeEventListener('mousedown', handleClickOutsideModalCheckOut)
        };
    })

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
        <div className="relative flex gap-3 h-14 items-center border-[0.5px] border-gray-300 rounded-3xl bg-transparent">
            <div className='flex divide-x-[1px] divide-blue-300 items-center' >
                <div className="shrink-0 w-[160px]">
                    {
                        isOpenInputDestiny ? (
                            <div ref={inputRef} className='flex flex-col justify-center px-6 gap-1 transition-shadow duration-700'>
                                <button className='flex items-center gap-2 text-black-100  text-[12px]'>
                                    <Image src={DestinyIcon} alt='Ícone de destino' className='size-3' />

                                    Destino
                                </button>

                                <input value={local} onChange={(event) => setLocal(event.target.value)} className=' bg-transparent border-b focus:outline-none text-[12px] placeholder:text-gray-300 ' type="text" placeholder='Informe o local' />
                            </div>
                        ) : (
                            <button onClick={() => setIsOpenInputDestiny(true)} className='flex mx-auto items-center justify-center gap-2 text-black-100 px-6 text-sm'>
                                <Image src={DestinyIcon} alt='Ícone de destino' />

                                Destino
                            </button>
                        )
                    }
                </div>

                <button onClick={() => setIsOpenCheckInCalendar(!isOpenCheckInCalendar)} className='w-[160px] flex items-center justify-center gap-2 text-sm text-black-100 px-6'>
                    <Image src={CalendarIcon} alt='Ícone de destino' />

                    {checkInDate ? checkInDate.toLocaleDateString() : 'Check-in'}
                </button>

                <button onClick={() => setIsOpenCheckOutCalendar(!isOpenCheckOutCalendar)} className='w-[160px] flex items-center justify-center gap-2 text-sm text-black-100 px-6'>
                    <Image src={CalendarIcon} alt='Ícone de destino' />


                    {checkOutDate ? checkOutDate.toLocaleDateString() : 'Check-out'}
                </button>

                <button onClick={() => setIsOpenModalGuests(!isOpenModalGuests)} className='w-[160px] flex items-center justify-center gap-2 text-sm text-black-100 px-6'>
                    <Image src={PersonIcon} alt='Ícone de destino' />

                    Hóspedes
                </button>
            </div>

            <div className='bg-blue-200 p-2 mr-6 rounded-full'>
                <Image
                    src={SearchIcon}
                    alt='Logo'
                    onClick={handleSearch}
                    height={24}
                    width={24}
                    className='cursor-pointer'
                />
            </div>

            {
                isOpenCheckInCalendar && (
                    <div ref={modalCheckInRef} className='absolute top-16 right-64 px-5 py-3 space-y-2 bg-white rounded-2xl drop-shadow'>
                        <Checkbox isChecked={isCheckedCheckIn} setIsChecked={setIsCheckedCheckIn} text="Sem data definida" />

                        <div className={`${isCheckedCheckIn && 'pointer-events-none opacity-60'}`}>
                            <Calendar selectedDate={checkInDate} onChangeDate={setCheckInDate} />
                        </div>
                    </div>
                )
            }

            {
                isOpenCheckOutCalendar && (
                    <div ref={modalCheckOutRef} className='absolute top-16 right-32 px-5 py-3 space-y-2 bg-white rounded-2xl drop-shadow'>
                        <Checkbox isChecked={isCheckedCheckOut} setIsChecked={setIsCheckedCheckOut} text="Sem data definida" />

                        <div className={`${isCheckedCheckOut && 'pointer-events-none opacity-60'}`}>
                            <Calendar minimumDateToSelect={checkInDate} selectedDate={checkOutDate} onChangeDate={setCheckOutDate} />
                        </div>
                    </div>
                )
            }

            {
                isOpenModalGuests && (
                    <div ref={modalGuestsRef} className='absolute top-16 right-0 px-5 py-3 space-y-2 bg-white rounded-2xl drop-shadow'>
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
                )
            }
        </div>
    )
};
