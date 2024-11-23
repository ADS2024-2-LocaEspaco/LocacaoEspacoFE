import { useState } from "react";
import ItemComponent from "./components/itemComponent";

type FiltroTipo = "propriedade" | "preco" | "comodos" | 'comodidades' | 'reserva' | 'acessibilidade' | null;

export default function Pesquisa() {
    const [quantidadeComodos, setquantidadeComodos] = useState(0);
    const [quantidadeChuveiros, setquantidadeChuveiros] = useState(0);
    const [filtroAberto, setfiltroAberto] = useState<FiltroTipo>(null);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    const toggleFiltro = (filtro: FiltroTipo) => {
        if (filtroAberto === filtro) {
            setfiltroAberto(null);
        } else {
            setfiltroAberto(filtroAberto === filtro ? null : filtro);
        }
    };

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

    // Componente do Drawer Mobile
    const MobileFilterDrawer = () => (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${mobileDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white transform transition-transform duration-300 ease-in-out ${mobileDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full overflow-y-auto">
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Filtros</h2>
                            <button
                                onClick={() => setMobileDrawerOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Tipo de propriedade */}
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-2">Tipo de propriedade</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    <div>
                                        <input type="checkbox" id="mobile-quarto" />
                                        <label htmlFor="mobile-quarto" className="ml-2">Quarto</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="mobile-terreno" />
                                        <label htmlFor="mobile-terreno" className="ml-2">Terreno</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="mobile-apartamento" />
                                        <label htmlFor="mobile-apartamento" className="ml-2">Apartamento</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="mobile-casa" />
                                        <label htmlFor="mobile-casa" className="ml-2">Casa</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="mobile-espaco_interno" />
                                        <label htmlFor="mobile-espaco_interno" className="ml-2">Espaço interno</label>
                                    </div>
                                </div>
                            </div>

                            {/* Faixa de preço */}
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-2">Faixa de preço</h3>
                                <div className="space-y-2">
                                    <div>
                                        <label className="block text-sm mb-1">Máximo</label>
                                        <input type="text" placeholder="Digite o valor" className="w-full border rounded-lg p-2" />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">Mínimo</label>
                                        <input type="text" placeholder="Digite o valor" className="w-full border rounded-lg p-2" />
                                    </div>
                                </div>
                            </div>

                            {/* Quantidade de cômodos */}
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-2">Quantidade de cômodos</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <img src="/icons/bed_icon.svg" alt="" />
                                            <span>Quartos</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="rounded-full text-blue-400 border border-blue-400 px-2" onClick={decrementarQuartidadeComodos}>-</button>
                                            <input type="number" className="w-10 text-center" value={quantidadeComodos} readOnly />
                                            <button className="rounded-full text-blue-400 border border-blue-400 px-2" onClick={incrementarQuartidadeComodos}>+</button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <img src="/icons/shower_icon.svg" alt="" />
                                            <span>Banheiros</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="rounded-full text-blue-400 border border-blue-400 px-2" onClick={decrementarQuartidadeChuveiros}>-</button>
                                            <input type="number" className="w-10 text-center" value={quantidadeChuveiros} readOnly />
                                            <button className="rounded-full text-blue-400 border border-blue-400 px-2" onClick={incrementarQuartidadeChuveiros}>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Comodidades */}
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-2">Comodidades</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" id="mobile-jardim" />
                                        <img src="/icons/outdoor_garden_icon.svg" alt="" />
                                        <label htmlFor="mobile-jardim">Jardim Amplo</label>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" id="mobile-garagem" />
                                        <img src="/icons/car_icon.svg" alt="" />
                                        <label htmlFor="mobile-garagem">Garagem</label>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" id="mobile-churrasco" />
                                        <img src="/icons/outdoor_grill_icon.svg" alt="" />
                                        <label htmlFor="mobile-churrasco">Área de churrasco</label>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" id="mobile-piscina" />
                                        <img src="/icons/pool_icon.svg" alt="" />
                                        <label htmlFor="mobile-piscina">Área de piscina</label>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" id="mobile-loucas" />
                                        <img src="/icons/restaurant_icon.svg" alt="" />
                                        <label htmlFor="mobile-loucas">Louças e Talheres</label>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" id="mobile-wifi" />
                                        <img src="/icons/wifi_icon.svg" alt="" />
                                        <label htmlFor="mobile-wifi">Wi-Fi grátis</label>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" id="mobile-ar_condicionado" />
                                        <img src="/icons/ice_icon.svg" alt="" />
                                        <label htmlFor="mobile-ar_condicionado">Ar Condicionado</label>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" id="mobile-animal" />
                                        <img src="/icons/pets_icon.svg" alt="" />
                                        <label htmlFor="mobile-animal">Permite animais</label>
                                    </div>
                                </div>
                            </div>

                            {/* Opções de reserva */}
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-2">Opções de reserva</h3>
                                <div className="space-y-2">
                                    <div>
                                        <input type="checkbox" id="mobile-reserva_instantanea" />
                                        <label htmlFor="mobile-reserva_instantanea" className="ml-2">Reserva Instantânea</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="mobile-self_checkin" />
                                        <label htmlFor="mobile-self_checkin" className="ml-2">Self Check-in</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="mobile-cancelamento_gratuito" />
                                        <label htmlFor="mobile-cancelamento_gratuito" className="ml-2">Cancelamento Gratuito</label>
                                    </div>
                                </div>
                            </div>

                            {/* Acessibilidade */}
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-2">Acessibilidade</h3>
                                <div className="space-y-2">
                                    <div>
                                        <input type="checkbox" id="mobile-cadeirantes" />
                                        <label htmlFor="mobile-cadeirantes" className="ml-2">Acessível para cadeirantes</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="mobile-banheiro_adaptado" />
                                        <label htmlFor="mobile-banheiro_adaptado" className="ml-2">Banheiro adaptado</label>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="mobile-alarmes_visuais" />
                                        <label htmlFor="mobile-alarmes_visuais" className="ml-2">Alarmes visuais</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-white p-4 border-t mt-4">
                            <button
                                onClick={() => setMobileDrawerOpen(false)}
                                className="w-full bg-orange-500 text-white font-bold rounded-3xl py-3"
                            >
                                Aplicar filtros
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            <div className="p-12">
                <div className="lg:hidden flex justify-center mb-4">
                    <button
                        onClick={() => setMobileDrawerOpen(true)}
                        className="bg-orange-500 text-white px-6 py-2 rounded-3xl font-medium flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                        </svg>
                        Filtros
                    </button>
                </div>

                <div className="hidden lg:block border border-1 rounded-2xl p-4 m-8">
                    <div className="hidden lg:block border border-1 rounded-2xl p-4 m-8">
                        <div className="flex justify-center gap-8">
                            <div className="relative">
                                <button
                                    className={`border border-1 rounded-2xl py-2 px-5 ${
                                        filtroAberto === "propriedade" ? "bg-orange-400 text-white" : ""
                                    }`}
                                    onClick={() => toggleFiltro("propriedade")}
                                >
                                    Tipo de propriedade
                                </button>

                                {filtroAberto === "propriedade" && (
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
                                <button className={`border border-1 rounded-2xl py-2 px-5 ${filtroAberto === "preco" ? "bg-orange-400 text-white" : ""}`} onClick={() => toggleFiltro("preco")}>
                                    Faixa de preço
                                </button>

                                {filtroAberto === "preco" && (
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
                                <button className={`border border-1 rounded-2xl py-2 px-5 ${ filtroAberto === "comodos" ? "bg-orange-400 text-white" : ""}`} onClick={() => toggleFiltro("comodos")}>
                                    Quantidade de comodos
                                </button>

                                {filtroAberto === "comodos" && (
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

                                <button className={`border border-1 rounded-2xl py-2 px-5 ${filtroAberto === "comodidades" ? "bg-orange-400 text-white" : ""}`} onClick={() => toggleFiltro("comodidades")}>
                                    Comodidades
                                </button>

                                {filtroAberto === "comodidades" && (
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
                                <button className={`border border-1 rounded-2xl py-2 px-5 ${filtroAberto === "reserva" ? "bg-orange-400 text-white" : ""}`} onClick={() => toggleFiltro("reserva")}>
                                    Opções de reserva
                                </button>

                                {filtroAberto === "reserva" && (
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
                                <button className={`border border-1 rounded-2xl py-2 px-5 ${filtroAberto === "acessibilidade" ? "bg-orange-400 text-white" : ""}`} onClick={() => toggleFiltro("acessibilidade")}>
                                    Acessibilidade
                                </button>

                                {filtroAberto === "acessibilidade" && (
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
                </div>
                <MobileFilterDrawer />

                <h1 className="text-center text-3xl font-bold p-2">Resultado da busca</h1>
                <hr className="border hidden lg:block mx-8" />

                <div className="flex flex-col items-center gap-2 m-4 lg:px-64">
                    <ItemComponent />
                    <ItemComponent />
                    <ItemComponent />
                    <ItemComponent />

                    <div className="flex gap-4 mt-8">
                        <button className="bg-gray-500 text-white rounded-full px-4 py-2">
                            1
                        </button>
                        <button className="bg-orange-500 text-white rounded-full px-4 py-2">
                            2
                        </button>
                        <button className="bg-gray-500 text-white rounded-full px-4 py-2">
                            3
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};