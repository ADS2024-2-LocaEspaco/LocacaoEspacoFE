import React from 'react'
import Component from '../../components/solicitarReserva'
import { GetServerSideProps } from 'next';

function index() {
  return (
    <Component />
  )
}

// Função para buscar o anúncio e avaliações
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id_anuncio } = context.query;

  try {
    const res = await fetch(`http://localhost:3000/api/anuncio/${id_anuncio}`);
    const anuncio = await res.json();
    console.log(`Anúncio encontrado: ${JSON.stringify(anuncio)}`);
    return {
      props: anuncio,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default index