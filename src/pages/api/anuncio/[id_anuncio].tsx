import { NextApiRequest, NextApiResponse } from 'next';
import { LatLng } from 'leaflet';


// Simulando dados de um anúncio no banco de dados
export const fetchAnuncioFromDB = async (id_anuncio: string) => {
    // Simulando diferentes anúncios com base no ID
  if (id_anuncio === '1') {
    return {
      id: '1',
      titulo: 'Lindo Apartamento no Centro',
      qtd_hospedes: 5,
      qtd_camas: 2,
      qtd_banheiros: 1,
      id_anfitriao: '123',
      valorDiaria: 200,
      endereco: {
      localizacao: { lat: -23.6250, lng: -45.4000 },
      pais: 'Brasil',
      cidade: 'Caraguatatuba',
      uf: 'SP',
      bairro: 'Prainha',
      rua: 'Rua da praia',
    },
      id_tipo_immovel: 1,
      id_tipo_espaco: 1,
      disponibilidade: true,
      imagens: [
        '/images/image1.webp',
        '/images/image2.webp',
        '/images/image2.webp',
        '/images/image4.webp',
        '/images/image5.webp',
      ],
    };
  } else if (id_anuncio === '2') {
    return {
      id: '2',
      titulo: 'Casa de Praia com Vista para o Mar',
      qtd_hospedes: 8,
      qtd_camas: 4,
      qtd_banheiros: 3,
      id_anfitriao: '124',
      valorDiaria: 300,
     endereco: {
      localizacao: { lat: -23.6250, lng: -45.4000 },
      pais: 'Brasil',
      cidade: 'Caraguatatuba',
      uf: 'SP',
      bairro: 'Prainha',
      rua: 'Rua da praia',
    },
      id_tipo_immovel: 1,
      id_tipo_espaco: 1,
      disponibilidade: true,
      imagens: [
        '/images/beach1.webp',
        '/images/beach2.webp',
        '/images/beach3.webp',
        '/images/beach4.webp',
        '/images/beach5.webp',
      ],
    };
  }
  // Retorno padrão caso o ID não seja encontrado
  return null;

// Simulando avaliações para o anúncio
export const fetchAvaliacoesByAnuncio = async (id_anuncio: string) => {
  return [
    { id: '1', id_usuario: '121', id_anuncio, nota: 4.5, comentario: 'Excelente!' },
    { id: '2', id_usuario: '124', id_anuncio, nota: 3.5, comentario: 'Bom, mas pode melhorar.' },
    { id: '3', id_usuario: '125', id_anuncio, nota: 5, comentario: 'Adorei o local, recomendo!' },
  ];
};

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
    if (!anuncio) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }

    const avaliacoes = await fetchAvaliacoesByAnuncio(id_anuncio as string);
    const notaMedia = calcularMediaAvaliacoes(avaliacoes);

    res.status(200).json({ ...anuncio, nota: notaMedia, qtd_avaliacoes: avaliacoes.length });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o anúncio' });
  }
}
