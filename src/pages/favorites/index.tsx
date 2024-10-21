import { useEffect, useState } from "react";
import Image from "next/image";

import FavoriteFolder, { CardFavoriteFolderProps } from "./components/card-favorite-folder";
import ModalCreateFolder from "./components/ModalCreateFolder";

import Card from './card.jpg';
import AddIcon from '../../../public/icons/add_icon.svg';

export default function Favorites() {
    const [folders, setFolders] = useState<CardFavoriteFolderProps[]>([]); 
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);

    useEffect(() => {
        setFolders([
            {
                id: 1,
                banner: Card,
                title: 'Chalés',
                total: 5
            },
            {
                id: 2,
                banner: Card,
                title: 'Meus favoritos',
                total: 8
            },
            {
                id: 3,
                banner: Card,
                title: 'Lugares para visitar',
                total: 4
            },
        ]);
    }, []);

    const handleCreateFolder = () => {
        setIsCreateFolderModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsCreateFolderModalOpen(false);
    };

    const handleCreateNewFolder = (folderName: string) => {
 
        const newFolder = {
            id: folders.length + 1,
            banner: Card,
            title: folderName,
            total: 0 
        };

        setFolders((prevFolders) => [...prevFolders, newFolder]);

        setIsCreateFolderModalOpen(false);

        // Integração com backend :
        /*
        fetch('/api/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: folderName }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao criar a lista no backend');
            }
            return response.json();
        })
        .then(data => {
            console.log('Lista criada com sucesso:', data);
            // Se necessário, você pode atualizar o estado de folders aqui com a resposta do backend
        })
        .catch(error => {
            console.error('Erro ao criar a lista:', error);
        });
        */
    };

    return (
        <main className="h-full min-h-screen px-32 max-md:px-5 space-y-[60px] max-md:space-y-6 bg-white">
            <h1 className="text-5xl max-md:text-2xl font-bold text-black-100">Favoritos</h1>

            <div className="flex flex-wrap gap-14 max-md:gap-5 max-sm:justify-center">
                {
                    folders.length > 0 ? (
                        folders.map((folder, index) => (
                            <FavoriteFolder
                                key={index}
                                id={folder.id}
                                banner={folder.banner}
                                title={folder.title}
                                total={folder.total}
                            />
                        ))
                    ) : (
                        <h1 className="text-gray-400">Nenhuma pasta criada!</h1>
                    )
                }

                <div
                    className="flex self-start h-[248px] w-[248px] max-md:w-[184px] max-md:h-[184px] justify-center items-center"
                    onClick={handleCreateFolder}
                >
                    <Image
                        src={AddIcon}
                        alt='Botão para criar pasta'
                        className="size-28 max-md:size-20 cursor-pointer hover:opacity-80"
                    />
                </div>
            </div>

            {/* Modal para criar pasta */}
            <ModalCreateFolder
                isOpen={isCreateFolderModalOpen}
                onClose={handleCloseModal}
                onCreate={handleCreateNewFolder} 
            />
        </main>
    );
}
