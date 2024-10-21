import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";

import X from '../../../../public/icons/x_icon.svg'

export interface CardFavoriteFolderProps {
    id: number
    banner: StaticImageData
    title: string
    total: number
}

export default function CardFavoriteFolder({ id, banner, title, total }: CardFavoriteFolderProps) {
    const router = useRouter()

    const handleFavoritesFolder = () => {
        router.push(`/favorites/${id}`)
    }

    const handleDeleteFolder = () => {
        console.log('Excluir pasta', id)
    }

    return (
        <div onClick={handleFavoritesFolder} className="w-[248px] max-md:w-[184px] space-y-5 max-md:space-y-2 text-center cursor-pointer hover:opacity-95">
            <div className="relative">
                <Image src={banner} alt="Banner da pasta" className="rounded-3xl h-[248px] max-md:h-[184px] drop-shadow" />

                <Image 
                    onClick={(event) => {
                        event.stopPropagation()
                        handleDeleteFolder()
                    }} 
                    src={X} 
                    alt="Botão de favoritar" 
                    className="absolute z-50 top-4 left-4" />
            </div>

            <div className="my-1 px-2">
                <h2 className="text-xl max-md:text-base font-bold text-black-100 truncate">{title}</h2>

                <span className="text-gray-400 max-md:text-[12px]">{total} itens</span>
            </div>
        </div>
    )
};