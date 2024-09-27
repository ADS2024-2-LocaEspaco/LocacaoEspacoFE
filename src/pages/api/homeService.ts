import { NextApiRequest, NextApiResponse } from 'next';

// Simulando dados de um anúncio no banco de dados
export const fetchMelhoresAvaliados = async () => {
  // Simulando lista de anuncios melhores avaliados

  return [
    {
      id: '1',
      titulo: 'Casa de Luxo',
      endereco: {
        pais: 'Brasil',
        uf: 'RJ',
      },
      imagens: [
        '/images/image1.webp',
      ],
    },
    {
      id: '2',
      titulo: 'Lindo Apartamento no Centro',
      endereco: {
        pais: 'Brasil',
        uf: 'SP',
      },
      imagens: [
        '/images/image2.webp',
      ]
    },
    {
      id: '3',
      titulo: 'Apartemento aconchegante',
      endereco: {
        pais: 'Brasil',
        uf: 'SP',
      },
      imagens: [
        '/images/image3.webp',
      ]
    },
    {
      id: '4',
      titulo: 'Apartamento 123',
      endereco: {
        pais: 'Brasil',
        uf: 'SP',
      },
      imagens: [
        '/images/image4.jpeg',
      ]
    },
    {
      id: '5',
      titulo: 'Sitio de luxo',
      endereco: {
        pais: 'Brasil',
        uf: 'BA',
      },
      imagens: [
        '/images/image5.jpeg',
      ]
    }
  ];
};




export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  try {
    const melhoresAvaliados = await fetchMelhoresAvaliados();
    if (!melhoresAvaliados) {
      return res.status(404).json({ message: 'Anúncios não encontrados' });
    }


    res.status(200).json({ melhoresAvaliados });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o anúncio' });
  }
}