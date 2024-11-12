    import { useState } from "react";
    import ItemComponent from "./components/itemComponent";

    export default function Pesquisa() {
        const [filtroPropriedade, setfiltroPropriedade] = useState(false);
        const [filtroPrecoe, setfiltroPrecoe] = useState(false);
        const [filtroComodos, setfiltroComodos] = useState(false);
        const [filtroComodidades, setfiltroComodidades] = useState(false);
        const [filtroReserva, setfiltroReserva] = useState(false);
        const [filtroAcessibilidade, setfiltroAcessibilidade] = useState(false);

        const [quantidadeComodos, setquantidadeComodos] = useState(0);
        const [quantidadeChuveiros, setquantidadeChuveiros] = useState(0);

        const incrementarQuartidadeComodos = () => {
            setquantidadeComodos(quantidadeComodos + 1);
        };

        const decrementarQuartidadeComodos = () => {
            if (quantidadeComodos > 0) {
                setquantidadeComodos(quantidadeComodos - 1);
            }
        };

        const incrementarQuartidadeChuveiros = () => {
            setquantidadeChuveiros(quantidadeChuveiros + 1);
        };

        const decrementarQuartidadeChuveiros = () => {
            if (quantidadeChuveiros > 0) {
                setquantidadeChuveiros(quantidadeChuveiros - 1);
            }
        };

        const openFiltro1 = () => {
            setfiltroPropriedade(!filtroPropriedade);
        };

        const openFiltro2 = () => {
            setfiltroPrecoe(!filtroPrecoe);
        };

        const openFiltro3 = () => {
            setfiltroComodos(!filtroComodos);
        };

        const openFiltro4 = () => {
            setfiltroComodidades(!filtroComodidades);
        };

        const openFiltro5 = () => {
            setfiltroReserva(!filtroReserva);
        };

        const openFiltro6 = () => {
            setfiltroAcessibilidade(!filtroAcessibilidade);
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
                                    onClick={openFiltro1}
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

                            <div className="relative">
                                <button className={`border border-1 rounded-2xl py-2 px-5 ${filtroPrecoe ? "bg-orange-400 text-white" : ""}`} onClick={openFiltro2}>
                                    Faixa de preço
                                </button>

                                {filtroPrecoe && (
                                    <div className="absolute top-10 p-4 border rounded-xl bg-gray-50 shadow-lg w-64 z-10">

                                        <div className="flex flex-col gap-2 items-center text-center">
                                            <label htmlFor="" className="font-medium">Máximo</label>
                                            <input type="text" placeholder="Digite o valor" className="border border-1 border-black rounded-lg text-center w-44"/>

                                            <label htmlFor="" className="font-medium">Minimo</label>
                                            <input type="text" placeholder="Digite o valor" className="border border-1 border-black rounded-lg text-center w-44"/>
                                        </div>


                                        <div className="flex justify-center mt-4">
                                            <button className="text-white bg-orange-500 rounded-3xl p-1">
                                                Limpar filtros
                                            </button>
                                        </div>

                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <button className={`border border-1 rounded-2xl py-2 px-5 ${filtroComodos ? "bg-orange-400 text-white" : ""}`} onClick={openFiltro3}>
                                    Quantidade de comodos
                                </button>

                                {filtroComodos && (
                                    <div className="absolute top-10 p-4 border rounded-xl bg-gray-50 shadow-lg w-64 z-10">
                                        <div className="grid grid-cols-2 gap-2 justify-center items-center">
                                            <div className="col-span-2">
                                                <div className="flex items-center gap-2">
                                                    <img src="/icons/bed_icon.svg" alt="" />
                                                    <p className="mr-3">Quartos</p>
                                                    <button className="rounded-full text-blue-400 border border-blue-400 px-2" onClick={incrementarQuartidadeComodos}>+</button>
                                                    <input type="number" className="w-10 text-center" value={quantidadeComodos} readOnly />
                                                    <button className="rounded-full text-blue-400 border border-blue-400 px-2" onClick={decrementarQuartidadeComodos}>-</button>
                                                </div>
                                            </div>

                                            <div className="col-span-2">
                                                <div className="flex items-center gap-2">
                                                    <img src="/icons/shower_icon.svg" alt="" />
                                                    <p>Banheiros</p>
                                                    <button className="rounded-full text-blue-400 border border-blue-400 px-2" onClick={incrementarQuartidadeChuveiros}>+</button>
                                                    <input type="number" className="w-10 text-center" value={quantidadeChuveiros} readOnly />
                                                    <button className="rounded-full text-blue-400 border border-blue-400 px-2" onClick={decrementarQuartidadeChuveiros}>-</button>
                                                </div>
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

                            <div className="relative">

                                <button className={`border border-1 rounded-2xl py-2 px-5 ${filtroComodidades ? "bg-orange-400 text-white" : ""}`} onClick={openFiltro4}>
                                    Comodidades
                                </button>

                                {filtroComodidades && (
                                    <div className="absolute top-10 p-4 border rounded-xl bg-gray-50 shadow-lg w-96 z-10">
                                        <div className="flex gap-2">
                                            <div className="gap-2">
                                                <div className="flex gap-2">
                                                    <input type="checkbox" id="jardim" />
                                                    <img src="/icons/outdoor_garden_icon.svg" alt="" />
                                                    <label htmlFor="jardim" className="">Jardim Amplo</label>
                                                </div>

                                                <div className="flex gap-2">
                                                    <input type="checkbox" id="garagem" />
                                                    <img src="/icons/car_icon.svg" alt="" />
                                                    <label htmlFor="garagem" className="">Garagem</label>
                                                </div>

                                                <div className="flex gap-2">
                                                    <input type="checkbox" id="churrasco" />
                                                    <img src="/icons/outdoor_grill_icon.svg" alt="" />
                                                    <label htmlFor="churrasco" className="">Area de churrasco</label>
                                                </div>

                                                <div className="flex gap-2">
                                                    <input type="checkbox" id="piscina" />
                                                    <img src="/icons/pool_icon.svg" alt="" />
                                                    <label htmlFor="piscina" className="">Area de piscina</label>
                                                </div>
                                            </div>

                                            <div className="gap-2">
                                                <div className="flex gap-2">
                                                    <input type="checkbox" id="loucas" />
                                                    <img src="/icons/restaurant_icon.svg" alt="" />
                                                    <label htmlFor="loucas" className="">Louças e Talheres</label>
                                                </div>

                                                <div className="flex gap-2">
                                                    <input type="checkbox" id="wifi" />
                                                    <img src="/icons/wifi_icon.svg" alt="" />
                                                    <label htmlFor="wifi" className="">Wi-Fi grátis</label>
                                                </div>

                                                <div className="flex gap-2">
                                                    <input type="checkbox" id="ar_condicionado" />
                                                    <img src="/icons/ice_icon.svg" alt="" />
                                                    <label htmlFor="ar_condicionado" className="">Ar Condicionado</label>
                                                </div>

                                                <div className="flex gap-2">
                                                    <input type="checkbox" id="animal" />
                                                    <img src="/icons/pets_icon.svg" alt="" />
                                                    <label htmlFor="animal" className="">Permite animais</label>
                                                </div>
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

                            <div className="relative">
                                <button className={`border border-1 rounded-2xl py-2 px-5 ${filtroReserva ? "bg-orange-400 text-white" : ""}`} onClick={openFiltro5}>
                                    Opções de reserva
                                </button>

                                {filtroReserva && (
                                    <div className="absolute top-10 p-4 border rounded-xl bg-gray-50 shadow-lg w-56 z-10">
                                        <div className="">
                                            <div className="">
                                                <input type="checkbox" id="reserva_instantanea" />
                                                <label htmlFor="reserva_instantanea" className="ml-2">Reserva Instantanea</label>
                                            </div>

                                            <div className="">
                                                <input type="checkbox" id="self_checkin" />
                                                <label htmlFor="self_checkin" className="ml-2">Self Check-in</label>
                                            </div>

                                            <div className="">
                                                <input type="checkbox" id="cancelamento_gratuito" />
                                                <label htmlFor="cancelamento_gratuito" className="ml-2">Cancelamento Gratuito</label>
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

                            <div className="relative">
                                <button className={`border border-1 rounded-2xl py-2 px-5 ${filtroAcessibilidade ? "bg-orange-400 text-white" : ""}`} onClick={openFiltro6}>
                                    Acessibilidade
                                </button>

                                {filtroAcessibilidade && (
                                    <div className="absolute top-10 p-4 border rounded-xl bg-gray-50 shadow-lg w-60 z-10">
                                        <div className="">
                                            <div className="">
                                                <input type="checkbox" id="cadeirantes" />
                                                <label htmlFor="cadeirantes" className="ml-2">Acessível para cadeirantes</label>
                                            </div>

                                            <div className="">
                                                <input type="checkbox" id="banheiro_adaptado" />
                                                <label htmlFor="banheiro_adaptado" className="ml-2">Banheiro adaptado</label>
                                            </div>

                                            <div className="">
                                                <input type="checkbox" id="alarmes_visuais" />
                                                <label htmlFor="alarmes_visuais" className="ml-2">Alarmes visuais</label>
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
                        <ItemComponent />


                    </div>
                </div>
            </div>
        );
    }
