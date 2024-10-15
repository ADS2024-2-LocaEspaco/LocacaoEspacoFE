import React, { useState } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { LatLngExpression } from 'leaflet';

import AnfitriaoInfos, { anfitriaoData } from '../../components/anfitriaoProps';
import Avaliacao from "../../components/avaliacao";
import Carrossel from "../../components/carrosselAnuncio";
import IconesAnuncio from "../../components/iconesAnuncio";
import FavoritosModal from "../../components/favoritosModal";  // Modal de favoritos adicionado
import CompartilharModal from "../../components/compartilharModal";
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
  endereco: {
    latLng: LatLngExpression;
    pais: string;
    cidade: string;
    uf: string;
    bairro: string;
    rua: string;
  };
};

const ExibirAnuncio: React.FC<AnuncioProps> = ({ titulo, qtd_hospedes, qtd_camas, qtd_banheiros, imagens, nota, qtd_avaliacoes, endereco }, anuncio) => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isFavModalOpen, setIsFavModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);  // Estado para modal de compartilhar

  const [mapCenter, setMapCenter] = useState<LatLngExpression>({ lat: -23.6250, lng: -45.4000 });

  // Funções para abrir e fechar as modais
  const openMapModal = () => setIsMapModalOpen(true);
  const closeMapModal = () => setIsMapModalOpen(false);

  const openFavoritosModal = () => setIsFavModalOpen(true);  // Função para abrir modal de favoritos
  const closeFavoritosModal = () => setIsFavModalOpen(false);  // Função para fechar modal de favoritos

  const openShareModal = () => setIsShareModalOpen(true);  // Função para abrir modal de compartilhar
  const closeShareModal = () => setIsShareModalOpen(false);  // Função para fechar modal de compartilhar

  return (
    <div className="bg-[#fff7f4] h-full font-josefin md:flex flex-col items-center" >
      {/* Section 1 */}
      <section className="flex justify-center flex-col mb-4">
        <div className="bg-[#faf8f8] flex flex-row justify-between p-2 pb-0 flex-wrap max-w-[1184px]">
          <h1 className="text-tituloa text-black-300 p-0 font-bold mb-0 mt-1">
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
            onOpenFavoritosModal={openFavoritosModal}
            onOpenShareModal={openShareModal}
          />
        </div>
      </section>

      {/* Modal de mapa */}
      <MapaModal
        isOpen={isMapModalOpen}
        onClose={closeMapModal}
        latLng={mapCenter}
        endereco={endereco}
      />

      {/* Modal de favoritos */}
      <FavoritosModal
        isOpen={isFavModalOpen}
        onClose={closeFavoritosModal}
        currentFavorite={{ id: '1', name: titulo, icon: imagens[0] }}  // Favorito atual
        userId="123"  // ID do usuário
      />


      {/* Modal de compartilhar */}
      <CompartilharModal
        isOpen={isShareModalOpen}
        onClose={closeShareModal}
        titulo={titulo}
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
    localStorage.setItem('anuncio', JSON.stringify(anuncio));
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
