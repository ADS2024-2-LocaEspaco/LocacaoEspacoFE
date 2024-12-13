import React, { useEffect, useState } from "react";
import SolicitarReserva from "../../components/solicitarReserva";
import { GetServerSideProps } from "next";
import router from "next/router";
import Image from "next/image";
import AnuncioCard from "../../components/AnuncioCard";
import { Anuncio } from "@/types/types2";
import { getAnuncioData } from "@/utils/api";

interface Props {
  anuncio: Anuncio;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id_anuncio } = context.query;

  try {
    const result = await getAnuncioData(context);
    if (result && typeof result === 'object' && !('then' in result) && 'props' in result && result.props && typeof result.props === 'object' && 'anuncio' in result.props) {
      const anuncio = result.props.anuncio;
      return {
        props: {
          anuncio,
        },
      };
    }
    return { notFound: true };
  } catch (error) {
    console.error("Erro ao buscar o anúncio:", error);
    return {
      notFound: true,
    };
  }
};


function ConfirmarReserva({ anuncio }: Props) {
  const [ultimaReserva, setUltimaReserva] = useState<any>(null);

  useEffect(() => {
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    if (reservas.length > 0) {
      setUltimaReserva(reservas[reservas.length - 1]);
    }
  }, []);

  if (!anuncio) {
    return <div className="w-full h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <main className="min-w-full min-h-screen bg-[#F1F1F3] flex flex-col">
      <header className="flex items-center p-4">
        <button className="mr-4 flex flex-row items-center" onClick={() => router.back()}>
          <Image src="/icons/arrow_back_icon.svg" alt="Seta de voltar" width={24} height={24} />
          <h1 className="text-xl font-semibold text-[#3D3D43]">Solicitar Reserva</h1>
        </button>
      </header>

      <div className="flex justify-between px-8 py-6">
      <SolicitarReserva ultimaReserva={ultimaReserva} />
      <AnuncioCard />
    </div>
    </main>
  );
}

export default ConfirmarReserva;