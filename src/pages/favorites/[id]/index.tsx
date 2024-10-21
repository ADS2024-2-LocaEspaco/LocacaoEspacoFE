import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';

import CardFavoriteAd, { CardFavoriteAdProps } from '../components/card-favorite-ad';
import ModalShare from '../components/ModalShare';
import ModalEditList from '../components/ModalEditList';
import ModalUnfavorite from '../components/ModalUnfavorite';
import ModalCreateFolder from '../components/ModalCreateFolder';

import ArrowBackIcon from '../../../../public/icons/arrow_back_icon.svg';
import ShareIcon from '../../../../public/icons/share_icon.svg';
import EditIcon from '../../../../public/icons/edit_icon.svg';
import Ad from '../ad.jpg';

export default function FavoritesFolder() {
    const router = useRouter();
    const folderId = useParams().id;

    const [favoritesAds, setFavoritesAds] = useState<CardFavoriteAdProps[]>([]);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isEditListModalOpen, setIsEditListModalOpen] = useState(false);
    const [isUnfavoriteModalOpen, setIsUnfavoriteModalOpen] = useState(false);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    const [selectedAd, setSelectedAd] = useState<CardFavoriteAdProps | null>(null);
    const [listName, setListName] = useState('Chalés');

    const handleReturnPage = () => {
        router.back();
    };

    const handleShareClick = () => {
        setIsShareModalOpen(true);
    };

    const handleEditClick = () => {
        setIsEditListModalOpen(true);
    };

    const handleUnfavoriteClick = (ad: CardFavoriteAdProps) => {
        setSelectedAd(ad);
        setIsUnfavoriteModalOpen(true);
    };

    const handleConfirmUnfavorite = () => {
        if (selectedAd) {
            setFavoritesAds((prevAds) => prevAds.filter((ad) => ad.id !== selectedAd.id));
            setIsUnfavoriteModalOpen(false);
            setSelectedAd(null);
        }
    };

    const handleSaveListName = (newName: string) => {
        setListName(newName);
        setIsEditListModalOpen(false);
    };

    const handleCreateFolderClick = () => {
        setIsCreateFolderModalOpen(true);
    };

    const handleCreateFolder = (folderName: string) => {
        console.log('Folder created with name:', folderName);
        setIsCreateFolderModalOpen(false);
    };

    useEffect(() => {
        setFavoritesAds([
            {
                id: 1,
                banner: Ad,
                title: 'Titulo do anuncio 1',
                subtitle: 'Cidade Tal, Brasil',
            },
            {
                id: 2,
                banner: Ad,
                title: 'Titulo do anuncio 2',
                subtitle: 'Cidade Tal, Brasil',
            },
        ]);
    }, []);

    return (
        <main className="h-full min-h-screen px-32 max-md:px-5 bg-white">
            <div className='space-y-[60px] max-md:space-y-6'>
                <div className='flex flex-col max-md:flex-row max-md:items-center gap-6 max-md:gap-3'>
                    <Image
                        onClick={handleReturnPage}
                        src={ArrowBackIcon}
                        alt='Botão para retornar a página de Favoritos'
                        className='cursor-pointer hover:opacity-80 size-5 max-md:size-4 text-orange-400 opacity-90'
                    />

                    <div className='flex flex-1 justify-between items-center'>
                        <h1 className='text-5xl max-md:text-2xl font-bold text-black-100'>{listName}</h1>

                        <div className='flex items-center gap-5'>
                            <div className='p-2 bg-orange-100 rounded-full cursor-pointer hover:opacity-80' onClick={handleShareClick}>
                                <Image src={ShareIcon} alt='Botão de compartilhamento' className='size-5 max-md:size-4' />
                            </div>

                            <div className='p-2 bg-orange-100 rounded-full cursor-pointer hover:opacity-80' onClick={handleEditClick}>
                                <Image src={EditIcon} alt='Botão de edição' className='size-5 max-md:size-4' />
                            </div>

                            <div className='p-2 text-black-300 font-bold bg-orange-100 rounded-full cursor-pointer hover:opacity-80' onClick={handleCreateFolderClick}>
                                <span>Nova Pasta</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-14 max-md:gap-5 max-sm:justify-center">
                    {favoritesAds.length > 0 ? (
                        favoritesAds.map((ad) => (
                            <CardFavoriteAd
                                key={ad.id}
                                id={ad.id}
                                banner={ad.banner}
                                title={ad.title}
                                subtitle={ad.subtitle}
                                onUnfavorite={() => handleUnfavoriteClick(ad)}
                            />
                        ))
                    ) : (
                        <h1 className="text-gray-400">Nenhum anúncio favoritado!</h1>
                    )}
                </div>
            </div>

            {/* Modais */}
            <ModalShare
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                listName={listName}
            />
            <ModalEditList
                isOpen={isEditListModalOpen}
                onClose={() => setIsEditListModalOpen(false)}
                onSave={handleSaveListName}
                listName={listName}
            />
            <ModalUnfavorite
                isOpen={isUnfavoriteModalOpen}
                onClose={() => setIsUnfavoriteModalOpen(false)}
                onConfirm={handleConfirmUnfavorite}
                adTitle={selectedAd?.title || ''}
                listName={listName}
            />
            <ModalCreateFolder
                isOpen={isCreateFolderModalOpen}
                onClose={() => setIsCreateFolderModalOpen(false)}
                onCreate={handleCreateFolder}
            />
        </main>
    );
}
