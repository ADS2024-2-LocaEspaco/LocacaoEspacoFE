import { Anuncio } from '@/types/types';

export const fetchAnuncioById = async (idAnuncio: string): Promise<Anuncio | undefined> => {
  try {
    const response = await fetch(`/api/anuncio/${idAnuncio}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar o anúncio.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar o anúncio:', error);
  }
};
