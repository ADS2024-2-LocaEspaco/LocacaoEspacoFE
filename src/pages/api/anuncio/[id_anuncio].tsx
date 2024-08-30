// pages/api/anuncio/[id_anuncio].ts

import { NextApiRequest, NextApiResponse } from 'next';

export const fetchAnuncioFromDB = async (id_anuncio: string) => {
  return {
    id: '1',
    titulo: 'Lindo Apartamento no Centro',
    nota: 3.5,
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
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id_anuncio } = req.query;

  try {
    const anuncio = await fetchAnuncioFromDB(id_anuncio as string);
    res.status(200).json(anuncio);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o anúncio' });
  }
}
