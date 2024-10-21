import React, { useState } from 'react';

interface ModalCreateListProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (listName: string) => void;
}

export default function ModalCreateList({ isOpen, onClose, onCreate }: ModalCreateListProps) {
    const [name, setName] = useState('');

    if (!isOpen) return null;

    const handleCreate = () => {
        if (name.trim()) {
            onCreate(name);
            onClose();
            // Integração com backend:
            // fetch(`/api/create-list`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ name }),
            // })
            //     .then(response => response.json())
            //     .then(data => console.log('Lista criada:', data))
            //     .catch(error => console.error('Erro ao criar lista:', error));
        }
    };

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {

        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={handleOutsideClick} 
        >
            <div
                className="bg-white p-6 rounded-[16px] shadow-lg w-[350px] flex flex-col"
                style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
                onClick={(e) => e.stopPropagation()} 
            >
                <h2 className="text-xl font-bold mb-4 text-blue-600 text-left">Criar nova lista</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-md mb-4 text-black-300"
                    placeholder="Nome da lista"
                />
                <div className="flex justify-center">
                    <button
                        className="w-[120px] h-[40px] bg-blue-400 text-white rounded-[16px] flex items-center justify-center"
                        onClick={handleCreate}
                        style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
                    >
                        Criar
                    </button>
                </div>
            </div>
        </div>
    );
}
