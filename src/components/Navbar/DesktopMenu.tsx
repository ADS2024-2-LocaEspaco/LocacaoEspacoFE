import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Logo from '../../../public/icons/logo.svg';

import DesktopMenuButtons from "./desktop-menu-buttons";
import DesktopSearch from "./desktop-search";

import { useUserStore } from "@/lib/store/userStore";
import { UserApi } from "@/api/user/userApi";

export default function DesktopMenu() {
	const userAPI = UserApi()
	const user = useUserStore((state) => state.user)
	const router = useRouter();

	const handleAnnounceClick = () => {
		router.push('/anunciar');
	};

	const handleBackToHomePage = () => {
		router.push('/');
	}

	const loginWithGoogle = () => {
		userAPI.loginWithGoogle();
	}

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');

		if (token) {
			userAPI.getUserData(token);
		}
	}, []);

	return (
		<nav className="flex font-body w-full px-12 py-3 gap-2 justify-between items-center max-[1400px]:hidden">
			<Image
				src={Logo}
				alt='Logo'
				onClick={handleBackToHomePage}
				height={72}
				width={72}
				className='cursor-pointer'
			/>

			<DesktopSearch />

			{
				user ? (
					<DesktopMenuButtons username={`${user.fullName}`} picture={user.picture} />
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
							onClick={loginWithGoogle}
						>
							Entrar
						</button>
					</div>
				)
			}
		</nav >
	);
}