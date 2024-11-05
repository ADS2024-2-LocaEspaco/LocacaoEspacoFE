import Image from "next/image";
import ItemComponent from "./components/itemComponent";

export default function Pesquisa( ) {

    return (
        <div className="min-h-screen bg-white">
            
            <div className="p-12">
                <div className="hidden lg:block border border-1 rounded-2xl p-4 m-8">
                    <div className="flex justify-center gap-8">
                        <button className="border border-1 rounded-2xl py-2 px-5">
                            Tipo de propriedade
                        </button>

                        <button className="border border-1 rounded-2xl p-4">
                            Faixa de preço
                        </button>

                        <button className="border border-1 rounded-2xl p-4">
                            Quantidade de comodos
                        </button>

                        <button className="border border-1 rounded-2xl p-4">
                            Comodidades
                        </button>

                        <button className="border border-1 rounded-2xl p-4">
                            Opções de reserva
                        </button>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button className="text-white font-bold bg-orange-500 rounded-3xl p-2">
                            Aplicar filtros
                        </button>
                    </div>
                </div>


                <h1 className="text-center text-3xl font-bold p-2">Resultado da busca</h1>
                <hr className="border hidden lg:block mx-8"/>

                <div className="flex flex-col gap-8 m-8">

                    <ItemComponent />

                    <ItemComponent />

                    <ItemComponent />

                </div>
            </div>
        </div>
    )
}