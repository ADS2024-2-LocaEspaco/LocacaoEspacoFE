import { UserApi } from "@/api/user/userApi";
import Loading from "@/components/Loading";
import { useUserStore } from "@/lib/store/userStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Josefin_Sans, Open_Sans } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const josefin = Josefin_Sans({
	subsets: ["latin"],
	variable: "--font-title",
});

const openSans = Open_Sans({
	subsets: ["latin"],
	variable: "--font-body",
});

export default function App({ Component, pageProps }: AppProps) {
	const initializeUser = useUserStore((state) => state.initializeUser)
	const router = useRouter()
	const userAPI = UserApi()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		initializeUser()
	}, [initializeUser])

	useEffect(() => {
		const authWithApi = async (token: string) => {
			console.log('auth...')
			try {
				await new Promise(resolve => setTimeout(resolve, 30000));
				userAPI.getUserData(token, router.pathname);
			} catch (error) {
				console.error('Error fetching data: ', error)
				router.push('/')
			}

		}

		const { token } = router.query

		if (typeof token === 'string') {
			setIsLoading(true)
			authWithApi(token).finally(() => {
				setIsLoading(false)
			});
		}

	}, [router.query.token]);

	if (isLoading) {
		return (
			<Loading />
		)
	}

	return (
		<div className={`${josefin.variable} ${openSans.variable} bg-white text-black-100`}>
			<Component {...pageProps} />;
		</div>
	)
} 