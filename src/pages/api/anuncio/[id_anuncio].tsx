 // pages/api/anuncio/[id_anuncio].ts

import { LatLng } from 'leaflet';
import { NextApiRequest, NextApiResponse } from 'next';

// Função para buscar um anúncio específico
export const fetchAnuncioFromDB = async (id_anuncio: string) => {
  return {
    id: '1',
    titulo: 'Lindo Apartamento no Centro',
    qtd_hospedes: 5,
    qtd_camas: 2,
    qtd_banheiros: 1,
    id_anfitriao: '123',
    imagens: [
      '/images/image1.webp',
      '/images/image2.webp',
      '/images/image3.webp',
      '/images/image4.webp',
      '/images/image5.webp',
    ],
    endereco: {
      localizacao: { lat: -23.6250, lng: -45.4000 },
      pais: 'Brasil',
      cidade: 'Caraguatatuba',
      uf: 'SP',
      bairro: 'Prainha',
      rua: 'Rua da praia',
    },
    valor_diaria: 100,
    disponibilidade: true,
    descricao: 'Apartamento com vista para o mar',
    id_tipo_immovel: 1,
    id_tipo_espaco: 1,

  }
};


type anuncio = {
  id: string;
  titulo: string;
  qtd_hospedes: number;
  qtd_camas: number;
  qtd_banheiros: number;
  id_anfitriao: string;
  id_tipo_immovel: number;
  id_tipo_espaco: number;
  imagens: string[];
  localização: LatLng;
  valor_diaria: number;
  disponibilidade: boolean;
  descricao: string;
  endereco: {
    pais: string;
    cidade: string;
    uf: string;
    bairro: string;
    rua: string;
  };


};

type avaliacao_anuncio = {
  id: string;
  id_usuario: number;
  id_anuncio: number;
  nota: number;
  comentario: string;
};

type avaliacao_usuario = {
  id: string;
  id_usuario: number;
  id_anfitriao: number;
  nota: number;
  comentario: string;
};

// Função para buscar avaliações por ID do anúncio
export const fetchAvaliacoesByAnuncio = async (id_anuncio: string) => {
  return [
    { id: '1', id_usuario: '121', id_anuncio: '1', nota: 4.5, comentario: 'Muito bom!' },
    { id: '2', id_usuario: '124', id_anuncio: '1', nota: 3.5, comentario: 'Bom!' },
    { id: '3', id_usuario: '122', id_anuncio: '1', nota: 5, comentario: 'Regular!' },
    { id: '4', id_usuario: '125', id_anuncio: '1', nota: 5, comentario: 'Marromenos' },
    { id: '5', id_usuario: '126', id_anuncio: '1', nota: 1.5, comentario: 'Daora meu!' },
    { id: '6', id_usuario: '127', id_anuncio: '1', nota: 5, comentario: 'Perfeito!' },
    { id: '7', id_usuario: '128', id_anuncio: '1', nota: 1.5, comentario: 'Marromenos' },
    { id: '8', id_usuario: '129', id_anuncio: '1', nota: 4.5, comentario: 'Daora meu!' },
    { id: '9', id_usuario: '130', id_anuncio: '1', nota: 1, comentario: 'Perfeito!' },
    { id: '10', id_usuario: '131', id_anuncio: '1', nota: 1.5, comentario: 'Marromenos' },
    { id: '11', id_usuario: '132', id_anuncio: '1', nota: 4.5, comentario: 'Daora meu!' },
    { id: '12', id_usuario: '133', id_anuncio: '1', nota: 5, comentario: 'Perfeito!' },
  
  ];
};

// Função para buscar avaliações por ID do usuário
export const fetchAvaliacoesByUsuario = async (id_usuario: string) => {
  return [
    {
      id: '1',
      id_usuario: '121',
      id_anfitriao: '123',
      nota: 4.5,
      comentario: 'Muito bom!',
    },
    {
      id: '2',
      id_usuario: '124',
      id_anfitriao: '123',
      nota: 3.5,
      comentario: 'Bom!',
    },
    {
      id: '3',
      id_usuario: '122',
      id_anfitriao: '123',
      nota: 5,
      comentario: 'Regular!',
    },
    {
      id: '4',
      id_usuario: '125',
      id_anfitriao: '123',
      nota: 1.5,
      comentario: 'Marromenos',
    },
    {
      id: '5',
      id_usuario: '126',
      id_anfitriao: '123',
      nota: 4.5,
      comentario: 'Daora meu!',
    },
    {
      id: '6',
      id_usuario: '127',
      id_anfitriao: '123',
      nota: 5,
      comentario: 'Perfeito!',
    },
    {
      id: '7',
      id_usuario: '128',
      id_anfitriao: '123',
      nota: 5,
      comentario: 'Perfeito!',
    },
    {
      id: '8',
      id_usuario: '129',
      id_anfitriao: '123',
      nota: 5,
      comentario: 'Perfeito!',
    },
    {
      id: '9',
      id_usuario: '130',
      id_anfitriao: '123',
      nota: 5,
      comentario: 'Perfeito!',
    },
    {
      id: '10',
      id_usuario: '120',
      id_anfitriao: '123',
      nota: 5,
      comentario: 'Perfeito!',
    },
  ];
};

// Calcula a média das notas das avaliações
const calcularMediaAvaliacoes = (avaliacoes: { nota: number }[]) => {
  const total = avaliacoes.reduce((soma, avaliacao) => soma + avaliacao.nota, 0);
  return total / avaliacoes.length;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id_anuncio } = req.query;

  try {
    const anuncio = await fetchAnuncioFromDB(id_anuncio as string);
    const avaliacoes = await fetchAvaliacoesByAnuncio(id_anuncio as string);

    const notaMedia = calcularMediaAvaliacoes(avaliacoes);
    res.status(200).json({ ...anuncio, nota: notaMedia, qtd_avaliacoes: avaliacoes.length });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o anúncio' });
  }
}
