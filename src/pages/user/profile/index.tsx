
export default function profile() {
    return (
        
        <div className="w-screen h-screen bg-white">
            <div className="flex justify-center font-bold p-4">
                <h1 className="text-4xl">PERFIL DO USUÁRIO</h1>
            </div>

            <hr className="bg-black mr-32 ml-32 border-solid border-1 border-black" />
            
            <div className=" flex justify-center space-x-40">

                {/* Card */}
                <div className="bg-gray-100 w-96 h-80 mt-14 rounded-2xl">
                    <header className="flex justify-center p-2">
                        <h4>Informações básicas</h4>
                        <hr />
                    </header>
                    <main className="flex flex-col justify-center">

                        {/* <label htmlFor="">Nome de usuário</label>
                        <input type="text" /> */}
                    </main>
                    <footer>
                        {/* <button className="bg-orange-500 rounded">Editar</button> */}
                    </footer>
                </div>

                <div className="bg-gray-100 w-96 h-80 mt-14 rounded-2xl">
                    <header>

                    </header>
                    <main>

                    </main>
                    <footer>

                    </footer>
                </div>

            </div>
        </div>
    );
}