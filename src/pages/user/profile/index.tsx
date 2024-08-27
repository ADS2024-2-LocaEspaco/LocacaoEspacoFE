
import StarFill from "../../../assets/starFill.svg";
import Star from "../../../assets/star.svg";
import Image from "next/image";
import iconCamera from "../../../assets/iconCamera.svg"
// import Avatar from 'next/react-avatar';

export default function profile() {
    return (
        
        <div className="w-screen h-screen bg-white">
            <div className="flex justify-center font-bold p-4">
                <h1 className="text-4xl">PERFIL DO USUÁRIO</h1>
            </div>

            <hr className="bg-black mr-32 ml-32 border-solid border-1 border-black" />
            
            <div className="flex justify-around">

                {/* Card */}
                <div className=" bg-gray-100 mt-14 rounded-2xl shadow-md">
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

                    <footer className="flex justify-end ">
                        <button className="bg-orange-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1">
                            Editar
                            <div className="material-symbols-outlined">
                                edit
                            </div>
                        </button>
                    </footer>
                </div>

                <div className="bg-gray-100 mt-14 rounded-2xl shadow-md">
                    <header className="flex justify-center p-1">
                        <h4 className="text-base font-bold">Dados da conta</h4>
                    </header>

                    <hr className="mx-12 border-solid border-1 border-black mt-0"/>

                    <main className="flex flex-col justify-center ml-20 mr-20">
                        
                        <label htmlFor="" className="text-base font-medium mt-4">Nome completo</label> 
                        <input type="text" className="text-xs h-8 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="Lucas Santos Pereira Nascimento "/> 

                        <label htmlFor="">Email</label>
                        <input type="text" className="h-8 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="LucasSantos@gmail.com" />
                        
                        <label htmlFor="">CPF</label>
                        <input type="text" className="h-8 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="063.821.759-86"/>

                    </main>

                    <footer className="flex justify-end">
                        <button className="bg-orange-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1">
                            Editar
                            <div className="material-symbols-outlined">
                                edit
                            </div>
                        </button>
                    </footer>
                </div>
                
                <div className="bg-gray-100 mt-14 rounded-2xl shadow-md">
                    <header className="flex justify-center p-1">
                        <h4 className="text-base font-bold">Informações de contato</h4>
                    </header>

                    <hr className="mx-12 border-solid border-1 border-black mt-0"/>

                    <main className="flex flex-col justify-center items-center ml-20 mr-20">
                        
                        <div className="flex items-center mb-1">
                            <label htmlFor="" className="text-base font-medium mr-4">Telefone</label> 
                            <input type="text" className="text-xs h-8 w-48 text-center border border-solid  border-black rounded-xl mt-4 bg-gray-100 placeholder:items-center" placeholder="(41) 98765-4321"/> 
                        </div>
                        
                        <div className="flex items-center mb-1">
                            <label htmlFor="" className="mr-7 font-medium">Estado</label>
                            <input type="text" className="h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="Paraná " />
                        </div>
                        
                        <div className="flex items-center mb-1">
                            <label htmlFor="" className="mr-7 font-medium">Cidade</label>
                            <input type="text" className="h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="Curitiba" />
                        </div>
                        
                        <div className="flex items-center mb-1">
                            <label htmlFor="" className="mr-7 font-medium">Endereço</label>
                            <input type="text" className="mr-3 h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="Rua XV de Novembro, 1050, Sala 12"/>
                        </div>
                        
                        <div className="flex items-center mb-1">
                            <label htmlFor="" className="flex text-center mr-4 font-medium">CEP</label>
                            <input type="text" className="ml-7 h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="80020-310"/>
                        </div>
                        
                    </main>

                    <footer className="flex justify-end">
                        <button className="bg-orange-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1">
                            Editar
                            <div className="material-symbols-outlined">
                                edit
                            </div>
                        </button>
                    </footer>
                </div>  

                <div className="bg-gray-100 mt-14 rounded-2xl shadow-md">
                    <header className="flex justify-center p-1">
                        <h4 className="text-base font-bold">Dados Bancários</h4>
                    </header>

                    <hr className="mx-12 border-solid border-1 border-black mt-0"/>

                    <main className="flex flex-col justify-center ml-20 mr-20">
                        
                        <label htmlFor="" className="text-base font-medium mt-4">Banco</label> 
                        <input type="text" className="text-xs h-8 text-center border border-solid  border-black rounded-xl bg-gray-100 placeholder:items-center" placeholder="Banco do Brasil"/> 

                        <label htmlFor="" className="mt-2">Agência</label>
                        <input type="text" className="h-8 text-center border border-solid  border-black rounded-xl  bg-gray-100 placeholder:items-center" placeholder="1234-5" />
                        
                        <label htmlFor="" className="mt-2">Número da Conta</label>
                        <input type="text" className="h-8 text-center border border-solid  border-black rounded-xl  bg-gray-100 placeholder:items-center" placeholder="56789-0"/>

                    </main>

                    <footer className="flex justify-end">
                        <button className="bg-orange-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1">
                            Editar
                            <div className="material-symbols-outlined">
                                edit
                            </div>
                        </button>
                    </footer>
                </div>

                <div className="bg-gray-100 mt-14 rounded-2xl shadow-md">
                    <header className="flex justify-center p-1">
                        <h4 className="text-base font-bold">Imagem de perfil</h4>
                    </header>

                    <hr className="mx-12 border-solid border-1 border-black mt-0" />
                    
                    <main>
                        {/* <Avatar name={name} src={src} size="50" round={true} /> */}
                    </main>

                    <footer className="flex justify-end items-end">
                        <button>
                            <Image src={iconCamera} alt="Star Fill" className="size-9"/>
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
}