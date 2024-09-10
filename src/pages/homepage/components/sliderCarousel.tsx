import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation'

import CardAd, { CardAdProps } from './cardAd';

import ArrowBackIcon from '../../../../public/icons/arrow_back_icon.svg'
import ArrowForwardIcon from '../../../../public/icons/arrow_forward_icon.svg'

interface SliderCarouselProps {
    totalCardsToAppearInScreen: number
    dataSectionMostReserved: CardAdProps[]
}

export default function SliderCarousel({ totalCardsToAppearInScreen, dataSectionMostReserved }: SliderCarouselProps) {
    return (
        <div className="relative">
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: '.arrow-back-icon',
                    nextEl: '.arrow-next-icon'
                }}
                // spaceBetween={44}
                slidesPerView={totalCardsToAppearInScreen}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >

                {
                    dataSectionMostReserved.map((ad, index) => (
                        <SwiperSlide key={index}>
                            <CardAd
                                id={ad.id}
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

            <button className="arrow-back-icon disabled:opacity-90 z-10 absolute left-[-16px] top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg">
                <Image src={ArrowBackIcon} alt="Icone de voltar" />
            </button>

            <button className="arrow-next-icon disabled:opacity-90 z-10 absolute right-[-16px] top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg">
                <Image src={ArrowForwardIcon} alt="Icone de próximo" />
            </button>
        </div>
    )
}