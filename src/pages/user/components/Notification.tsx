interface NotificationProps {
    title: string;
    message: string;
    isSuccess: boolean;
}

export default function Notification({ title, message, isSuccess }: NotificationProps) {
    return (
        <div className="items-center h-96 w-96 border-2 border-black rounded-3xl">
            <header className="flex justify-center text-2xl font-bold mb-2 mt-4">
                {title}
            </header>

            <hr className="border-solid border-1 border-black mt-2 mx-5"/>

            <main className="flex flex-col items-center mb-4 mt-6">
                <div className="font-semibold">
                    {message}
                </div>
                {isSuccess ? (
                    <div className="material-symbols-outlined text-green-500 text-9xl mt-5">
                        check_circle
                    </div>
                ) : (
                    <div className="material-symbols-outlined text-red-600 text-9xl mt-5">
                        cancel
                    </div>
                )}
            </main>

            <footer className="flex justify-center">
                <button className="border border-1 border-black rounded-full py-1 px-10 font-semibold">
                    Fechar
                </button>
            </footer>
        </div>
    );
}