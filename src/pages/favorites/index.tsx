import { useEffect, useState } from "react";
import Image from "next/image";

import FavoriteFolder, { CardFavoriteFolderProps } from "./components/card-favorite-folder";

import Card from './card.jpg'
import AddIcon from '../../../public/icons/add_icon.svg'

export default function Favorites() {
    const [folders, setFolders] = useState<CardFavoriteFolderProps[]>()

    useEffect(() => {
        setFolders([
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
            {
                id: 2,
                banner: Card,
                title: 'Meus favoritos',
                total: 8
            },
        ])
    }, [])

    return (
        <main className="h-full min-h-screen px-32 max-md:px-5 space-y-[60px] max-md:space-y-6">
            <h1 className="text-5xl max-md:text-2xl font-bold text-black-100">Favoritos</h1>

            <div className="flex flex-wrap gap-14 max-md:gap-5 max-sm:justify-center">
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

                <div className="flex self-start h-[248px] w-[248px] max-md:w-[184px] max-md:h-[184px] justify-center items-center">
                    <Image src={AddIcon} alt='Botão para criar pasta' className="size-28 max-md:size-20 cursor-pointer hover:opacity-80"/>
                </div>
            </div>
        </main>
    )
};
