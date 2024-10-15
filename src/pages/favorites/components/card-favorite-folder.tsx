import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/router";

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

    return (
        <div onClick={handleFavoritesFolder} className="w-[248px] space-y-5 text-center cursor-pointer hover:opacity-95">
            <Image src={banner} alt="Banner da pasta" className="rounded-3xl h-[248px] drop-shadow" />

            <div className="my-1">
                <h2 className="text-xl font-bold text-black-100">{title}</h2>

                <span className="text-gray-400">{total} itens</span>
            </div>
        </div>
    )
};
