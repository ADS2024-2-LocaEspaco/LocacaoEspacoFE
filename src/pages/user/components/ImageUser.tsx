
import Image from "next/image";
import iconCamera from "../../../assets/iconCamera.svg"
import User from "../../../assets/user.png"
import { useState } from "react";


export default function ImageUser() {

    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(User);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveClick = () => {
        setIsEditing(false);

        // apos fechar para salvar

    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl); 
        }
    }
    return (
        <div className="relative mt-14 rounded-2xl shadow-md dark:bg-custom-2">
            <header className="flex justify-center p-1">
                <h4 className="text-base font-bold dark:text-white">Imagem de perfil</h4>
            </header>

            <hr className="mx-12 border-solid border-1 border-black mt-0 dark:border-white" />
            
            <main>
                {isEditing ? (
                    <label htmlFor="fileInput" className="cursor-pointer">
                        <div className="rounded-full overflow-hidden w-64 h-64 flex items-center justify-center bg-gray-100 border border-gray-300 mb-3 mt-1 ml-2 mr-2">
                            <span className="text-sm text-black font-bold">
                                Selecionar imagem
                            </span>
                            <div className="material-symbols-outlined ">
                                file_open
                            </div>
                        </div>
                    </label>
                ) : (
                    <div className="flex items-center justify-center w-64 h-64 mb-2 p-3">
                        <Image src={selectedImage} alt="User Icon" className="" />
                    </div>
                )}

                {isEditing && (
                    <input 
                        id="fileInput" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileChange} 
                    />
                )}
            </main>

            <footer className="flex justify-end items-end absolute bottom-0 right-0">
                {
                    isEditing ? (
                    
                    <button
                        onClick={handleSaveClick}
                        className="mt-auto bg-blue-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1">
                        Salvar
                        
                        <div className="material-symbols-outlined">
                            check_circle
                        </div>

                    </button>
        
                    )
                    :
                    (

                    <button onClick={handleEditClick}>
                        <Image src={iconCamera} alt="Star Fill" className="size-9 "/>
                    </button>
                )}






            </footer>
        </div>
    )
}