import React, { useState } from 'react';
import Image from 'next/image';
import TrashIcon from '../../../../public/icons/trash_icon.svg';

interface ModalEditProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newName: string) => void;
    listName: string;
}

export default function ModalEditList({ isOpen, onClose, onSave, listName }: ModalEditProps) {
    const [name, setName] = useState('');
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

    if (!isOpen) return null;

    const handleSave = () => {
        if (name.trim()) {
            onSave(name);
            onClose();
        }
    };

    const handleDelete = () => {
        setIsConfirmDeleteOpen(true);
    };

    const confirmDelete = () => {
        console.log(`Excluindo a lista: ${listName}`);
        setIsConfirmDeleteOpen(false);
        onClose();

        // fetch(`/api/delete-list/${listName}`, { method: 'DELETE' })
        //    .then(response => response.json())
        //    .then(() => router.push('/favorites'))
        //    .catch(error => console.error('Erro ao excluir a lista:', error));

        window.location.href = 'http://localhost:3000/favorites';
    };

    const cancelDelete = () => {
        setIsConfirmDeleteOpen(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-[400px]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold mb-4 text-black-300">
                    Editar a lista "{listName}"
                </h2>
                <div className="mb-4 text-black-300">
                    <label className="block text-black-300 mb-2">Editar nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border text-black-300 p-2 w-full rounded-md"
                        placeholder="informe o novo nome da lista"
                    />
                </div>
                <div className="flex justify-center mb-4">
                    <button
                        className="px-4 py-2 bg-blue-300 text-white rounded-md"
                        onClick={handleSave}
                    >
                        Confirmar
                    </button>
                </div>
                <div className="flex items-center justify-between text-black-300">
                    <span>Excluir permanentemente esta lista de favoritos.</span>
                    <button
                        className="text-red-500 hover:text-red-700"
                        onClick={handleDelete}
                    >
                        <Image src={TrashIcon} alt="Excluir" className="w-6 h-6" />
                    </button>
                </div>

                {isConfirmDeleteOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-md w-[472px]">
                            <h2 className="text-xl font-bold mb-4 text-black-300">
                                Deseja excluir permanentemente a lista "{listName}"?
                            </h2>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={cancelDelete}
                                    className="bg-gray-300 px-4 py-2 rounded-md"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="bg-orange-500 text-white px-4 py-2 rounded-md"
                                >
                                    Sim, excluir
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
