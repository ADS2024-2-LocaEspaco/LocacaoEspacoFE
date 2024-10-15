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
    // const folderId = useParams().id

    const [favoritesAds, useFavoritesAds] = useState<CardFavoriteAdProps[]>()

    const handleReturnPage = () => {
        router.back()
    }

    useEffect(() => {
        useFavoritesAds([
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
        <main className="h-screen px-32 bg-white">
            <Image onClick={handleReturnPage} src={ArrowBackIcon} alt='Botão para retornar a página de Favoritos' className='cursor-pointer size-5 text-orange-400 opacity-90' />

            <div className='flex justify-between mt-6 space-y-[60px]'>
                <h1 className='text-5xl font-bold text-black-100'>Cháles</h1>

                <div className='flex gap-5'>
                    <div className='p-2 bg-orange-100 rounded-full'>
                        <Image src={ShareIcon} alt='Botão de compartilhamento' className='size-5 cursor-pointer hover:opacity-80' />
                    </div>

                    <div className='p-2 bg-orange-100 rounded-full'>
                        <Image src={EditIcon} alt='Botão de compartilhamento' className='size-5 cursor-pointer hover:opacity-80' />
                    </div>
                </div>
            </div>

            <div className="flex gap-14">
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
        </main>
    )
};
