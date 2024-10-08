import React, {useState} from "react"
import Image from "next/image";
import Asterisk from '../../../../assets/asterisk.svg';
import Lock from '../../../../assets/lock.svg'

interface AccountDetailsProps {
    currentFullName: string;
    currentEmail: string;
    currenteCpf: string;
}

export default function AcountDetails({ currentFullName, currentEmail, currenteCpf }: AccountDetailsProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState(currentFullName);
    const [email, setEmail] = useState(currentEmail);
    const [cpf, setCpf] = useState(currenteCpf);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveClick = () => {
        setIsEditing(false);
        // apos fechar salvar as informações
    }

    console.log(fullName)
    console.log(email)
    console.log(cpf)


    return(
        <div className="flex flex-col  mt-14 rounded-2xl shadow-md dark:bg-custom-gray-2">
            <header className="flex justify-center p-1">
                <h4 className="text-base font-bold dark:text-white">Dados da conta</h4>
            </header>

            <hr className="mx-12 border-solid border-1 border-black mt-0 dark:border-white"/>

            <main className="flex flex-col justify-center ml-20 mr-20">
                
                <label htmlFor="" className="text-base font-medium mt-4 dark:text-white ">Nome completo</label>


                <div className="relative flex items-center">
                    <input
                        type="text"
                        className={`h-8 text-center border border-solid border-black rounded-xl mt-2 bg-gray-100 
                                    dark:bg-custom-gray-2 dark:border-white dark:text-white pr-8 ${isEditing ? 'pl-8' : ''}`} 
                        id="fullName"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        readOnly={!isEditing}
                    /> 
                    {isEditing && (
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 mt-1">
                            <Image src={Asterisk} alt="Asterisk" className="h-5 w-5" />
                        </span>
                    )}
                </div>

                

                <label htmlFor="" className="dark:text-white">Email</label>
                
                <div className="relative flex items-center">
                    <input
                        type="text"
                        className={`h-8 text-center border border-solid border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center dark:bg-custom-gray-2 dark:border-white dark:text-white pr-8 ${isEditing ? 'pl-8' : ''}`} 
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        readOnly={true}
                    />
                    {isEditing && (
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 mt-1">
                            <Image src={Lock} alt="Asterisk" className="h-5 w-5" />
                        </span>
                    )}
                </div>

                
                
                <label htmlFor="" className="dark:text-white">CPF</label>

                <div className="relative flex items-center">
                    <input
                        type="text"
                        className={`h-8 text-center border border-solid border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center dark:bg-custom-gray-2 dark:border-white dark:text-white 
                        pr-8  ${isEditing ? 'pl-8' : ''}`}  
                        id="cpf"
                        value={cpf}
                        onChange={(event) => setCpf(event.target.value)}
                        readOnly={!isEditing}
                    />
                    {isEditing && (
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 mt-1">
                            <Image src={Asterisk} alt="Asterisk" className="h-5 w-5" />
                        </span>
                    )}
                </div>

            </main>

            <footer className="flex justify-end ">
                {isEditing ? (
                    <button
                        className="bg-blue-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1"
                        onClick={handleSaveClick}
                    >
                        Salvar
                        <div className="material-symbols-outlined">check_circle</div>
                    </button>
                ) : (
                    <button
                        className="bg-orange-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1"
                        onClick={handleEditClick}
                    >
                        Editar
                        <div className="material-symbols-outlined">edit</div>
                    </button>
                )}

            </footer>
        </div>
    );
}