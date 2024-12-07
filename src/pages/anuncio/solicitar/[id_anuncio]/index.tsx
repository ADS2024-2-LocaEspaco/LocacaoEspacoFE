import React from "react";
import SolicitarReserva from "../../components/solicitarReserva";
import { GetServerSideProps } from "next";
import router from "next/router";
import Image from "next/image";

function ConfirmarReserva({ anuncio }: { anuncio: any }) {
  if (!anuncio) {
    return <div className="w-full h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <main className="min-w-full min-h-screen bg-white flex flex-col">
      <header className="flex items-center p-4">
        <button className="mr-4 flex flex-row items-center" onClick={() => router.back()}>
          <Image src="/icons/arrow_back_icon.svg" alt="Seta de voltar" width={24} height={24} />
          <h1 className="text-xl font-semibold text-[#3D3D43]">Solicitar Reserva</h1>
        </button>
      </header>

     <div className="flex ml-1 lg:w-1/2 justify-center items-center">
        {/* <AnuncioCard /> */}
      </div> 
      <div className="flex ml-1">
        <SolicitarReserva regras={anuncio.regras} />
      </div>
    </main>
  );
}

// Função para buscar o anúncio e avaliações

export default ConfirmarReserva;