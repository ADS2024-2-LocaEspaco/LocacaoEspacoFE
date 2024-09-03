
export default function AcountDetails() {
    return(
        <div className="flex flex-col  mt-14 rounded-2xl shadow-md">
            <header className="flex justify-center p-1">
                <h4 className="text-base font-bold">Dados da conta</h4>
            </header>

            <hr className="mx-12 border-solid border-1 border-black mt-0"/>

            <main className="flex flex-col justify-center ml-20 mr-20">
                
                <label htmlFor="" className="text-base font-medium mt-4">Nome completo</label> 
                <input type="text" className="text-xs h-8 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="Lucas Santos Pereira Nascimento "/> 

                <label htmlFor="">Email</label>
                <input type="text" className="h-8 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="LucasSantos@gmail.com" />
                
                <label htmlFor="">CPF</label>
                <input type="text" className="h-8 text-center border border-solid  border-black rounded-xl mt-2 bg-gray-100 placeholder:items-center" placeholder="063.821.759-86"/>

            </main>

            <footer className="flex justify-end ">
                <button className="bg-orange-500 rounded text-white flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1">
                    Editar
                    <div className="material-symbols-outlined">
                        edit
                    </div>
                </button>
            </footer>
        </div>
    );
}