import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';


import Logo from '../../public/icons/logo.svg';
import MenuHamburgerIcon from '../../public/icons/menu_icon.svg';
import AccountIcon from '../../public/icons/account_circle_icon.svg';
import SearchIcon from '../../public/icons/search_icon.svg';
import CalendarIcon from '../../public/icons/calendar_icon.svg'
import DestinyIcon from '../../public/icons/destiny_icon.svg'
import PersonIcon from '../../public/icons/person_icon.svg'
import PlusIcon from '../../public/icons/plus_circle_icon.svg'
import MinusIcon from '../../public/icons/dash_circle_icon.svg'

import Calendar from './calendar';
import { useSession } from '@/lib/session/cookie';
import { useUserStore } from '@/lib/store/userStore';

interface MobileMenuProps {
	openMobileMenu: () => void;
	handleBackToHomePage: () => void;
}

interface MobileMenuNavbarProps {
	closeMobileMenu: () => void;
}

interface MenuProps {
	handleBackToHomePage: () => void;
	handleSearch: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>) => void;
	setSearchInput: Dispatch<SetStateAction<string>>;
	loginWithGoogle: () => void
}

function MobileMenu({ openMobileMenu, handleBackToHomePage }: MobileMenuProps) {
	return (
		<nav className='flex relative w-full h-24 px-6 justify-between items-center md:hidden'>
			<Image
				src={MenuHamburgerIcon}
				alt='Ícone do menu'
				onClick={openMobileMenu}
				height={24}
				width={36}
				className='cursor-pointer'
			/>

			<Image
				src={Logo}
				alt='Logo'
				onClick={handleBackToHomePage}
				height={60}
				width={60}
				className='cursor-pointer'
			/>

			<Image
				src={SearchIcon}
				alt='Botão de pesquisa'
				height={24}
				width={24}
				className='cursor-pointer'
			/>
		</nav>
	);
}

function MobileMenuNavbar({ closeMobileMenu }: MobileMenuNavbarProps) {
	const user = ''; // Aqui você pode verificar o estado de autenticação

	return (
		<div className='flex absolute h-screen w-screen md:hidden'>
			<div className='flex-1 bg-white'>
				<div className='flex h-24 items-center px-6 border-b border-[#797986]'>
					<Image
						src={user ? Logo : AccountIcon}
						alt='Logo'
						height={60}
						width={60}
						className='rounded-full'
					/>
				</div>

				{user ? (
					<nav className='flex flex-col'>
						<Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Ver perfil</Link>
						<Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Notificações</Link>
						<Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Editar Perfil</Link>
						<Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Viagens</Link>
						<Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Favoritos</Link>
						<Link href={'#'} className='pl-7 py-4 hover:opacity-80 text-red-500'>Sair</Link>
					</nav>
				) : (
					<nav className='flex flex-col'>
						<Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Home</Link>
						<Link href={'#'} className='pl-7 py-4 hover:opacity-80'>Sobre</Link>
					</nav>
				)}
			</div>

			<div className='w-[40%] bg-white opacity-35 cursor-pointer' onClick={closeMobileMenu} />
		</div>
	);
}

function Menu({ handleBackToHomePage, handleSearch, setSearchInput, loginWithGoogle }: MenuProps) {
	const router = useRouter();
	const exit = useUserStore((state) => state.exit)
	const session = useSession()
	const [isOpenInputDestiny, setIsOpenInputDestiny] = useState(false)
	const [isOpenModalGuests, setIsOpenModalGuests] = useState(false)

	const [local, setLocal] = useState('')


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

	return (
		<nav className="flex font-body w-full px-20 py-3 gap-24 justify-between items-center max-md:hidden">
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
							<div className='flex flex-col justify-start px-6 gap-1'>
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
							<div className='absolute px-5 bg-white rounded-2xl drop-shadow'>
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

			<div className="flex gap-4">
				<button
					className="w-32 h-10 font-bold bg-white text-blue-300 border border-gray-100 rounded-2xl hover:text-white hover:bg-blue-300 transition duration-500"
					onClick={() => {
						// session.deleteSession()
						router.push('/')
					}}
				>
					Anunciar
				</button>

				<button
					className="w-32 h-10 font-bold bg-orange-300 text-white rounded-2xl hover:opacity-80"
					onClick={loginWithGoogle}
				>
					Entrar
				</button>
			</div>
		</nav>
	);
}

export default function Navbar() {
	const router = useRouter();
	// const session = useSession()
	const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
	const [searchInput, setSearchInput] = useState<string>('');
	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const [endDate, setEndDate] = useState<Date | null>(new Date());

	// console.log(Cookies.get('user'))

	const handleDateChange = (start: Date, end: Date) => {
		setStartDate(start);
		setEndDate(end);
	};

	const handleBackToHomePage = () => {
		router.push('/');
	};

	const openMobileMenu = () => {
		setIsOpenMobileMenu(true);
	};

	const closeMobileMenu = () => {
		setIsOpenMobileMenu(false);
	};

	const handleSearch = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLImageElement>) => {
		e.preventDefault();

		if (searchInput) {
			console.log(`/search/${searchInput}`);
			// router.push(`/search/${searchInput}`); // Descomente esta linha para fazer o redirecionamento
		}
	};

	const loginWithGoogle = () => {
		const user = {
			email: 'user@example.com',
			firstName: 'Lucas',
			lastName: 'Silva',
			picture: 'https://example.com/profile.jpg',
			accessToken: 'abcd1234token',
		  }
	  
		// session.createSession(user)
	}

	return (
		<>
			<MobileMenu openMobileMenu={openMobileMenu} handleBackToHomePage={handleBackToHomePage}  />

			<Menu handleBackToHomePage={handleBackToHomePage} handleSearch={handleSearch} setSearchInput={setSearchInput} loginWithGoogle={loginWithGoogle} />

			{isOpenMobileMenu && (
				<MobileMenuNavbar closeMobileMenu={closeMobileMenu} />
			)}

			{/* <Calendar onDateChange={handleDateChange} valorDiaria={100} /> */}
		</>
	);
}
