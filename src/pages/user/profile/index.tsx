import React, { useState, useEffect } from "react";
import AccountCard from "./cards/AccountCard";
import ContactCard from "./cards/ContactCard";
import Image from "next/image";
import ImageUser from "./cards/ImageCard";
import loadingImage from '../../../assets/loading.webp';
import BankCard from "./cards/BankCard";
import UserCard from "./cards/UserCard"
import { DeleteAccountModal } from './components/deleteAccountModal';
import { getUserProfile, UserData } from "../../api/user/profileService";
import ConfirmeComponent from "./components/ConfirmeComponent";

export default function profile() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserProfile(1);
            setUserData(data);
        };
        fetchData();
    }, []);

    const handleDeleteAccount = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const scrollPosition = container.scrollLeft;
        const pageWidth = container.clientWidth;
        const newActivePage = Math.round(scrollPosition / pageWidth);
        setActivePage(newActivePage);
    };
    

    return (
        <div className="w-screen h-full bg-white dark:bg-custom-gray">
            <div className="flex justify-center font-bold p-4">
                <h1 className="text-4xl dark:text-white">PERFIL DO USUÁRIO</h1>
            </div>
            
            <hr className="bg-black mx-4 border-solid border-1 border-black dark:border-white" />
            
            <div className="px-4 mt-4 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="md:col-span-2 flex flex-col md:flex-row justify-center items-center">

                        <div className="w-full md:w-1/2 flex justify-center items-center p-2">
                            <ImageUser />
                        </div>

                        <div className="w-full md:w-1/2 flex justify-center items-center p-2">
                            {userData ? (
                                <UserCard userName={userData.username} />
                            ) : (
                                <div className="">
                                    <Image src={loadingImage} alt="Carregando..." className="w-16 h-16" />
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="hidden md:flex justify-center items-center p-2">
                        {userData ? (
                            <AccountCard
                                currentFullName={userData.fullname}
                                currentEmail={userData.email}
                                currenteCpf={userData.cpf}
                            />
                        ) : (
                            <div className="">
                                <Image src={loadingImage} alt="Carregando..." className="w-16 h-16" />
                            </div>
                        )}
                    </div>

                    <div className="hidden md:flex justify-center items-center p-2">
                        {userData ? (
                            <ContactCard
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
                        )}
                    </div>

                    <div className="hidden md:flex justify-center items-center p-2 md:col-span-2">
                        <BankCard />
                    </div>

                    <div className="md:hidden flex justify-center mt-10 space-x-4">
                        {[0, 1, 2].map((dot) => (
                            <div
                                key={dot}
                                className={`h-4 w-4 rounded-full ${
                                    activePage === dot ? 'bg-orange-500' : 'bg-gray-300'
                                }`}
                            ></div>
                        ))}
                    </div>
                    <div className="md:hidden w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide" onScroll={handleScroll}>
                        <div className="flex">
                            <div className="flex-shrink-0 w-full snap-center">
                                {userData ? (
                                    <AccountCard
                                        currentFullName={userData.fullname}
                                        currentEmail={userData.email}
                                        currenteCpf={userData.cpf}
                                    />
                                ) : (
                                    <div className="">
                                        <Image src={loadingImage} alt="Carregando..." className="w-16 h-16" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-shrink-0 w-full snap-center">
                                {userData ? (
                                    <ContactCard
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
                                )}
                            </div>
                            <div className="flex-shrink-0 w-full snap-center">
                                <BankCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-24 mb-12">
                <button 
                    className="bg-orange-600 px-4 py-2 text-white font-bold rounded-3xl drop-shadow-2xl"
                    onClick={handleDeleteAccount}
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

            {/* <Notification  title="testes" message="testes" isSuccess={false} /> */}

            {/* <div className="flex justify-center mb-12">

                <ConfirmeComponent />
                
            </div> */}
            

            
            
        </div>
    );
}