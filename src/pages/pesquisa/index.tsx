    import { useState } from "react";
    import ItemComponent from "./components/itemComponent";

    export default function Pesquisa() {
        const [filtroPropriedade, setfiltroPropriedade] = useState(false);

        const openFiltro = () => {
            console.log("Abrir filtro");
            setfiltroPropriedade(!filtroPropriedade);
        };

        return (
            <div className="min-h-screen bg-white">
                <div className="p-12">
                    <div className="hidden lg:block border border-1 rounded-2xl p-4 m-8">
                        <div className="flex justify-center gap-8">

                        <div className="relative">
                            <button
                                className={`border border-1 rounded-2xl py-2 px-5 ${
                                    filtroPropriedade ? "bg-orange-400 text-white" : ""
                                }`}
                                onClick={openFiltro}
                            >
                                Tipo de propriedade
                            </button>

                            {filtroPropriedade && (
                                <div className="absolute top-10 p-4 border rounded-xl bg-gray-50 shadow-lg w-64 z-10">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <input type="checkbox" id="quarto" />
                                            <label htmlFor="quarto" className="ml-1">Quarto</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="terreno" />
                                            <label htmlFor="terreno" className="ml-1">Terreno</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="apartamento" />
                                            <label htmlFor="apartamento" className="">Apartamento</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="casa" />
                                            <label htmlFor="casa" className="ml-1">Casa</label>
                                        </div>
                                        <div className="col-span-2">
                                            <input type="checkbox" id="espaco_interno" />
                                            <label htmlFor="espaco_interno" className="ml-1">Espaço interno</label>
                                        </div>
                                    </div>

                                    <div className="flex justify-center mt-4">
                                        <button className="text-white bg-orange-500 rounded-3xl p-1">
                                            Limpar filtros
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>


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
                    <hr className="border hidden lg:block mx-8" />

                    <div className="flex flex-col items-center gap-2 m-4">
                        <ItemComponent />
                        <ItemComponent />
                        <ItemComponent />
                    </div>
                </div>
            </div>
        );
    }
