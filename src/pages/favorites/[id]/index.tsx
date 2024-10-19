import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'

import CardFavoriteAd, { CardFavoriteAdProps } from '../components/card-favorite-ad'

import ArrowBackIcon from '../../../../public/icons/arrow_back_icon.svg'
import ShareIcon from '../../../../public/icons/share_icon.svg'
import EditIcon from '../../../../public/icons/edit_icon.svg'
import Ad from '../ad.jpg'

export default function FavoritesFolder() {
    const router = useRouter()
    const folderId = useParams().id

    const [favoritesAds, setFavoritesAds] = useState<CardFavoriteAdProps[]>()

    const handleReturnPage = () => {
        router.back()
    }

    useEffect(() => {
        setFavoritesAds([
            {
                id: 1,
                banner: Ad,
                title: 'Titulo do anuncio',
                subtitle: 'Cidade Tal, Brasil',
            },
            {
                id: 2,
                banner: Ad,
                title: 'Titulo do anuncio',
                subtitle: 'Cidade Tal, Brasil',
            },
        ])
    }, [])

    return (
        <main className="h-full min-h-screen px-32 max-md:px-5 bg-white">

            <div className='space-y-[60px] max-md:space-y-6'>
                <div className='flex flex-col max-md:flex-row max-md:items-center gap-6 max-md:gap-3'>
                    <Image onClick={handleReturnPage} src={ArrowBackIcon} alt='Botão para retornar a página de Favoritos' className='cursor-pointer hover:opacity-80 size-5 max-md:size-4 text-orange-400 opacity-90' />

                    <div className='flex flex-1 justify-between items-center'>
                        <h1 className='text-5xl max-md:text-2xl font-bold text-black-100'>Cháles</h1>

                        <div className='flex items-center gap-5'>
                            <div className='p-2 bg-orange-100 rounded-full cursor-pointer hover:opacity-80'>
                                <Image src={ShareIcon} alt='Botão de compartilhamento' className='size-5 max-md:size-4' />
                            </div>

                            <div className='p-2 bg-orange-100 rounded-full cursor-pointer hover:opacity-80'>
                                <Image src={EditIcon} alt='Botão de compartilhamento' className='size-5 max-md:size-4' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-14 max-md:gap-5 max-sm:justify-center">
                    {
                        favoritesAds ? (
                            favoritesAds.map((ad, index) => (
                                <CardFavoriteAd
                                    key={index}
                                    id={ad.id}
                                    banner={ad.banner}
                                    title={ad.title}
                                    subtitle={ad.subtitle}
                                />
                            ))
                        ) : (
                            <h1 className="text-gray-400">Nenhum anúncio favoritado!</h1>
                        )
                    }
                </div>
            </div>
        </main>
    )
};
