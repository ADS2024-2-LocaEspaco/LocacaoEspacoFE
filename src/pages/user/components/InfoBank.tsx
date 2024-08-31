
export default function InfoBank() {

    return (
        <div className="relative bg-gray-100 mt-14 rounded-2xl shadow-md">
            <header className="flex justify-center p-1">
                <h4 className="text-base font-bold">Dados Bancários</h4>
            </header>

            <hr className="mx-12 border-solid border-1 border-black mt-0"/>

            <main className="flex flex-col justify-center ml-20 mr-20">
                
                <label htmlFor="" className="text-base font-medium mt-4">Banco</label> 
                <input type="text" className="text-xs h-8 text-center border border-solid  border-black rounded-xl bg-gray-100 placeholder:items-center" placeholder="Banco do Brasil"/> 

                <label htmlFor="" className="mt-2">Agência</label>
                <input type="text" className="h-8 text-center border border-solid  border-black rounded-xl  bg-gray-100 placeholder:items-center" placeholder="1234-5" />
                
                <label htmlFor="" className="mt-2">Número da Conta</label>
                <input type="text" className="h-8 text-center border border-solid  border-black rounded-xl  bg-gray-100 placeholder:items-center" placeholder="56789-0"/>

            </main>

            <footer className="flex justify-end absolute bottom-0 right-0">
                <button className="bg-orange-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1">
                    Editar
                    <div className="material-symbols-outlined">
                        edit
                    </div>
                </button>
            </footer>
        </div>
    )
}