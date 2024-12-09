import { NextApiRequest, NextApiResponse } from 'next';
import { Anuncio, Comodidades } from '@/types/types2';
const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';

const fetchComodidadesByAnuncioId = async (anuncioId: string) => {

  const response = await fetch(`${serverUrl}/anuncio/comodidades/${anuncioId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    return { notFound: true };
  }

  const comodidades = await response.json();

  return comodidades;

}

// Simulando dados de um anúncio no banco de dados
export const fetchAnuncioFromDB = async (id_anuncio: string) => {
  console.log('Buscando anúncio com ID:', id_anuncio);

  const response = await fetch(`${serverUrl}/anuncio/${id_anuncio}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    return { notFound: true };
  }

  const anuncio = await response.json();

  return anuncio;

};

// Simulando avaliações para o anúncio
export const fetchAvaliacoesByAnuncio = async (id_anuncio: string) => {

  console.log('Buscando avaliações para o anúncio com ID:', id_anuncio);

  const response = await fetch(`${serverUrl}/anuncio/media-avaliacao/data-reservas/${id_anuncio}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    return { notFound: true };
  }

  const avaliacoes = await response.json();
  console.log('Avaliações encontradas:', avaliacoes);
  return avaliacoes;

};

const fetchImagesFromAnuncio = async (id_anuncio: string) => {
  console.log('Buscando imagens para o anúncio com ID:', id_anuncio);

  const response = await fetch(`${serverUrl}/anuncio/fotos/${id_anuncio}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    return { notFound: true };
  }

  const images = await response.json();
  console.log('Imagens encontradas:', images);
  return images;

}

const fetchPoliticasCancelamento = async (id_anuncio: string) => {
  console.log('Buscando política de cancelamento para o anúncio com ID:', id_anuncio);

  const response = await fetch(`${serverUrl}/anuncio/politica-cancelamento/${id_anuncio}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    return { notFound: true };
  }

  const politica_cancelamento = await response.json();
  console.log('Política de cancelamento encontrada:', politica_cancelamento);
  
  return politica_cancelamento;

}

const fetchMinMaxDiarias = async (id_anuncio: string) => {
  console.log('Buscando quantidade mínima e máxima de diárias para o anúncio com ID:', id_anuncio);

  const response = await fetch(`${serverUrl}/anuncio/qtd-max-min-diaria/${id_anuncio}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    return { notFound: true };
  }

  const min_max_diarias = await response.json();
  console.log('Quantidade mínima e máxima de diárias encontradas:', min_max_diarias);
  
  return min_max_diarias;

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id_anuncio } = req.query;

  const setPoliticaCancelamento = (politica: number) => {
    switch (politica) {
      case 1:
        return { 'Flexível': 3 };
      case 2:
        return { 'Moderada': 7 };
      case 3:
        return { 'Rígida': 15 };
      default:
        return { 'Flexível': 3 };
    }
  }
  const definirRegras = (anuncio: {
    qtd_hospedes: any; monitoramento_ruido: any; cftv: any; armas: any; aprovacao_reserva: any; aceita_crianca: any; aceita_bebe: any; aceita_pet: any; quant_pet: any; quant_diaria_min: any; quant_diaria_max: any; permite_eventos: any; permite_fumar: any; horario_silencio_inicio: any; horario_silencio_fim: any; fotografia_comercial: any; checkin_inicio: any; checkin_fim: any; checkout: any;
  }) => {
    
    return {
      qtd_hospedes: anuncio.hospedes,
      monitoramento_ruido: anuncio.monitoramento_ruido,
      cftv: anuncio.cameras,
      armas: anuncio.armas,
      aprovacao_reserva: anuncio.aprovacao_reserva,
      aceita_crianca: anuncio.aceita_crianca,
      aceita_bebe: anuncio.aceita_bebe,
      aceita_pet: anuncio.aceita_pet,
      quant_pet: anuncio.quant_pet,
      quant_diaria_min: anuncio.quant_diaria_min,
      quant_diaria_max: anuncio.quant_diaria_max,
      permite_eventos: anuncio.permite_eventos,
      permite_fumar: anuncio.regra_da_casa,
      horario_silencio_inicio: anuncio.horario_silencio_inicio,
      horario_silencio_fim: anuncio.horario_silencio_fim,
      fotografia_comercial: anuncio.fotografia_comercial,
      checkin_inicio: anuncio.checkin_inicio,
      checkin_fim: anuncio.checkin_fim,
      checkout: anuncio.checkout,
    };
  }
  /*  */
  try {
    const anuncio = await fetchAnuncioFromDB(id_anuncio as string);
    if (!anuncio) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }

    const avaliacoes = await fetchAvaliacoesByAnuncio(id_anuncio as string);
    const comodidades = fetchComodidadesByAnuncioId(anuncio.id);
    const politicaCancelamento = fetchPoliticasCancelamento(anuncio.id);
    const regras = definirRegras(anuncio);
    const imagens = fetchImagesFromAnuncio(id_anuncio as string);
    const minMaxDiarias = fetchMinMaxDiarias(anuncio.id);
    res.status(200).json({ ...anuncio, avaliacoes: avaliacoes, qtd_avaliacoes: avaliacoes.length, comodidades: comodidades, politicaCancelamento: politicaCancelamento, regras: regras, imagens: imagens, minDiarias: min_max_diarias.dias_minimo_duracao, maxDiarias: min_max_diarias.dias_maximo_duracao });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o anúncio' });
  }
}