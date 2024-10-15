import { useEffect, useState } from "react";
import Image from "next/image";

import FavoriteFolder, { CardFavoriteFolderProps } from "./components/card-favorite-folder";

import Card from './card.jpg'
import AddIcon from '../../../public/icons/add_icon.svg'


export default function Favorites() {
    const [folders, useFolders] = useState<CardFavoriteFolderProps[]>()

    useEffect(() => {
        useFolders([
            {
                id: 1,
                banner: Card,
                title: 'Cháles',
                total: 5
            },
            {
                id: 2,
                banner: Card,
                title: 'Meus favoritos',
                total: 8
            },
        ])
    }, [])

    return (
        <main className="h-screen px-32 space-y-[60px]">
            <h1 className="text-5xl font-bold text-black-100">Favoritos</h1>

            <div className="flex gap-14 items-center">
                {
                    folders ? (
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

                <div className="h-[248px]">
                    <Image src={AddIcon} alt='Botão para criar pasta' className="flex" />
                </div>
            </div>
        </main>
    )
};
