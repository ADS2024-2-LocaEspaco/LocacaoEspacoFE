import Image from "next/image";
export default function ItemComponent() {
    return (
        <div className="flex gap-4 p-4 shadow-lg">
            <div>
                <Image src="/img/house.png" alt="" width={210} height={210}/>
            </div>

            <div className="mr-44">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">Nome do local</h1>
                    <div className="">
                        estrela
                    </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">São Paulo, Brasil</p>

                <div className="flex gap-2 mb-2">
                    <div className="flex bg-orange-200 rounded-lg px-2">
                        <img src="/icons/group_icon.svg" alt="" className=""/>
                        <p>2</p>
                    </div>

                    <div className="flex bg-orange-200 rounded-lg px-2">
                        <img src="/icons/bed_icon.svg" alt="" />
                        <p>2</p>
                    </div>

                    <div className="flex bg-orange-200 rounded-lg px-2">
                        <img src="/icons/shower_icon.svg" alt="" />
                        <p>2</p>
                    </div>
                </div>

                <hr className="border "/>

                <div className="flex gap-2 mt-4">
                    <img src="/icons/outdoor_garden_icon.svg" alt="" />
                    <img src="/icons/wifi_icon.svg" alt="" />
                    <img src="/icons/restaurant_icon.svg" alt="" />
                    <img src="/icons/pool_icon.svg" alt="" />
                    <img src="/icons/pets_icon.svg" alt="" />
                    <img src="/icons/ice_icon.svg" alt="" />
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 border-l border-black p-4">
                <h2 className="text-lg font-bold text-gray-500">Diaria</h2>

                <h3 className="text-2xl font-bold">R$ 1.000</h3>

                <button className="text-white font-bold bg-orange-500 rounded-2xl p-2 mt-6 shadow-md">
                    Ver detalhes
                </button>
            </div>

        </div>
    );
}