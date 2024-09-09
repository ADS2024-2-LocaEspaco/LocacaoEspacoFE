import { useEffect, useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation'

import AdImage from '../../assets/card.png'
import CardAd, { CardAdProps } from "./components/cardAd";

import ArrowBackIcon from '../../../public/icons/arrow_back_icon.svg'
import ArrowForwardIcon from '../../../public/icons/arrow_forward_icon.svg'

export default function Homepage() {
    const [dataSectionMostReserved, setDataSectionMostReserved] = useState<CardAdProps[]>([])
    const [totalCardsToAppearInScreen, setTotalCardsToAppearInScreen] = useState(0)

    useEffect(() => {
        setDataSectionMostReserved([
            {
                title: 'Mansão Oasis',
                city: 'Varginha',
                country: 'Brasil',
                image: AdImage,
                rating: 5,
                value: 1000
            },
            {
                title: 'Mansão Oasis',
                city: 'Varginha',
                country: 'Brasil',
                image: AdImage,
                rating: 5,
                value: 1000
            },
            {
                title: 'Mansão Oasis',
                city: 'Varginha',
                country: 'Brasil',
                image: AdImage,
                rating: 5,
                value: 1000
            },
            {
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
            const cardWidth = 292
            const screenWidth = window.innerWidth
            const cards = Math.floor(screenWidth / cardWidth)
            setTotalCardsToAppearInScreen(cards)
        };

        calculateVisibleCards()

        window.addEventListener('resize', calculateVisibleCards)

        return () => window.removeEventListener('resize', calculateVisibleCards)
    }, [])

    return (
        <main className="min-h-screen">
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: '.arrow-back-icon',
                    nextEl: '.arrow-next-icon'
                }}
                spaceBetween={120}
                slidesPerView={totalCardsToAppearInScreen}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="w-full h-96 px-10"
            >
                <button className="arrow-back-icon z-10 absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 p-2 rounded-full">
                    <Image src={ArrowBackIcon} alt="Icone de voltar" />
                </button>

                <button className="arrow-next-icon z-10 absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 p-2 rounded-full">
                    <Image src={ArrowForwardIcon} alt="Icone de próximo" />
                </button>

                {
                    dataSectionMostReserved.map((ad, index) => (
                        <SwiperSlide key={index}>
                            <CardAd
                                title={ad.title}
                                city={ad.city}
                                country={ad.country}
                                image={ad.image}
                                rating={ad.rating}
                                value={ad.value}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </main>
    )
}
