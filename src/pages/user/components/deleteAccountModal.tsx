import React from 'react';

interface DeleteAccountModalProps {
    title: string;
    message: string;
    onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ title, message, onClose }) => {

    const handleConfirmDelete = () => {
        //exclusão 
        console.log("Conta excluída com sucesso!");
        onClose();
    };

    return (
        // card modal para exclusão da conta 
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-96">
                <button 
                    className="absolute top-2 right-2 text-black font-bold text-2xl" 
                    onClick={onClose}
                >
                    &times;
                </button>

                <header className="text-center ">
                    <h1 className="text-lg font-bold">{title}</h1>
                    <hr className="border-solid border-1 border-black" />
                </header>

                <main className="flex flex-col items-center mb-4 mt-8 font-medium m-8">
                    <p className="text-sm text-center mb-4">{message}</p>
                    <input 
                        type="text" 
                        className=" h-8 w-64 text-center border border-solid border-black rounded-xl bg-white mb-4 mt-2 h-11"
                    />
                </main>

                <footer className="flex justify-center mb-2">
                    <button 
                        onClick={handleConfirmDelete} 
                        className="bg-blue-500 rounded rounded-2xl px-12 py-1 text-white"
                    >
                        Enviar
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
