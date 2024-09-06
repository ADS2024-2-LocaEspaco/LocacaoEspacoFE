import React, { useState } from 'react'


export default function ContactInfo() {

    const [isEditing, setIsEditing] = useState(false);
    const [phone, setPhone] = useState("(41) 98765-4321");
    const [state, setState] = useState("Parana");
    const [city, setCity] = useState("Curitiba");
    const [address, setAddress] = useState("Av. das Nações Unidas, 1234");
    const [cep , setCep] = useState("12345-678");

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveClick = () => {
        setIsEditing(false);

        // apos fechar para salvar
    }
    
    return (
        <div className="mt-14 rounded-2xl shadow-md">
            <header className="flex justify-center p-1">
                <h4 className="text-base font-bold">Informações de contato</h4>
            </header>

            <hr className="mx-12 border-solid border-1 border-black mt-0"/>

            <main className="flex flex-col justify-center items-center ml-20 mr-20">
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="text-base font-medium mr-4">Telefone</label> 
                    <input type="text" className="text-xs h-8 w-48 text-center border border-solid  border-black rounded-xl mt-4 bg-gray-100 placeholder:items-center" 
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        readOnly={!isEditing}
                    /> 
                </div>
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="mr-7 font-medium">Estado</label>
                    <input type="text" className="h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" 
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        readOnly={!isEditing}

                    />
                </div>
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="mr-7 font-medium">Cidade</label>
                    <input type="text" className="h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" 
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        readOnly={!isEditing}

                    />
                </div>
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="mr-7 font-medium">Endereço</label>
                    <input type="text" className="mr-3 h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" 
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        readOnly={!isEditing}
                    />
                </div>
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="flex text-center mr-4 font-medium">CEP</label>
                    <input type="text" className="ml-7 h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" 
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