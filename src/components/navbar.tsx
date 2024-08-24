export default function Navbar() {
    return (
        <nav className="flex w-full py-8 justify-center">
            <form className="w-96 flex gap-3 justify-between border items-center border-[#797986] px-7 py-2 rounded-2xl">
                <input className="bg-transparent focus:outline-none flex-1"></input>

                <div className="material-symbols-outlined text-3xl cursor-pointer font-thin">search</div>
            </form>
        </nav>
    )
}