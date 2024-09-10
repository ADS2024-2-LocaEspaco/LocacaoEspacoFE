import React, { useState } from "react";

import AcountDetails from "../components/AcountDetails";
import ContactInfo from "../components/ContactInfo";
import ImageUser from "../components/ImageUser";
import InfoBank from "../components/InfoBank";
import InfoBasicUser from "../components/InfoBasicUser"

// import DeleteAcount from '../components/deleteAccountModal';
import { DeleteAccountModal } from '../components/deleteAccountModal';

import Notification from "../components/Notification";


export default function profile() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteAccount = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };



    return (
        
        <div className="w-screen h-full bg-white">
            <div className="flex justify-center font-bold p-4">
                <h1 className="text-4xl">PERFIL DO USUÁRIO</h1>
            </div>
        
            <hr className="bg-black mx-4 border-solid border-1 border-black" />
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-4 mt-4 max-w-4xl mx-auto">
                <div className="flex justify-center items-center p-2">
                    <InfoBasicUser />
                </div>
        
                <div className="flex justify-center items-center p-2">
                    <ImageUser />
                </div>
        
                <div className="flex justify-center items-center p-2">
                    <AcountDetails />
                </div>
        
                <div className="flex justify-center items-center p-2">
                    <ContactInfo />
                </div>
        
                <div className="flex justify-center items-center p-2 md:col-span-2">
                    <InfoBank />
                </div>
            </div>


            <div className="flex justify-center mt-24 mb-12">
                    <button 
                        className="bg-orange-600 px-4 py-2 text-white font-bold rounded-3xl drop-shadow-2xl"
                        onClick={handleDeleteAccount}  // Exibe o modal
                    >
                        Excluir conta
                    </button>
            </div>

            {isModalOpen && (
                <DeleteAccountModal 
                    title="Confirmação Necessária "
                    message="Para excluir sua conta digite o Email vinculado no campo abaixo."
                    onClose={closeModal}
                />
            )}

            <div className="flex gap-10 justify-center">
                <Notification 
                    title="Sucesso" 
                    message="Sua conta foi excluída." 
                    isSuccess={true}
                />

                <Notification 
                    title="Algo deu errado" 
                    message="Ocorreu um problema ao excluir sua conta." 
                    isSuccess={false}
                />

            </div>
            
        </div>
    );
}