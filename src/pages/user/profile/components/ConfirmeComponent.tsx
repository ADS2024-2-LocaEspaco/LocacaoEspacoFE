export default function ConfirmeComponent(){
    return (
        <div className="relative flex flex-col bg-gray-100 w-80 rounded-3xl p-4 dark:bg-gray-500 dark:text-white">
            <div className="flex justify-center items-center gap-4 font-bold text-xl">
                <div className="flex flex-col ">
                    <h1>Confirmação</h1>
                    <h2>Necessária</h2>
                </div>
                <button className="absolute top-4 right-8 text-lg font-bold mt-2 p-2">
                    x
                </button>
            </div>

            <hr className="bg-black border-solid border-1 border-black dark:border-white mx-4 my-2" />

            <p className="flex justify-center px-8 py-4 font-bold text-center">
                Para a alteração do nome completo e/ou CPF é necessário o envio de um documento oficial para a verificação da alteração.
            </p>

            <button className="flex justify-center bg-orange-500 mx-8 rounded-lg text-white font-bold p-2 shadow-lg mb-1">
                Selecionar Arquivo
                <span className="material-symbols-outlined">
                    file_export
                </span>
            </button>
            <span className="text-red-500 font-medium flex justify-center">Selecione um arquivo antes de enviar</span>

            <div className="flex justify-center p-4">
                <button className="w-40 h-10 font-medium border border-1 border-black rounded-xl">
                    Enviar
                </button>
            </div>
        </div>

    );
}