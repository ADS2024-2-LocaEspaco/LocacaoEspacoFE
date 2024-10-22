import React, {useState} from "react"
import InputLargeComponent from "../components/InputLargeComponent";
import ButtonComponent from "../components/ButtonComponent";
import Asterisk from '../../../../assets/asterisk.svg';


export default function BankCard() {

    const [isEditing, setIsEditing] = useState(false);
    const [bank, setBank] = useState("Banco do Brasil");
    const [agency, setAgency] = useState("1234-5");
    const [accountNumber, setAccountNumber] = useState("567890-0");
    const [accountType, setAccountType] = useState("");

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveClick = () => {
        setIsEditing(false);

        // apos fechar salvar as informações
    }

    return (
        <div className="mt-14 rounded-2xl shadow-md dark:bg-custom-gray-2">
            <header className="flex justify-center p-1">
                <h4 className="text-base font-bold dark:text-white">Dados Bancários</h4>
            </header>

            <hr className="mx-12 border-solid border-1 border-black mt-0 dark:border-white"/>

            <main className="flex flex-col justify-center px-8">
                
                <InputLargeComponent
                    label="Banco"
                    id="bank"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    isEditing={isEditing}
                    placeholder="Insira o banco"
                    icon={Asterisk}
                    />

                <InputLargeComponent
                    label="Agência"
                    id="agency"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    isEditing={isEditing}
                    placeholder="Insira a agencia"
                    icon={Asterisk}
                    />

                <InputLargeComponent
                    label="Número da Conta"
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    isEditing={isEditing}
                    placeholder="Insira o número da conta"
                    icon={Asterisk}
                    />

                <div className="flex items-center mt-4 gap-2">
                    <label htmlFor="" className="text-base font-medium flex-shrink-0 dark:text-white">Tipo da conta</label>
                    <select className="bg-gray-300 rounded-full px-3 py-1 w-40 text-sm"
                        id="accountType"
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        disabled={!isEditing}
                    >
                        <option value="">Selecione o tipo de conta</option>
                        <option value="corrente">Conta Corrente</option>
                        <option value="poupanca">Conta Poupança</option>
                        <option value="salario">Conta Salário</option>
                    </select>
                </div>
                
            </main>

            <footer className="flex justify-end mt-4">
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
    )
}