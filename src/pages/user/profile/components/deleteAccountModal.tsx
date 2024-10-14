import React from 'react';

interface DeleteAccountModalProps {
    title: string;
    message: string;
    onClose: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ title, message, onClose }) => {

    const handleConfirmDelete = () => {
        // Lógica para exclusão da conta
        console.log("Conta excluída com sucesso!");
        onClose();
    };

    return (
        // Modal para exclusão da conta
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
                <button 
                    className="absolute top-2 right-2 text-black font-bold text-2xl focus:outline-none" 
                    onClick={onClose}
                >
                    &times;
                </button>

                <header className="text-center mb-4">
                    <h1 className="text-lg font-bold">{title}</h1>
                    <hr className="border-t border-black mt-2" />
                </header>

                <main className="flex flex-col items-center mb-4 mt-4 font-medium">
                    <p className="text-sm text-center mb-4">{message}</p>
                    <input 
                        type="text" 
                        className="h-11 w-64 text-center border border-black rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </main>
                <footer className="flex justify-center mb-2">
                    <button 
                        onClick={handleConfirmDelete} 
                        className="bg-blue-500 rounded-2xl px-12 py-1 text-white"
                    >
                        Enviar
                    </button>
                </footer>
            </div>
        </div>
    );
};