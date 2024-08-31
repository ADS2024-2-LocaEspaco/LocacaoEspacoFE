
import StarFill from "../../../assets/starFill.svg";
import Star from "../../../assets/star.svg";
import Image from "next/image";

export default function InfoBasicUser() {

    return (
        <div className="relative bg-gray-100 mt-14 rounded-2xl shadow-md">
            <header className="flex justify-center p-1">
                <h4 className="text-base font-bold">Informações básicas</h4>
            </header>

            <hr className="mx-12 border-solid border-1 border-black mt-0"/>

            <main className="flex flex-col justify-center ml-20 mr-20">
                
                <label htmlFor="" className="text-base font-medium mt-4">Nome de usuário</label> 
                <input type="text" className="h-8 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="Lucas Santos"/> 

                <label htmlFor="" className="mt-4 text-base font-medium">Média de avaliação</label>
                <div className="flex items-center mt-2">
                    <Image src={StarFill} alt="Star Fill" className="size-9"/>
                    <Image src={StarFill} alt="Star Fill" className="size-9"/>
                    <Image src={StarFill} alt="Star Fill" className="size-9"/>
                    <Image src={StarFill} alt="Star Fill" className="size-9"/>
                    <Image src={Star} alt="Star" className="size-9"/>

                    <p className="ml-2 text-sm">4 de 5</p>
                </div>

            </main>

            <footer className="flex justify-end absolute bottom-0 right-0">
                <button className="mt-auto bg-orange-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1">
                    Editar
                    <div className="material-symbols-outlined">
                        edit
                    </div>
                </button>
            </footer>
        </div>
    );
}