import { useEffect, useState } from "react";

import AdImage from '../../assets/card.png'
import { CardAdProps } from "./components/cardAd";
import SliderCarousel from "./components/sliderCarousel";

export default function Homepage() {
    const [dataSectionMostReserved, setDataSectionMostReserved] = useState<CardAdProps[]>([])
    const [totalCardsToAppearInScreen, setTotalCardsToAppearInScreen] = useState(0)

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
    }, [])

    useEffect(() => {
        const calculateVisibleCards = () => {
            const cardWidth = 300
            const screenWidth = window.innerWidth - 256
            const cards = Math.floor(screenWidth / cardWidth)
            setTotalCardsToAppearInScreen(cards)
        }

        calculateVisibleCards()

        window.addEventListener('resize', calculateVisibleCards)

        return () => window.removeEventListener('resize', calculateVisibleCards)
    }, [])

    return (
        <main className="min-h-screen space-y-20 px-32 py-[68px] ">
            <section className="space-y-9">
                <h1 className="font-title text-4xl font-bold text-black-100">Mais reservados</h1>

                <SliderCarousel totalCardsToAppearInScreen={totalCardsToAppearInScreen} dataSectionMostReserved={dataSectionMostReserved}/>
            </section>

            <section className="space-y-9">
                <h1 className="font-title text-4xl font-bold text-black-100">Escolhas para você</h1>

                <SliderCarousel totalCardsToAppearInScreen={totalCardsToAppearInScreen} dataSectionMostReserved={dataSectionMostReserved}/>
            </section>
        </main>
    )
}
