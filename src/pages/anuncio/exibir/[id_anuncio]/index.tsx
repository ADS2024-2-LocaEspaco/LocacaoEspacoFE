import React, { useState } from "react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";

import AnfitriaoInfos, { anfitriaoData } from '../../components/anfitriaoProps';
import Avaliacao from "../../components/avaliacao";
import Carrossel from "../../components/carrosselAnuncio";
import IconesAnuncio from "../../components/iconesAnuncio";
const MapaModal = dynamic(() => import("../../components/mapaModal"), { ssr: false });

type LatLngExpression = {
  lat: number;
  lng: number;
};

type AnuncioProps = {
  id: string;
  titulo: string;
  descricao: string;
  qtd_quartos: number;
  qtd_hospedes: number;
  qtd_camas: number;
  qtd_banheiros: number;
  id_anfitriao: string;
  valor_diaria: number;
  polit_cancelamento: number;
  Tipo_Imoveis_id: number;
  Tipo_Espaco_id: number;
  monitoramento_ruido: boolean;
  cftv: boolean;
  armas: boolean;
  aprovacao_reserva: boolean;
  aceita_crianca: boolean;
  aceita_bebe: boolean;
  aceita_pet: boolean;
  quant_pet: number;
  quant_diaria_min: number;
  quant_diaria_max: number;
  permite_eventos: boolean;
  permite_fumar: boolean;
  horario_silencio_inicio: string;
  horario_silencio_fim: string;
  fotografia_comercial: boolean;
  imagens: string[];
  nota: number;
  qtd_avaliacoes: number;
<<<<<<< HEAD
};

const ExibirAnuncio: React.FC<AnuncioProps> = ({ titulo, qtd_hospedes, qtd_camas, qtd_banheiros, imagens, nota, qtd_avaliacoes }) => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>({ lat: -23.5505, lng: -46.6333 });

  const openMapModal = () => setIsMapModalOpen(true);
  const closeMapModal = () => setIsMapModalOpen(false);

=======
  checkin_inicio: string;
  checkin_fim: string;
  checkout: string;
  url_imgs: string[];
  criado_em: string;
  temp_antec_reserva: number;
  ativo: boolean;
  endereco: {
    latLng: LatLngExpression;
    pais: string;
    cidade: string;
    uf: string;
    bairro: string;
    rua: string;
  };
  regras: object;
};


const ExibirAnuncio: React.FC<AnuncioProps> = ({ titulo, qtd_hospedes, qtd_camas, qtd_banheiros, imagens, nota, qtd_avaliacoes, endereco }, anuncio) => {
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

>>>>>>> eb5b22cdc63cbc5f40d9a480b105e4676059b935
  return (
    <div className="bg-[#fff7f4] h-full font-josefin md:flex flex-col items-center">
      {/* Section 1 */}
      <section className="flex justify-center flex-col mb-4">
        <div className="bg-[#faf8f8] flex flex-row justify-between p-2 pb-0 flex-wrap max-w-[1184px]">
          <h1 className="text-tituloa text-black p-0 font-bold mb-0 mt-1">
            {titulo}
          </h1>
          <Avaliacao nota={nota || 0} qtd_avaliacoes={qtd_avaliacoes} exibirNotaMedia={true}/>
        </div>
        <div className="flex flex-col items-center mb-4">
          <Carrossel imagens={imagens} />
          <IconesAnuncio
            qtd_hospedes={qtd_hospedes}
            qtd_banheiros={qtd_banheiros}
            qtd_camas={qtd_camas}
            onOpenMapModal={openMapModal}
<<<<<<< HEAD
=======
            onOpenFavoritosModal={openFavoritosModal}
            onOpenShareModal={openShareModal}
>>>>>>> eb5b22cdc63cbc5f40d9a480b105e4676059b935
          />
        </div>
      </section>
      <MapaModal
        isOpen={isMapModalOpen}
        onClose={closeMapModal}
        latLng={mapCenter}
<<<<<<< HEAD
=======
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
>>>>>>> eb5b22cdc63cbc5f40d9a480b105e4676059b935
      />

      {/* Section 2 */}
      <section>
        <AnfitriaoInfos quartos={3} banheiros={2} vagas={4} {...anfitriaoData} />
      </section>
    </div>
  );
};

// Função para buscar o anúncio e avaliações
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id_anuncio } = context.query;

  try {
    const res = await fetch(`http://localhost:3000/api/anuncio/${id_anuncio}`);
    if (!res.ok) {
      throw new Error('Erro ao buscar o anúncio');
    }
    const anuncio = await res.json();
    console.log(`Anúncio encontrado: ${JSON.stringify(anuncio)}`);
    
    return {
      props: anuncio,
    };
  } catch (error) {
    console.error('Erro no getServerSideProps:', error);
    return {
      notFound: true,
    };
  }
};

export default ExibirAnuncio;
