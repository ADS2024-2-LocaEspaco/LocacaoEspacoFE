import Image from "next/image";
import RatingComponent from "./RatingComponent";
export default function ItemComponent() {
    return (
        <div className="flex flex-col lg:flex-row gap-4 p-4 shadow-lg lg:p-6">
            <Image src="/img/house.png" alt="" width={180} height={180} className="w-full lg:w-auto" />

            <div className="flex flex-col flex-grow mr-0 lg:mr-44 text-sm lg:text-base">
                <div className="flex items-center gap-2">
                    <h1 className="text-lg lg:text-2xl font-bold">Nome do local</h1>
                    <RatingComponent rating={4} maxRating={5} />
                </div>
                <p className="text-xs lg:text-sm text-gray-500 mb-2">São Paulo, Brasil</p>

                <div className="flex gap-2 mb-2">
                    <div className="flex items-center bg-orange-200 rounded-lg px-2 py-1">
                        <img src="/icons/group_icon.svg" alt="" className="w-4 h-4 lg:w-5 lg:h-5" />
                        <p className="ml-1">2</p>
                    </div>
                    <div className="flex items-center bg-orange-200 rounded-lg px-2 py-1">
                        <img src="/icons/bed_icon.svg" alt="" className="w-4 h-4 lg:w-5 lg:h-5" />
                        <p className="ml-1">2</p>
                    </div>
                    <div className="flex items-center bg-orange-200 rounded-lg px-2 py-1">
                        <img src="/icons/shower_icon.svg" alt="" className="w-4 h-4 lg:w-5 lg:h-5" />
                        <p className="ml-1">2</p>
                    </div>
                </div>

                <hr className="border" />

                <div className="flex gap-2 mt-4 flex-wrap">
                    <img src="/icons/outdoor_garden_icon.svg" alt="" className="w-5 h-5 lg:w-6 lg:h-6" />
                    <img src="/icons/wifi_icon.svg" alt="" className="w-5 h-5 lg:w-6 lg:h-6" />
                    <img src="/icons/restaurant_icon.svg" alt="" className="w-5 h-5 lg:w-6 lg:h-6" />
                    <img src="/icons/pool_icon.svg" alt="" className="w-5 h-5 lg:w-6 lg:h-6" />
                    <img src="/icons/pets_icon.svg" alt="" className="w-5 h-5 lg:w-6 lg:h-6" />
                    <img src="/icons/ice_icon.svg" alt="" className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 border-t lg:border-t-0 lg:border-l border-gray-300 p-4">
                <h2 className="text-sm lg:text-lg font-bold text-gray-500">Diária</h2>
                <h3 className="text-lg lg:text-2xl font-bold">R$ 1.000</h3>
                <button className="text-white font-bold bg-orange-500 rounded-2xl px-3 py-2 lg:px-4 lg:py-2 mt-4 shadow-md">
                    Ver detalhes
                </button>
            </div>
    </div>

    );
}