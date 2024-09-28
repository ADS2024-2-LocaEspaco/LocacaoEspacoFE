import { useRef } from 'react';
import Image from 'next/image';

import { Swiper, SwiperClass, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation'

import CardAd, { CardAdProps } from './cardAd';

import ArrowBackIcon from '../../../../public/icons/arrow_back_icon.svg'
import ArrowForwardIcon from '../../../../public/icons/arrow_forward_icon.svg'

interface SliderCarouselProps {
    id: string
    dataSectionMostReserved: CardAdProps[]
}

export default function SliderCarousel({ id, dataSectionMostReserved }: SliderCarouselProps) {
    return (
        <div className="relative">
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: `.arrow-back-icon-${id}`,
                    nextEl: `.arrow-next-icon-${id}`
                }}
                spaceBetween={32}
                slidesPerView={'auto'}
            >

                {
                    dataSectionMostReserved.map((ad, index) => (
                        <SwiperSlide key={index} style={{ width: '260px' }}>
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

            <button className={`arrow-back-icon-${id} disabled:opacity-70 z-10 absolute left-[-16px] top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg`}>
                <Image src={ArrowBackIcon} alt="Icone de voltar" />
            </button>

            <button className={`arrow-next-icon-${id} disabled:opacity-70 z-10 absolute right-[-16px] top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg`}>
                <Image src={ArrowForwardIcon} alt="Icone de próximo" />
            </button>
        </div>
    )
}