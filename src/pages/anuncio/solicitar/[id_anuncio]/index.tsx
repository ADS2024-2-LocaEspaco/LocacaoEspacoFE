import React from 'react'
import SolicitarReserva from '../../components/solicitarReserva'
import { GetServerSideProps } from 'next';
import AnuncioCard from '../../components/AnuncioCard';
import Cancelamento from '../../components/Cancelamento';

function ConfirmarReserva({ anuncio }: { anuncio: any }) {
  return (
    <div className='w-screen h-screen bg-white'>
      <button onClick={() => window.location.href = `/anuncio/${anuncio.id}`}><h1 className='font-bold text-3xl mb-8'> Solicitar Reserva</h1></button>
      <div className='w-screen h-auto flex items-center'>
        <div className='w-1/2 h-full'>
          <SolicitarReserva />
        </div>
        <div className='w-1/2 h-full'>
          <AnuncioCard />
        </div>
      </div>
      <div className='w-screen h-full flex items-center'>
        <div className='w-1/2 h-full'>
          <Cancelamento />
        </div>
      </div>
    </div>
  )
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