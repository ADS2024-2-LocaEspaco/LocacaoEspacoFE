import React, { useState } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { LatLngExpression } from 'leaflet';

import AnfitriaoInfos, { anfitriaoData } from '../../components/anfitriaoProps';
import Avaliacao from "../../components/avaliacao";
import Carrossel from "../../components/carrosselAnuncio";
import IconesAnuncio from "../../components/iconesAnuncio";
const MapaModal = dynamic(() => import("../../components/mapaModal"), { ssr: false });
import FeedBacksAnte from "../../components/feedback";

type AnuncioProps = {
  titulo: string;
  qtd_hospedes: number;
  qtd_camas: number;
  qtd_banheiros: number;
  id_anfitriao: string;
  imagens: string[];
  nota: number;
  qtd_avaliacoes: number;
};

const ExibirAnuncio: React.FC<AnuncioProps> = ({ titulo, qtd_hospedes, qtd_camas, qtd_banheiros, imagens, nota, qtd_avaliacoes }, anuncio) => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>({ lat: -23.5505, lng: -46.6333 });
  const openMapModal = () => setIsMapModalOpen(true);
  const closeMapModal = () => setIsMapModalOpen(false);


  return (
    <div className="bg-[#fff7f4] h-full font-josefin md:flex flex-col items-center" >
      {/* Section 1 */}
      <section className="flex justify-center flex-col mb-4">
        <div className="bg-[#faf8f8] flex flex-row justify-between p-2 pb-0 flex-wrap max-w-[1184px]">
          <h1 className="text-tituloa text-black p-0 font-bold mb-0 mt-1">
            {titulo}
          </h1>
          <Avaliacao nota={nota || 0} qtd_avaliacoes={qtd_avaliacoes} exibirNotaMedia={true} />
        </div>
        <div className="flex flex-col items-center mb-4">
          <Carrossel imagens={imagens} />
          <IconesAnuncio
            qtd_hospedes={qtd_hospedes}
            qtd_banheiros={qtd_banheiros}
            qtd_camas={qtd_camas}
            onOpenMapModal={openMapModal}
          />
        </div>
      </section>
      <MapaModal
        isOpen={isMapModalOpen}
        onClose={closeMapModal}
        latLng={mapCenter}
      />

      {/* Section 2 */}
      <section className='flex justify-center flex-col mb-4'>
        <AnfitriaoInfos quartos={qtd_avaliacoes} banheiros={qtd_banheiros} vagas={4} {...anfitriaoData} />
      </section>
      <hr className="w-full border-t border-[#3D3D43] my-2 lg:not-sr-only" />

      {/* Section 3 */}
      <section>
        <FeedBacksAnte />
      </section>
    </div>
  );
};

// Função para buscar o anúncio e avaliações
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id_anuncio } = context.query;

  try {
    const res = await fetch(`http://localhost:3000/api/anuncio/${id_anuncio}`);
    const anuncio = await res.json();
    console.log(`Anúncio encontrado: ${JSON.stringify(anuncio)}`);
    return {
      props: anuncio,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default ExibirAnuncio;
