import React, { useState } from "react";
import StarFill from "../../../../assets/starFill.svg";
import Star from "../../../../assets/star.svg";
import Asterisk from '../../../../assets/asterisk.svg';
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import RatingComponent from "../components/RatingComponent";

interface UserCardProps {
    userName: string; 
}

export default function UserCard({ userName: initialUserName }: UserCardProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState<string>(initialUserName);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveClick = () => {
        setIsEditing(false);
        //lógica para salvar o nome de usuário
    }

    return (
        <div className="mt-14 rounded-2xl shadow-md dark:bg-custom-gray-2">
            <header className="flex justify-center p-1">
                <h4 className="text-base font-bold dark:text-white">Informações básicas</h4>
            </header>

            <hr className="mx-12 border-solid border-1 border-black mt-0 dark:border-white"/>

            <main className="flex flex-col justify-center ml-20 mr-20">
                <InputComponent
                    label="Nome de usuário"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    isEditing={isEditing}
                    icon={Asterisk}
                    placeholder="Digite o nome do usuario"
                    />

                <RatingComponent
                    rating={4}
                    maxRating={5}
                    filledStar={StarFill}
                    emptyStar={Star}
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
    );
}
