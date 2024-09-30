import React, {useState} from "react"

export default function InfoBank() {

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
                
                <label htmlFor="" className="text-base font-medium mt-4dark:text-white">Banco</label> 
                <input type="text" className="text-xs h-8 text-center border border-solid  border-black rounded-xl bg-gray-100  placeholder:items-center
                dark:bg-custom-gray-2 dark:border-white dark:text-white
                "
                    id="bank"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    readOnly={!isEditing}
                /> 

                <label htmlFor="" className="mt-2 dark:text-white">Agência</label>
                <input type="text" className="h-8 text-center border border-solid  border-black rounded-xl  bg-gray-100 placeholder:items-center
                dark:bg-custom-gray-2 dark:border-white dark:text-white
                "  
                    id="agency"
                    value={agency}
                    onChange={(e) => setAgency(e.target.value)}
                    readOnly={!isEditing}
                />
                
                <label htmlFor="" className="mt-2 dark:text-white">Número da Conta</label>
                <input type="text" className="h-8 text-center border border-solid  border-black rounded-xl  bg-gray-100 placeholder:items-center
                dark:bg-custom-gray-2 dark:border-white dark:text-white" 
                    id="accountNumber"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    readOnly={!isEditing}

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

            <footer className="flex justify-end mt-2">

                {isEditing ? (
                    <button 
                        onClick={handleSaveClick}
                        className="bg-blue-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1">
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
                        className="bg-orange-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1">
                        Editar
                        <div className="material-symbols-outlined">
                            edit
                        </div>
                    </button>
                )
                }
            </footer>
        </div>
    )
}