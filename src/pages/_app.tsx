import "@/styles/globals.css";
import { ReservaProvider } from "../hooks/ReservaContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReservaProvider>

      <Component {...pageProps} />
    </ReservaProvider>

  )
}
