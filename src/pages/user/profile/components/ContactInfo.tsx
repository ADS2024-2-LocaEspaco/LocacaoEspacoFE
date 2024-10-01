import React, { useState } from 'react'
interface ContactInfoProps{
    currentPhone: string;
    currentState: string;
    currentCity: string;
    currentAddress: string;
    currentCep: string
}


export default function ContactInfo({currentPhone, currentState, currentCity, currentAddress, currentCep} : ContactInfoProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [phone, setPhone] = useState(currentPhone);
    const [state, setState] = useState(currentState);
    const [city, setCity] = useState(currentCity);
    const [address, setAddress] = useState(currentAddress);
    const [cep , setCep] = useState(currentCep);

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
                <h4 className="text-base font-bold dark:text-white">Informações de contato</h4>
            </header>

            <hr className="mx-12 border-solid border-1 border-black mt-0 dark:border-white"/>

            <main className="flex flex-col justify-center items-center ml-20 mr-20">
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="text-base font-medium mr-4 dark:text-white">Telefone</label> 
                    <input type="text" className="text-xs h-8 w-48 text-center border border-solid  border-black rounded-xl mt-4 bg-gray-100 placeholder:items-center dark:bg-custom-gray-2 dark:border-white dark:text-white " 
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        readOnly={!isEditing}
                    /> 
                </div>
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="mr-7 font-medium dark:text-white ">Estado</label>
                    <input type="text" className="h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center dark:bg-custom-gray-2 dark:border-white dark:text-white " 
                        id="state"
                        value={state}   
                        onChange={(e) => setState(e.target.value)}
                        readOnly={!isEditing}

                    />
                </div>
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="mr-7 font-medium dark:text-white">Cidade</label>
                    <input type="text" className="h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center dark:bg-custom-gray-2 dark:border-white dark:text-white" 
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        readOnly={!isEditing}

                    />
                </div>
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="mr-7 font-medium dark:text-white">Endereço</label>
                    <input type="text" className="mr-3 h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100  placeholder:items-center
                    dark:bg-custom-gray-2 dark:border-white dark:text-white 

                    " 
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        readOnly={!isEditing}
                    />
                </div>
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="flex text-center mr-4 font-medium dark:text-white">CEP</label>
                    <input type="text" className="ml-7 h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100  placeholder:items-center
                    dark:bg-custom-gray-2 dark:border-white dark:text-white" 
                        id="cep"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        readOnly={!isEditing}
                    />
                </div>
                
            </main>

            <footer className="flex justify-end">
                {!isEditing ? (
                    <button onClick={handleEditClick} className='bg-orange-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1'>
                        Editar
                        <div className='material-symbols-outlined'>edit</div>
                    </button>
                ) : (
                    <button onClick={handleSaveClick} className='bg-blue-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1'>
                        Salvar
                        <div className='material-symbols-outlined'>check_circle</div>
                    </button>
                )}
            </footer>
        </div>  
    )
}