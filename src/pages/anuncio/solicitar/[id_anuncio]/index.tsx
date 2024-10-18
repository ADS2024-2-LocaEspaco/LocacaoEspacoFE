import React from "react";
import SolicitarReserva from "../../components/solicitarReserva";
import { GetServerSideProps } from "next";
import AnuncioCard from "../../components/AnuncioCard";
import Cancelamento from "../../components/Cancelamento";
import Regras from "../../components/Regras";
import router from "next/router";

function ConfirmarReserva({ anuncio }: { anuncio: any }) {
  if (!anuncio) {
    return <div>Carregando...</div>;
  }
  
  return (
    <div className="w-screen h-full bg-white p-4">
    <header className="flex items-center mb-6 max-w-md">
    <button className="mr-4 flex flex-row" onClick={() => router.back()}>
      <img src="/icons/arrow_back_icon.svg" alt="Seta de voltar" />
      <h1 className="text-xl font-semibold text-[#3D3D43]">Solicitar Reserva</h1>
    </button>
  </header>
      <div className="w-screen h-auto flex items-center justify-evenly">
        <div className="w-full">
          <SolicitarReserva regras={anuncio.regras} />
        </div>
        <div className="w-full flex justify-center items-center">
          <AnuncioCard />
        </div>
      </div>
      <div className="w-screen h-full flex flex-row items-center">
        <div className="w-1/2 h-full">
          <Regras regras={anuncio.regras} />
        </div>
        <div className="w-1/2 h-full">
          <Cancelamento />
        </div>
      </div>
    </div>
  );
}

// Função para buscar o anúncio e avaliações
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id_anuncio } = context.query;

  try {
    const res = await fetch(`http://localhost:3000/api/anuncio/${id_anuncio}`);
    const anuncio = await res.json();
    console.log(`Anúncio encontrado no index: ${JSON.stringify(anuncio)}`);
    return {
      props: { anuncio },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default ConfirmarReserva;
