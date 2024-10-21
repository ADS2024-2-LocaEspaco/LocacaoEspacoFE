import React from 'react';

interface ModalUnfavoriteProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    adTitle: string;
    listName: string;
}

const ModalUnfavorite: React.FC<ModalUnfavoriteProps> = ({ isOpen, onClose, onConfirm, adTitle, listName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[380px] h-[170px] shadow-md p-6 rounded-md text-center">
                <h2 className="text-xl text-black-300 font-bold mb-4">
                    Deseja retirar o anúncio "{adTitle}" da lista "{listName}"?
                </h2>
                <div className="flex justify-around mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 px-4 py-2 rounded-md">
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md">
                        Sim, retirar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalUnfavorite;
