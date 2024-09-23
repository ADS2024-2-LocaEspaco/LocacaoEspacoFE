import { useUserStore } from "@/lib/store/userStore";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Josefin_Sans, Open_Sans } from "next/font/google";
import { useEffect } from "react";

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

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  return (
    <div className={`${josefin.variable} ${openSans.variable} bg-white text-black-100`}>
      <Component {...pageProps} />;
    </div>
  )
} 