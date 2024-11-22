import Image from "next/image";
import RatingComponent from "./RatingComponent";

export default function ItemComponent() {
    return (
        <div className="flex flex-col lg:flex-row lg:items-start gap-4 p-4 shadow-lg lg:p-6 flex-wrap w-full">
            {/* Imagem do local */}
            <Image
                src="/img/house.png"
                alt="Casa"
                width={260}
                height={225}
                className="w-full lg:w-auto object-cover rounded-lg"
            />

            {/* Informações do local */}
            <div className="flex flex-col flex-grow text-sm lg:text-base">
                <div className="flex items-center gap-2">
                    <h1 className="text-lg lg:text-2xl font-bold">Nome do local</h1>
                    <RatingComponent rating={4} maxRating={5} />
                </div>
                <p className="text-xs lg:text-sm text-gray-500 mb-2">São Paulo, Brasil</p>

                {/* Características principais */}
                <div className="flex flex-wrap gap-2 mb-2">
                    {["group_icon", "bed_icon", "shower_icon"].map((icon, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-orange-200 rounded-lg px-2 py-1"
                        >
                            <img
                                src={`/icons/${icon}.svg`}
                                alt={icon}
                                className="w-4 h-4 lg:w-5 lg:h-5"
                            />
                            <p className="ml-1">2</p>
                        </div>
                    ))}
                </div>

                <hr className="border" />

                {/* Serviços disponíveis */}
                <div className="flex gap-2 mt-4 flex-wrap">
                    {[
                        "outdoor_garden_icon",
                        "wifi_icon",
                        "restaurant_icon",
                        "pool_icon",
                        "pets_icon",
                        "ice_icon",
                    ].map((icon, index) => (
                        <img
                            key={index}
                            src={`/icons/${icon}.svg`}
                            alt={icon}
                            className="w-5 h-5 lg:w-6 lg:h-6"
                        />
                    ))}
                </div>
            </div>

            {/* Informações de preço e botão */}
            <div className="flex flex-col items-center justify-center gap-2 border-t lg:border-t-0 lg:border-l border-gray-300 p-4 lg:p-6">
                <h2 className="text-sm lg:text-lg font-bold text-gray-500">Diária</h2>
                <h3 className="text-lg lg:text-2xl font-bold">R$ 1.000</h3>
                <button className="text-white font-bold bg-orange-500 rounded-2xl px-4 py-2 mt-4 shadow-md hover:bg-orange-600">
                    Ver detalhes
                </button>
            </div>
        </div>
    );
}
