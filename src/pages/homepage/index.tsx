import { useEffect, useState } from "react";

import { CardAdProps } from "./components/cardAd";
import SliderCarousel from "./components/sliderCarousel";

import AdImage from '../../assets/card.png'

export default function Homepage() {
    const [dataSectionMostReserved, setDataSectionMostReserved] = useState<CardAdProps[]>([])
    const [dataSectionChoicesForYou, setDataSectionChoicesForYou] = useState<CardAdProps[]>([])

    useEffect(() => {
        setDataSectionMostReserved([
            {   
                id: 1,
                title: 'Mansão Oasis',
                city: 'Varginha',
                country: 'Brasil',
                image: AdImage,
                rating: 5,
                value: 1000
            },
            {
                id: 2,
                title: 'Mansão Oasis',
                city: 'Varginha',
                country: 'Brasil',
                image: AdImage,
                rating: 5,
                value: 1000
            },
            {
                id: 1,
                title: 'Mansão Oasis',
                city: 'Varginha',
                country: 'Brasil',
                image: AdImage,
                rating: 5,
                value: 1000
            },
            {
                id: 1,
                title: 'Mansão Oasis',
                city: 'Varginha',
                country: 'Brasil',
                image: AdImage,
                rating: 5,
                value: 1000
            },
            {
                id: 1,
                title: 'Mansão Oasis',
                city: 'Varginha',
                country: 'Brasil',
                image: AdImage,
                rating: 5,
                value: 1000
            },
            {
                id: 1,
                title: 'Mansão Oasis',
                city: 'Varginha',
                country: 'Brasil',
                image: AdImage,
                rating: 5,
                value: 1000
            },
        ])

        setDataSectionChoicesForYou([
            {
                id: 1,
                title: 'Mansão Oasis',
                city: 'Varginha',
                country: 'Brasil',
                image: AdImage,
                rating: 5,
                value: 1000
            },
            {
                id: 1,
                title: 'Mansão Oasis',
                city: 'Varginha',
                country: 'Brasil',
                image: AdImage,
                rating: 5,
                value: 1000
            },
        ])
    }, [])

    return (
        <main className="min-h-screen space-y-20 px-32 py-[68px] ">
            <section className="space-y-9 z-0">
                <h1 className="font-title text-4xl font-bold text-black-100">Mais reservados</h1>

                <SliderCarousel id={'mostReserved'} dataSectionMostReserved={dataSectionMostReserved}/>
            </section>

            <section className="space-y-9">
                <h1 className="font-title text-4xl font-bold text-black-100">Escolhas para você</h1>

                <SliderCarousel id={'choices'} dataSectionMostReserved={dataSectionChoicesForYou}/>
            </section>
        </main>
    )
}