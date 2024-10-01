import React, { useState, useEffect } from "react";

import AcountDetails from "./components/AcountDetails";
import ContactInfo from "./components/ContactInfo";

import Image from "next/image";
import ImageUser from "./components/ImageUser";
import loadingImage from '../../../assets/loading.webp';

import InfoBank from "./components/InfoBank";
import InfoBasicUser from "./components/InfoBasicUser"
import { DeleteAccountModal } from './components/deleteAccountModal';
import Notification from "./components/Notification";

import { getUserProfile, UserData } from "../../api/user/profileService";

export default function profile() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteAccount = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserProfile(1);
            setUserData(data);
        };

        fetchData();
    }, []);


    return (
        
        <div className="w-screen h-full bg-white  dark:bg-custom-gray">
            <div className="flex justify-center font-bold p-4">
                <h1 className="text-4xl  dark:text-white">PERFIL DO USUÁRIO</h1>
            </div>
        
            <hr className="bg-black mx-4 border-solid border-1 border-black dark:border-white" />
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-4 mt-4 max-w-4xl mx-auto">

                <div className="flex justify-center items-center p-2">
                    {userData ? (
                        <InfoBasicUser userName={userData.username} />
                        ) : (
                            <div className="">
                                <Image src={loadingImage} alt="Carregando..." className="w-16 h-16" />
                            </div>
                        )}
                </div>
        
                <div className="flex justify-center items-center p-2">
                    <ImageUser />
                </div>
        
                <div className="flex justify-center items-center p-2">
                    {userData ? (
                            <AcountDetails
                                currentFullName={userData.fullname}
                                currentEmail={userData.email}
                                currenteCpf={userData.cpf}
                            />
                        ) : (
                            <div className="">
                                <Image src={loadingImage} alt="Carregando..." className="w-16 h-16" />
                            </div>
                        )
                    }
                </div>
        
                <div className="flex justify-center items-center p-2">
                    {userData ? (
                                <ContactInfo
                                currentPhone={userData.phone}
                                currentState={userData.state}
                                currentCity={userData.city}
                                currentAddress={userData.address}
                                currentCep={userData.cep}
                                    />
                            ) : (
                                <div className="">
                                    <Image src={loadingImage} alt="Carregando..." className="w-16 h-16" />
                                </div>
                            )
                        }
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

            {/* <div className="flex gap-10 justify-center">
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

            </div> */}
            
        </div>
    );
}