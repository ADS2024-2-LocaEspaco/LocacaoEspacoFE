import { Anuncio, Avaliacao, Comentario, Usuario, MediaAvaliacaoResponse, AnfitriaoProps } from '@/types/types2';
import axios from 'axios';
import { GetServerSideProps } from 'next';

// export const fetchAnuncioById = async (id_anuncio: string): Promise<Anuncio | undefined> => {
//   console.log('aqui no fetchAnuncioById');
//   try {
//     const res = await fetch(`http://localhost:3000/anuncio/1`, {"mode": "no-cors"});

//     if (!res.ok) {
//       throw new Error('Erro ao buscar o anúncio');
//     }
//     const data = await res.json();
//     return data;

//   } catch (error) {
//     console.error('Erro ao buscar o anuncio:', error);
//   }
// };

// Função para buscar o anúncio
export const getAnuncioData: GetServerSideProps = async (context) => {
  const { id_anuncio } = context.query;

  try {
    const resAnun = await fetch(`http://localhost:3000/anuncio/${id_anuncio}`, {
      method: 'GET',
    });

    if (!resAnun.ok) {
      throw new Error('Erro ao buscar o anúncio');
    }
    const anuncio = await resAnun.json();
    console.log(`Anúncio encontrado: ${JSON.stringify(anuncio)}`);

    return {
      props: {
        anuncio,
      }
    };
  } catch (error) {
    console.error('Erro no getServerSideProps:', error);
    return {
      notFound: true,
    };
  }
};

export const getUsuario = async (id_usuario: number): Promise<Usuario | null> => {
  try {
    const response = await axios.get(`http://localhost:3000/user/${id_usuario}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status !== 200) {
      throw new Error('Erro ao buscar o usuário');
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o usuário:', error);
    return null;
  }
}

export const getComentarios = async (id_anuncio: string): Promise<Comentario | undefined> => {
  try {
    const response = await axios.get(`http://localhost:3000/anuncio/comentarios/${id_anuncio}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      throw new Error('Erro ao buscar os comentários');
    }
    console.log(response.data, "aquii")
    console.log(`Comentários encontrados: ${JSON.stringify(response)}`);

    return response.data;

  } catch (error) {
    console.error('Erro ao buscar os comentários:', error);
    return undefined;
  }
};

export const GetDadosAvaliacao = async (id_anuncio: string): Promise<MediaAvaliacaoResponse | undefined> => {
  try {
    const response = await fetch(`http://localhost:3000/anuncio/media-avaliacao/data-reservas/${id_anuncio}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json()
    if (response.status !== 200) {
      throw new Error('Erro ao buscar os comentários');
    }

    console.log(`Dados Avaliação encontrados: ${JSON.stringify(response)}`);

    return data;

  } catch (error) {
    console.error('Erro ao buscar os dados da avaliação:', error);
    return undefined;
  }
}

export const getUsuarioAvaliador = async (id_usuario: number, id_anuncio: string): Promise<string | undefined> => {
  try {
    const response = await axios.get(`http://localhost:3000/anuncio/${id_usuario}/${id_anuncio}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status !== 200) {
      throw new Error('Erro ao buscar o usuário do comentário');
    }

    return response.data.nome;
  } catch (error) {
    console.error('Erro ao buscar o usuário do comentário:', error);
    return undefined;
  }
};

export const getUsuarioAnfitriao = async (id_anuncio: string): Promise<AnfitriaoProps | undefined> => {
  try {
    const response = await axios.get(`http://localhost:3000/user/data-anfitriao/${id_anuncio}`, {
      headers: { 'Content-Type': 'applicattion/json' },
    });
    if (response.status !== 200) {
      throw new Error('Erro ao buscar o usuário anfitrião');
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o usuário anfitrião:', error);
    return undefined;
  }
}