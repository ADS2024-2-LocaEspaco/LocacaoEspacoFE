import { Josefin_Sans, Open_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-title",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function Home() {
  return (
    <main
      className={`flex flex-col min-h-screen ${josefin.variable} ${openSans.variable}`}
    >
      <h1 className="font-title text-5xl font-bold">Teste</h1>
      <div className="font-body">
        <h2 className="font-title">Teste</h2>
        <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur commodi minima sunt quos vero cupiditate omnis distinctio sapiente, dolores nisi dignissimos architecto inventore est deleniti? Officiis eum cupiditate explicabo corporis.</p>

      </div>
    </main>
  );
}
