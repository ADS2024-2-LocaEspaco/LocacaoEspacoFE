import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";

import Favorite from '../../../../public/icons/favorite_heart_icon.svg'
import { MouseEventHandler } from "react";

export interface CardFavoriteAdProps {
    id: number
    banner: StaticImageData
    title: string
    subtitle: string
}

export default function CardFavoriteAd({ id, banner, title, subtitle }: CardFavoriteAdProps) {
    const router = useRouter()

    const handlePageAd = () => {
        router.push(`/ads/${id}`)
    }

    const handleToUnfavorite = () => {
        console.log('Desfavoritar', id)
    }

    return (
        <div onClick={handlePageAd} className="w-[248px] max-md:w-[184px] space-y-5 text-center cursor-pointer hover:opacity-95 ">
            <div className="relative">
                <Image src={banner} alt="Banner da pasta" className="rounded-3xl h-[248px] max-md:h-[184px] drop-shadow" />

                <Image 
                    onClick={(event) => {
                        event.stopPropagation()
                        handleToUnfavorite()
                    }} 
                    src={Favorite} alt="Botão de favoritar" className="absolute z-50 top-4 left-4" />
            </div>
            <div className="my-1">
                <h2 className="text-xl max-md:text-base font-bold text-black-100">{title}</h2>

                <span className="text-gray-400 max-md:text-[12px]">{subtitle}</span>
            </div>
        </div>
    )
};
