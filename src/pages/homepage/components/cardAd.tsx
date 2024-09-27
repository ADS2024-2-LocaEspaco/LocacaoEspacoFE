import Image, { StaticImageData } from "next/image";

import StarIcon from '../../../../public/icons/star_icon.svg'

export interface CardAdProps {
    id: number
    image: StaticImageData
    title: string
    rating: number
    city: string
    country: string
    value: number
}

export default function CardAd({ id, image, title, rating, city, country, value }: CardAdProps) {

    const handleShowAdPage = () => {
        console.log(id)
    }

    return (
        <div onClick={handleShowAdPage} className="flex flex-col max-w-[260px] max-sm:m-auto px-4 pt-5 pb-4 rounded-3xl hover:opacity-90 cursor-pointer bg-white shadow-[0px_1px_7.6px_0px_rgba(128,128,128,1)]">
            <Image
                src={image}
                alt="Imagem do anúncio"
                className="rounded-2xl"
            />

            <div className="flex justify-between mt-4">
                <h4 className="font-title font-bold text-xl text-black-200">{title}</h4>

                <div className="flex gap-1 justify-center items-center">
                    <Image
                        src={StarIcon}
                        alt="Imagem do anúncio"
                    />
                    <p className="text-sm text-orange-400">{rating}</p>
                </div>
            </div>

            <p className="mt-2 text-gray-400">{city}, {country}</p>

            <span className="mt-6 block font-title font-bold text-xl text-blue-600">R$ {value} diária</span>
        </div>
    )
};