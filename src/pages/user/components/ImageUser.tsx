
import Image from "next/image";
import iconCamera from "../../../assets/iconCamera.svg"
import User from "../../../assets/user.png"

export default function ImageUser() {
    return (
        <div className="relative  mt-14 rounded-2xl shadow-md">
            <header className="flex justify-center p-1">
                <h4 className="text-base font-bold">Imagem de perfil</h4>
            </header>

            <hr className="mx-12 border-solid border-1 border-black mt-0" />
            
            <main>
                <Image src={User} alt="User Icon" />
            </main>

            <footer className="flex justify-end items-end absolute bottom-0 right-0">
                <button>
                    <Image src={iconCamera} alt="Star Fill" className="size-9"/>
                </button>
            </footer>
        </div>
    )
}