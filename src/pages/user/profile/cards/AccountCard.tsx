import React, {useState} from "react"
import Asterisk from '../../../../assets/asterisk.svg';
import Lock from '../../../../assets/lock.svg'
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";

interface AccountCardProps {
    currentFullName: string;
    currentEmail: string;
    currenteCpf: string;    
}

export default function AccountCard({ currentFullName, currentEmail, currenteCpf }: AccountCardProps) {

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

    return(
        <div className="flex flex-col  mt-14 rounded-2xl shadow-md dark:bg-custom-gray-2">
            <header className="flex justify-center p-1">
                <h4 className="text-base font-bold dark:text-white">Dados da conta</h4>
            </header>

            <hr className="mx-12 border-solid border-1 border-black mt-0 dark:border-white"/>

            <main className="flex flex-col justify-center ml-20 mr-20">
                
                <InputComponent
                    label="Nome completo"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    isEditing={isEditing}
                    icon={Asterisk}
                    placeholder="Digite o nome completo do usuario"
                    />
                
                <InputComponent
                    label="Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isEditing={isEditing}
                    icon={Lock}
                    placeholder="Digite o email"
                    />

                <InputComponent
                    label="CPF"
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    isEditing={isEditing}
                    icon={Asterisk}
                    placeholder="Digite o CPF"
                    />
            </main>

            <footer className="flex justify-end ">
                {
                    isEditing ? (
                        
                        <ButtonComponent
                            onClick={handleSaveClick}
                            label="Salvar"
                            icon="check_circle"
                            bgColor="bg-blue-500"
                            textColor="text-white"
                            />
                        
                    ) : (
                            
                        <ButtonComponent
                            onClick={handleEditClick}
                            label="Editar"
                            icon="edit"
                            bgColor="bg-orange-500"
                            textColor="text-white"
                            />
                )}  
            </footer>
        </div>
    );
}