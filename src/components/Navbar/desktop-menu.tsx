import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import Logo from '../../../public/icons/logo.svg';
import SearchIcon from '../../../public/icons/search_icon.svg';
import CalendarIcon from '../../../public/icons/calendar_icon.svg'
import DestinyIcon from '../../../public/icons/destiny_icon.svg'
import PersonIcon from '../../../public/icons/person_icon.svg'
import PlusIcon from '../../../public/icons/plus_circle_icon.svg'
import MinusIcon from '../../../public/icons/dash_circle_icon.svg'

interface DesktopMenuProps {
	handleSearch: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>) => void;
	setSearchInput: Dispatch<SetStateAction<string>>;
}

export default function DesktopMenu({ handleSearch, setSearchInput }: DesktopMenuProps) {
	const user = ''
	const router = useRouter();

	const modalRef = useRef(null);
	const inputRef = useRef(null);

	const [local, setLocal] = useState(null)
	const [isOpenInputDestiny, setIsOpenInputDestiny] = useState(false)
	const [isOpenCheckInCalendar, setIsOpenCheckInCalendar] = useState(false)
	const [isOpenCheckOutCalendar, setIsOpenCheckOutCalendar] = useState(false)
	const [isOpenModalGuests, setIsOpenModalGuests] = useState(false)


	const [searchBar, setSearchBar] = useState({
		adults: 0,
		children: 0,
		babies: 0,
		pets: 0
	})

	// Redirecionar para a página de anunciar
	const handleAnnounceClick = () => {
		router.push('/anunciar');
	};

	const handleBackToHomePage = () => {
		router.push('/');
	}


	useEffect(() => {

		// Função que verifica se o clique foi fora do modal
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				setIsOpenModalGuests(false); // Fecha o modal
			}
		};

		const handleClickOutsideInput = (event: MouseEvent) => {
			if (inputRef.current && !inputRef.current.contains(event.target)) {
				setIsOpenInputDestiny(false)
			}
		}

		// Adiciona o event listener ao documento
		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('mousedown', handleClickOutsideInput)

		// Limpa o event listener quando o componente desmontar
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('mousedown', handleClickOutsideInput)
		};
	}, [])

	return (
		<nav className="flex font-body w-full px-16 py-3 gap-2	4 justify-between items-center max-md:hidden">
			<Image
				src={Logo}
				alt='Logo'
				onClick={handleBackToHomePage}
				height={72}
				width={72}
				className='cursor-pointer'
			/>

			<div className="flex gap-3 py-2 items-center border-[0.5px] border-gray-300 rounded-3xl">
				<div className='flex relative'>
					{
						isOpenInputDestiny ? (
							<div ref={inputRef} className='flex flex-col justify-start px-6 gap-1'>
								<button className='flex items-center gap-2 text-black-100  text-[12px]'>
									<Image src={DestinyIcon} alt='Ícone de destino' className='size-3' />

									Destino
								</button>

								<input onChange={(event) => setLocal(event.target.value)} className='flex-1 bg-transparent border-b focus:outline-none text-[12px] placeholder:text-gray-300 ' type="text" placeholder='Informe o local' />
							</div>
						) : (
							<button onClick={() => setIsOpenInputDestiny(true)} className='flex items-center gap-2 text-black-100 px-6 text-sm'>
								<Image src={DestinyIcon} alt='Ícone de destino' />

								Destino
							</button>
						)
					}

					<button className='flex items-center border-x border-blue-300  gap-2 text-sm text-black-100 px-6'>
						<Image src={CalendarIcon} alt='Ícone de destino' />

						Check-in
					</button>

					<button className='flex items-center border-r border-blue-300 gap-2 text-sm text-black-100 px-6'>
						<Image src={CalendarIcon} alt='Ícone de destino' />

						Check-out
					</button>

					<button onClick={() => setIsOpenModalGuests(true)} className='flex items-center gap-2 text-black-100 px-6 text-sm'>
						<Image src={PersonIcon} alt='Ícone de destino' />

						Hóspedes
					</button>

					{/* modal hospedes */}
					{
						isOpenModalGuests && (
							<div ref={modalRef} className='absolute top-11 right-[-15%] px-5 bg-white rounded-2xl drop-shadow'>
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
					<div className="flex gap-4">
						<button>Anunciar</button>
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