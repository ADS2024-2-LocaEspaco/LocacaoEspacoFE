import { Josefin_Sans, Open_Sans } from "next/font/google";

export const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-title",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});