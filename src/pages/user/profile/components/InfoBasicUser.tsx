import React, {useState} from "react";

import StarFill from "../../../../assets/starFill.svg";
import Star from "../../../../assets/star.svg";
import Image from "next/image";
interface InfoBasicUserProps {
    userName: string; 
}

export default function InfoBasicUser({ userName: initialUserName }: InfoBasicUserProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState<string>(initialUserName);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveClick = () => {
        setIsEditing(false);

        // apos fechar para salvar

    }

    return (
        <div className="mt-14 rounded-2xl shadow-md dark:bg-custom-gray-2">
            <header className="flex justify-center p-1">
                <h4 className="text-base font-bold dark:text-white ">Informações básicas</h4>
            </header>

            <hr className="mx-12 border-solid border-1 border-black mt-0 dark:border-white"/>

            <main className="flex flex-col justify-center ml-20 mr-20">
                
                <label htmlFor="userName" className="text-base font-medium mt-4 dark:text-white">Nome de usuário</label> 
                <input
                    type="text"
                    id="userName"
                    value={userName}    
                    onChange={(e) => setUserName(e.target.value)}
                    readOnly={!isEditing}
                    className="h-8 text-center border border-solid  border-black rounded-xl mt-2  placeholder:items-center bg-gray-100 dark:border-white dark:bg-custom-gray-2 dark:text-white"
                /> 

                <label htmlFor="" className="mt-4 text-base font-medium dark:text-white">Média de avaliação</label>
                <div className="flex items-center mt-2">
                    <Image src={StarFill} alt="Star Fill" className="size-9"/>
                    <Image src={StarFill} alt="Star Fill" className="size-9"/>
                    <Image src={StarFill} alt="Star Fill" className="size-9"/>
                    <Image src={StarFill} alt="Star Fill" className="size-9"/>
                    <Image src={Star} alt="Star" className="size-9"/>

                    <p className="ml-2 text-sm dark:text-white ">4 de 5</p>
                </div>

            </main>

            <footer className="flex justify-end">
                {
                    isEditing ? (
                    
                    <button
                        onClick={handleSaveClick}
                        className="mt-auto bg-blue-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1">
                        Salvar
                        
                        <div className="material-symbols-outlined">
                            check_circle
                        </div>

                    </button>
        
                    )
                    :
                    (

                    <button
                        onClick={handleEditClick}
                        className="mt-auto bg-orange-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1">
                        Editar

                        <div className="material-symbols-outlined">
                            edit
                            </div>
                            
                    </button>
                )}
                
            </footer>
        </div>
    );
}