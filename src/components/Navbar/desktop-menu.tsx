import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Calendar from "../calendar";

import Logo from '../../../public/icons/logo.svg';
import UserImage from '../../assets/user.png'

import SearchIcon from '../../../public/icons/search_icon.svg';
import CalendarIcon from '../../../public/icons/calendar_icon.svg'
import DestinyIcon from '../../../public/icons/destiny_icon.svg'
import PersonIcon from '../../../public/icons/person_icon.svg'
import PlusIcon from '../../../public/icons/plus_circle_icon.svg'
import MinusIcon from '../../../public/icons/dash_circle_icon.svg'
import ArrowDropDownIcon from '../../../public/icons/arrow_drop_down.svg'
import Link from "next/link";

interface DesktopMenuProps {
	handleSearch: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>) => void;
}

export default function DesktopMenu({ handleSearch }: DesktopMenuProps) {
	const user = 'Lucas'
	const router = useRouter();

	const modalGuestsRef = useRef<HTMLElement | null>(null);
	const inputRef = useRef<HTMLElement | null>(null);
	const modalCheckInRef = useRef<HTMLElement | null>(null);
	const modalCheckOutRef = useRef<HTMLElement | null>(null);
	const dropdownMenuRef = useRef<HTMLElement | null>(null);

	const [local, setLocal] = useState('')
	const [isOpenInputDestiny, setIsOpenInputDestiny] = useState(false)
	const [isOpenCheckInCalendar, setIsOpenCheckInCalendar] = useState(false)
	const [isOpenCheckOutCalendar, setIsOpenCheckOutCalendar] = useState(false)
	const [isOpenModalGuests, setIsOpenModalGuests] = useState(false)
	const [isOpenDropdownMenu, setIsOpenDropdownMenu] = useState(false)

	const [searchBar, setSearchBar] = useState({
		adults: 0,
		children: 0,
		babies: 0,
		pets: 0
	})

	const handleAnnounceClick = () => {
		router.push('/anunciar');
	};

	const handleBackToHomePage = () => {
		router.push('/');
	}

	useEffect(() => {

		const handleClickOutside = (event: MouseEvent) => {
			if (modalGuestsRef.current && event.target instanceof Node && !modalGuestsRef.current.contains(event.target)) {
				setIsOpenModalGuests(false);
			}
		};

		const handleClickOutsideInput = (event: MouseEvent) => {
			if (inputRef.current && event.target instanceof Node && !inputRef.current.contains(event.target) && local) {
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

		const handleClickOutsideDropdownMenu = (event: MouseEvent) => {
			if (dropdownMenuRef.current && event.target instanceof Node && !dropdownMenuRef.current.contains(event.target)) {
				setIsOpenDropdownMenu(false)
			}
		}

		// Adiciona o event listener ao documento
		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('mousedown', handleClickOutsideInput)
		document.addEventListener('mousedown', handleClickOutsideModalCheckIn)
		document.addEventListener('mousedown', handleClickOutsideModalCheckOut)
		document.addEventListener('mousedown', handleClickOutsideDropdownMenu)

		// Limpa o event listener quando o componente desmontar
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('mousedown', handleClickOutsideInput)
			document.removeEventListener('mousedown', handleClickOutsideModalCheckIn)
			document.removeEventListener('mousedown', handleClickOutsideModalCheckOut)
			document.removeEventListener('mousedown', handleClickOutsideDropdownMenu)
		};
	})

	return (
		<nav className="flex font-body w-full px-12 py-3 gap-2 justify-between items-center max-[1150px]:hidden">
			<Image
				src={Logo}
				alt='Logo'
				onClick={handleBackToHomePage}
				height={72}
				width={72}
				className='cursor-pointer'
			/>

			<div className="flex gap-3 h-14  items-center border-[0.5px] border-gray-300 rounded-3xl">
				<div className='flex relative'>
					<div className="shrink-0">
						{
							isOpenInputDestiny ? (
								<div ref={inputRef} className='flex flex-col justify-start px-6 gap-1'>
									<button className='flex items-center gap-2 text-black-100  text-[12px]'>
										<Image src={DestinyIcon} alt='Ícone de destino' className='size-3' />

										Destino
									</button>

									<input value={local} onChange={(event) => setLocal(event.target.value)} className=' bg-transparent border-b focus:outline-none text-[12px] placeholder:text-gray-300 ' type="text" placeholder='Informe o local' />
								</div>
							) : (
								<button onClick={() => setIsOpenInputDestiny(true)} className='flex items-center gap-2 text-black-100 px-6 text-sm'>
									<Image src={DestinyIcon} alt='Ícone de destino' />

									Destino
								</button>
							)
						}
					</div>

					<button onClick={() => setIsOpenCheckInCalendar(!isOpenCheckInCalendar)} className='flex items-center border-x border-blue-300  gap-2 text-sm text-black-100 px-6'>
						<Image src={CalendarIcon} alt='Ícone de destino' />

						Check-in
					</button>

					<button onClick={() => setIsOpenCheckOutCalendar(!isOpenCheckOutCalendar)} className='flex items-center border-r border-blue-300 gap-2 text-sm text-black-100 px-6'>
						<Image src={CalendarIcon} alt='Ícone de destino' />

						Check-out
					</button>

					<button onClick={() => setIsOpenModalGuests(!isOpenModalGuests)} className='flex items-center gap-2 text-black-100 px-6 text-sm'>
						<Image src={PersonIcon} alt='Ícone de destino' />

						Hóspedes
					</button>

					{
						isOpenCheckInCalendar && (
							<div ref={modalCheckInRef} className='absolute top-11 right-[35%] bg-white rounded-2xl drop-shadow'>
								<Calendar selectedDate={new Date()} />
							</div>
						)
					}

					{
						isOpenCheckOutCalendar && (
							<div ref={modalCheckOutRef} className='absolute top-11 right-[10%] bg-white rounded-2xl drop-shadow'>
								<Calendar selectedDate={new Date()} />
							</div>
						)
					}

					{
						isOpenModalGuests && (
							<div ref={modalGuestsRef} className='absolute top-11 right-[-15%] px-5 bg-white rounded-2xl drop-shadow'>
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
						)
					}
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
			</div>

			{
				user ? (
					<div className="relative flex gap-4">
						<button className="w-32 h-10 font-bold bg-blue-300 text-white border border-gray-100 rounded-2xl hover:opacity-80">
							Anunciar
						</button>

						<div onClick={() => setIsOpenDropdownMenu(true)} className="flex gap-2 items-center cursor-pointer">
							<h1 className="font-bold text-black-100">{user}</h1>

							<Image
								src={UserImage}
								alt='Logo'
								onClick={handleSearch}
								height={40}
								width={40}
							/>

							<Image
								src={ArrowDropDownIcon}
								alt='Logo'
								onClick={handleSearch}
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
									<Link href={'#'} className='pl-7 py-2 hover:opacity-80 text-red-500'>Sair</Link>
								</nav>
							)
						}
					</div>
				) : (
					<div className="flex gap-4">
						<button
							className="w-32 h-10 font-bold bg-white text-blue-300 border border-gray-100 rounded-2xl hover:text-white hover:bg-blue-300 transition duration-500"
							onClick={handleAnnounceClick}
						>
							Anunciar
						</button>

						<button
							className="w-32 h-10 font-bold bg-orange-300 text-white rounded-2xl hover:opacity-80"
							onClick={() => router.push('/login')}
						>
							Entrar
						</button>
					</div>
				)
			}
		</nav >
	);
}