import {
  Anuncio,
  AvaliacaoProps,
  Comentario,
  Usuario,
  MediaProps,
  AnfitriaoProps,
} from "@/types/types2";
import axios from "axios";
import { GetServerSideProps } from "next";

// Função para buscar o anúncio
export const getAnuncioData: GetServerSideProps = async (context) => {
  const { id_anuncio } = context.query;
  const serverUrl = process.env.SERVER_URL || "http://localhost:4000";
  try {
    const resAnun = await fetch(`${serverUrl}/anuncio/${id_anuncio}`, {
      method: "GET",
    });

    if (!resAnun.ok) {
      throw new Error("Erro ao buscar o anúncio");
    }
    const anuncio = await resAnun.json();
    console.log(`Anúncio encontrado: ${JSON.stringify(anuncio)}`);

    return {
      props: {
        anuncio,
      },
    };
  } catch (error) {
    console.error("Erro no getServerSideProps:", error);
    return {
      notFound: true,
    };
  }
};

export const getUsuario = async (
  id_usuario: number
): Promise<Usuario | null> => {
  const serverUrl = process.env.SERVER_URL || "http://localhost:4000";
  try {
    const response = await axios.get(`${serverUrl}/user/${id_usuario}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 200) {
      throw new Error("Erro ao buscar o usuário");
    }
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o usuário:", error);
    return null;
  }
};

export const getComentarios = async (
  id_anuncio: string
): Promise<Comentario | undefined> => {
  try {
    const response = await axios.get(
      `http://localhost:4000/anuncio/comentarios/${id_anuncio}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status !== 200) {
      throw new Error("Erro ao buscar os comentários");
    }
    console.log(response.data, "aquii");
    console.log(`Comentários encontrados: ${JSON.stringify(response)}`);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os comentários:", error);
    return undefined;
  }
};

export const GetDadosAvaliacao = async (
  id_anuncio: string
): Promise<MediaProps | undefined> => {
  const serverUrl = process.env.SERVER_URL || "http://localhost:4000";
  try {
    const response = await fetch(
      `${serverUrl}/anuncio/media-avaliacao/data-reservas/${id_anuncio}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error("Erro ao buscar os comentários");
    }

    console.log(`Dados Avaliação encontrados: ${JSON.stringify(response)}`);

    return data;
  } catch (error) {
    console.error("Erro ao buscar os dados da avaliação:", error);
    return undefined;
  }
};

export const getUsuarioAvaliador = async (
  id_usuario: number,
  id_anuncio: string
): Promise<string | undefined> => {
  const serverUrl = process.env.SERVER_URL || "http://localhost:4000";

  try {
    const response = await axios.get(
      `${serverUrl}/anuncio/${id_usuario}/${id_anuncio}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status !== 200) {
      throw new Error("Erro ao buscar o usuário do comentário");
    }

    return response.data.nome;
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
    const response = await axios.get(
      `${serverUrl}/user/data-anfitriao/${id_anuncio}`,
      {
        headers: { "Content-Type": "applicattion/json" },
      }
    );
    if (response.status !== 200) {
      throw new Error("Erro ao buscar o usuário anfitrião");
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o usuário anfitrião:", error);
    return undefined;
  }
};
