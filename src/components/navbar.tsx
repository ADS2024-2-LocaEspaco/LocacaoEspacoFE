import Logo from '@/assets/logo.svg'
import Image from 'next/image'

export default function Navbar() {
    return (
        <nav className="flex w-full px-20 py-8 gap-24 justify-between items-center">
            <Image src={Logo} alt='Logo' height={92} width={92} />
            <form className="max-w-[640px] w-full h-12 flex gap-3 justify-between border items-center border-[#797986] px-7 py-2 rounded-2xl">
                <input className="flex-1 bg-transparent focus:outline-none"></input>

                <div className="material-symbols-outlined text-3xl cursor-pointer font-thin">search</div>
            </form>

            <div>
                <button>Anunciar</button>
                <button>Entrar</button>
            </div>
        </nav>
    )
}