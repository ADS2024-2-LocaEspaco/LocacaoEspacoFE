import Image from "next/image";

import AdImage from '../../assets/card.png'
import CardAd, { CardAdProps } from "./components/cardAd";
import { useState } from "react";

export default function Homepage() {
    const [ dataSectionMostReserved, setDataSectionMostReserved ] = useState<CardAdProps[]>([])

    return (
        <main className="flex flex-col gap-20 min-h-screen px-32 py-[68px]">
            {/* <Image src={Banner} alt="Banner principal de anúncio" /> */}

            <div className="space-y-6">
                <h2 className="font-title font-bold text-4xl text-black-100">Mais reservados</h2>

                <div className="flex gap-11">
                    <CardAd 
                        image={AdImage}
                        title="Varginha"
                        city="São Paulo"
                        country="Brasil"
                        rating={4}
                        value={1000}
                    />
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="font-title font-bold text-4xl text-black-100">Escolhas para você</h2>

                <div className="flex gap-11">
                    <CardAd 
                        image={AdImage}
                        title="Varginha"
                        city="São Paulo"
                        country="Brasil"
                        rating={4}
                        value={1000}
                    />
                </div>
            </div>
        </main>
    )
}
