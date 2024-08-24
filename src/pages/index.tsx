import Image from "next/image";
import { Josefin_Sans } from "next/font/google";
import Navbar from "@/components/navbar";

const inter = Josefin_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex h-screen flex-col items-center ${inter.className}`}
    >
        <Navbar />
    </main>
  );
}
