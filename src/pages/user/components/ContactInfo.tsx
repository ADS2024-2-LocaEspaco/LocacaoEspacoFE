
export default function ContactInfo() {

    return (
        <div className="mt-14 rounded-2xl shadow-md">
            <header className="flex justify-center p-1">
                <h4 className="text-base font-bold">Informações de contato</h4>
            </header>

            <hr className="mx-12 border-solid border-1 border-black mt-0"/>

            <main className="flex flex-col justify-center items-center ml-20 mr-20">
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="text-base font-medium mr-4">Telefone</label> 
                    <input type="text" className="text-xs h-8 w-48 text-center border border-solid  border-black rounded-xl mt-4 bg-gray-100 placeholder:items-center" placeholder="(41) 98765-4321"/> 
                </div>
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="mr-7 font-medium">Estado</label>
                    <input type="text" className="h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="Paraná " />
                </div>
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="mr-7 font-medium">Cidade</label>
                    <input type="text" className="h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="Curitiba" />
                </div>
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="mr-7 font-medium">Endereço</label>
                    <input type="text" className="mr-3 h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="Rua XV de Novembro, 1050, Sala 12"/>
                </div>
                
                <div className="flex items-center mb-1">
                    <label htmlFor="" className="flex text-center mr-4 font-medium">CEP</label>
                    <input type="text" className="ml-7 h-8 w-48 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="80020-310"/>
                </div>
                
            </main>

            <footer className="flex justify-end">
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