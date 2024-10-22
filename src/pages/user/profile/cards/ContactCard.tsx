import React, { useState } from 'react'
import Asterisk from '../../../../assets/asterisk.svg';
import InputLeftComponent from '../components/InputLeftComponent';
import ButtonComponent from '../components/ButtonComponent';

interface ContactCardProps{
    currentPhone: string;
    currentState: string;
    currentCity: string;
    currentAddress: string;
    currentCep: string
}

export default function ContactCard({currentPhone, currentState, currentCity, currentAddress, currentCep} : ContactCardProps) {

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
        <div className="mt-14 rounded-2xl shadow-md dark:bg-custom-gray-2 w-96">
            <header className="flex justify-center p-1">
                <h4 className="text-base font-bold dark:text-white">Informações de contato</h4>
            </header>

            <hr className="mx-12 border-solid border-1 border-black mt-0 dark:border-white"/>

            <main className="flex flex-col justify-center items-center ml-20 mr-20">
                
                    <InputLeftComponent 
                        label="Telefone"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        isEditing={isEditing}
                        icon={Asterisk}
                    />
                
                    <InputLeftComponent
                        label="Estado"
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        isEditing={isEditing     }
                        icon={Asterisk}
                    />
                
                    <InputLeftComponent
                        label="Cidade"
                        id='city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        isEditing={isEditing     }
                        icon={Asterisk}
                    />
                
                    <InputLeftComponent
                        label="Endereço"
                        id='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        isEditing={isEditing     }
                        icon={Asterisk}
                    />
                
                    <InputLeftComponent
                        label="CEP"
                        id='cep'
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        isEditing={isEditing     }
                        icon={Asterisk}
                    />
            </main>

            <footer className="flex justify-end">
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