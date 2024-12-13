import { NextApiRequest, NextApiResponse } from 'next';
import { AnfitriaoProps, Anuncio, Comentario, Comodidades, MediaProps, Usuario } from '@/types/types2';
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

export const getUsuario = async (
  id_usuario: number
): Promise<Usuario | null> => {
  const serverUrl = process.env.SERVER_URL || "http://localhost:4000";
  try {
    const response = await fetch(`${serverUrl}/user/${id_usuario}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar o usuário");
    }
    const usuario = await response.json();
    console.log(`Usuário encontrado: ${JSON.stringify(usuario)}`);
    return usuario;
  } catch (error) {
    console.error("Erro ao buscar o usuário:", error);
    return null;
  }
};

export const getComentarios = async (
  id_anuncio: string
): Promise<Comentario | undefined> => {
  try {
    const response = await fetch(
      `http://localhost:4000/anuncio/comentarios/${id_anuncio}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar os comentários");
    }
    const comentarios = await response.json();

    console.log(`Comentários encontrados: ${comentarios}`);

    return comentarios;
  } catch (error) {
    console.error("Erro ao buscar os comentários:", error);
    return undefined;
  }
};

export const getUsuarioAvaliador = async (
  id_usuario: number,
  id_anuncio: string
): Promise<string | undefined> => {
  const serverUrl = process.env.SERVER_URL || "http://localhost:4000";

  try {
    const response = await fetch(
      `${serverUrl}/anuncio/${id_usuario}/${id_anuncio}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar o usuário do comentário");
    }

    const usuarioAvaliador = await response.json();
    console.log(`Usuário do comentário encontrado: ${usuarioAvaliador}`);
    return usuarioAvaliador;

  } catch (error) {
    console.error("Erro ao buscar o usuário do comentário:", error);
    return undefined;
  }
};

export const getUsuarioAnfitriao = async (
  id_anuncio: string
): Promise<AnfitriaoProps | undefined> => {
  const serverUrl = process.env.SERVER_URL || "http://localhost:4000";
  try {
    const response = await fetch(
      `${serverUrl}/user/data-anfitriao/${id_anuncio}`,
      {
        method: "GET",
        headers: { "Content-Type": "applicattion/json" },
      }
    );
    if (!response.ok) {
      throw new Error("Erro ao buscar o usuário anfitrião");
    }

    const anfitriao = await response.json();
    console.log(`Usuário anfitrião encontrado: ${anfitriao}`);
    return anfitriao;

  } catch (error) {
    console.error("Erro ao buscar o usuário anfitrião:", error);
    return undefined;
  }
};


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
  const definirRegras = async (anuncio: {
    hospedes: any; regra_da_casa: any; monitoramento_ruido: any; cameras: any; armas: any; tipo_reserva_atual: any; aceita_crianca: any; aceita_bebe: any; aceita_pet: any; quant_pet: any; dias_minimo_duracao: any; dias_maximo_duracao: any; permite_eventos: any; permite_fumar: any; horario_silencio_inicio: any; horario_silencio_fim: any; fotografia_comercial: any; checkin_inicio: any; checkin_fim: any; checkout: any;
  }) => {

    return {
      hospedes: anuncio.hospedes,
      monitoramento_ruido: anuncio.monitoramento_ruido,
      cftv: anuncio.cameras,
      armas: anuncio.armas,
      aprovacao_reserva: anuncio.tipo_reserva_atual,
      aceita_crianca: anuncio.aceita_crianca,
      aceita_bebe: anuncio.aceita_bebe || true,
      aceita_pet: anuncio.aceita_pet || true,
      quant_pet: anuncio.quant_pet || 2,
      quant_diaria_min: anuncio.dias_minimo_duracao,
      quant_diaria_max: anuncio.dias_maximo_duracao,
      permite_eventos: anuncio.permite_eventos || 'Sim',
      permite_fumar: anuncio.regra_da_casa,
      horario_silencio_inicio: anuncio.horario_silencio_inicio,
      horario_silencio_fim: anuncio.horario_silencio_fim,
      /*       fotografia_comercial: anuncio.fotografia_comercial,
             checkin_inicio: anuncio.checkin_inicio,
            checkin_fim: anuncio.checkin_fim,
            checkout: anuncio.checkout, */
    };
  }

  try {
    const anuncio = await fetchAnuncioFromDB(id_anuncio as string);
    if (!anuncio) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }

    const avaliacoes = await fetchAvaliacoesByAnuncio(id_anuncio as string);
    const comodidades = await fetchComodidadesByAnuncioId(id_anuncio as string);
    const politicaCancelamento = await fetchPoliticasCancelamento(id_anuncio as string);
    const regras = await definirRegras(anuncio);
    const imagens = await fetchImagesFromAnuncio(id_anuncio as string);
    const anfitriao = await getUsuarioAnfitriao(id_anuncio as string);
    const comentarios = await getComentarios(id_anuncio as string);
    
    

    res.status(200).json({
      ...anuncio,
      avaliacoes: avaliacoes,
      qtd_avaliacoes: avaliacoes.length,
      comodidades: comodidades,
      politicaCancelamento,
      regras: regras,
      imagens: imagens,
      minDiarias: anuncio.dias_minimo_duracao,
      maxDiarias: anuncio.dias_maximo_duracao,
      anfitriao: anfitriao,
      comentarios: comentarios,
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o anúncio' });
  }
}