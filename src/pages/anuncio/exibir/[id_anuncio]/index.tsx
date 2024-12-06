import React, { useState } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";

import {LatLngExpression } from "@/types/types";
import { Anuncio as AnuncioType, Comentario as comentarioType } from "@/types/types2";

import AnfitriaoInfos from '../../components/anfitriaoProps';
import Avaliacao from "../../components/avaliacao";
import Carrossel from "../../components/carrosselAnuncio";
import IconesAnuncio from "../../components/iconesAnuncio";
import FavoritosModal from "../../components/favoritosModal";  // Modal de favoritos adicionado
import CompartilharModal from "../../components/compartilharModal";
import FeedBacksAnte from "../../components/feedback";

interface Props {
  anuncio: AnuncioType;
}

const MapaModal = dynamic(() => import("../../components/mapaModal"), { ssr: false });

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  try {
    const { id_anuncio } = context.query;
    const response = await fetch(`http://localhost:3000/anuncio/${id_anuncio}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
    });
    
   if (!response.ok) {
    return { notFound: true};
   }

   const anuncio = await response.json();

  return { 
    props: {
      anuncio,
    },
  };

  } catch (error) {
    console.error('Erro ao buscar dados do anúncio: ', error);
    return { notFound: true };
  }
};

const ExibirAnuncio: React.FC<Props> = ({ anuncio }) => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isFavModalOpen, setIsFavModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [mapCenter, setMapCenter] = useState<LatLngExpression>({ lat: -23.6250, lng: -45.4000 });

  // Funções para abrir e fechar as modais
  const openMapModal = () => setIsMapModalOpen(true); // Função para abrir modal de mapa
  const closeMapModal = () => setIsMapModalOpen(false); // Função para fechar modal de mapa

  const openFavoritosModal = () => setIsFavModalOpen(true);  // Função para abrir modal de favoritos
  const closeFavoritosModal = () => setIsFavModalOpen(false);  // Função para fechar modal de favoritos

  const openShareModal = () => setIsShareModalOpen(true);  // Função para abrir modal de compartilhar
  const closeShareModal = () => setIsShareModalOpen(false);  // Função para fechar modal de compartilhar


  console.log(anuncio);

  return (
    <div className="bg-[#fff7f4] h-full font-josefin md:flex flex-col items-center" >
      {/* Section 1 */}
      <section className="flex justify-center flex-col mb-4">
        <div className="bg-[#faf8f8] flex flex-row justify-between p-2 pb-0 flex-wrap max-w-[1184px]">
          <h1 className="text-tituloa text-black-300 p-0 font-bold mb-0 mt-1">
            {anuncio.titulo}
          </h1>
          <Avaliacao anuncioId={anuncio.id} />
        </div>
        <div className="flex flex-col items-center mb-4">
          {/* <Carrossel imagens={anuncio} /> */}
          <IconesAnuncio
            quant_hospedes={anuncio.hospedes}
            quant_banheiros={anuncio.banheiros}
            quant_camas={anuncio.quartos}
            onOpenMapModal={openMapModal}
            onOpenFavoritosModal={openFavoritosModal}
            onOpenShareModal={openShareModal}
          />
        </div>
      </section>

      {/* Modal de mapa */}
      {/* <MapaModal
        isOpen={isMapModalOpen}
        onClose={closeMapModal}
        latLng={mapCenter}
        endereco={anuncio.endereco }
      /> */}

      {/* Modal de favoritos */}
      {/* <FavoritosModal
        isOpen={isFavModalOpen}
        onClose={closeFavoritosModal}
        currentFavorite={{ id: '1', name: titulo, icon: imagens[0] }}  // Favorito atual
        userId="123"  // ID do usuário
      /> */}


      {/* Modal de compartilhar */}
      <CompartilharModal
        isOpen={isShareModalOpen}
        onClose={closeShareModal}
        titulo={anuncio.titulo || ""}
      />

      {/* Section 2 */}
      <section className='flex justify-center flex-col mb-4 text-black-300'>
        <AnfitriaoInfos anuncioId={anuncio.id} />
      </section>
      <hr className="w-full border-t border-[#3D3D43] my-2 lg:not-sr-only" />

      {/* Section 3 */}
      <section>
        {/* {comentarios.id} */}
        <FeedBacksAnte anuncioId={anuncio.id} />
      </section>
    </div>
  );
};

export default ExibirAnuncio;
