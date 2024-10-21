import React from 'react';
import Image from 'next/image';
import CopyIcon from '../../../../public/icons/copy_icon.svg';
import WhatsAppIcon from '../../../../public/icons/whatsapp_icon.svg';

interface ModalShareProps {
    isOpen: boolean;
    onClose: () => void;
    listName?: string;
}

export default function ModalShare({ isOpen, onClose, listName = "Chalés" }: ModalShareProps) {
    if (!isOpen) return null;

    const handleCopyLink = () => {
        const url = 'https://example.com';
        navigator.clipboard.writeText(url);
        alert('Link copiado!');
    };

    const handleShareWhatsApp = () => {
        const url = 'https://example.com';
        window.open(`https://api.whatsapp.com/send?text=Confira minha lista: ${url}`, '_blank');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
                <h2 className="text-xl font-bold mb-4 text-blue-500">Compartilhar</h2>
                <p className="text-black-300 mb-6">
                    Compartilhe com amigos a sua lista "{listName}"!
                </p>
                <div className="flex flex-col gap-4">
                    <button
                        className="flex items-center justify-between text-black-300 w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-300"
                        onClick={handleCopyLink}
                    >
                        <Image src={CopyIcon} alt="Copiar link" className="w-6 h-6 mr-2" />
                        Copiar link
                    </button>
                    <button
                        className="flex items-center justify-between text-black-300 w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-300"
                        onClick={handleShareWhatsApp}
                    >
                        <Image src={WhatsAppIcon} alt="Compartilhar via WhatsApp" className="w-6 h-6 mr-2" />
                        Compartilhar via WhatsApp
                    </button>
                </div>
                <button
                    className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={onClose}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}
