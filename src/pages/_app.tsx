import "@/styles/globals.css";
import { josefin, openSans } from "@/styles/fonts";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${josefin.variable} ${openSans.variable} font-body`}>
      <Component {...pageProps} />
    </div>
  )
}
