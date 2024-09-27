import { useEffect, useState } from "react";

import { CardAdProps } from "./components/cardAd";
import SliderCarousel from "./components/sliderCarousel";
import BannerCarousel from './components/bannerCarousel'; 
import AdImage from '../../assets/card.png'; // Imagem do anúncio
import { GetServerSideProps } from "next/types";

type AnuncioProps = {
    titulo: string;
    imagens: string[];
    endereco: {
      pais: string;
      uf: string;
    };
  };

export default function Homepage({ melhoresAvaliados }: { melhoresAvaliados: AnuncioProps[] }) {
    const [dataSectionMostReserved, setDataSectionMostReserved] = useState<CardAdProps[]>([]);
    const [dataSectionChoicesForYou, setDataSectionChoicesForYou] = useState<CardAdProps[]>([]);
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
  }, []);
return (
  <main className="min-h-screen space-y-20 px-32 py-[68px] ">
                <div><BannerCarousel anuncios={melhoresAvaliados} /></div>
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

// Função para buscar o anúncio e avaliações
export const getServerSideProps: GetServerSideProps = async (context) => {  
    try {
      const res = await fetch(`http://localhost:3000/api/homepage/homeService`);
      const melhoresAvaliados = await res.json();
      console.log(`Melhores avaliados encontrado: ${JSON.stringify(melhoresAvaliados)}`);
      return {
        props: melhoresAvaliados,
      };
    } catch (error) {
      return {
        notFound: true,
      };
    }
  };
  
