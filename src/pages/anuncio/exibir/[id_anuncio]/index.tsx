import { GetServerSideProps } from "next";
import { useState } from "react";

import AnfitriaoInfos, { anfitriaoData } from "../../components/anfitriaoProps";
import Avaliacao from "../../components/avaliacao";
import Carrossel from "../../components/carrosselAnuncio";
import IconesAnuncio from "../../components/iconesAnuncio";
import FeedBacksAnte from "../../components/feedbackAnte";

type AnuncioProps = {
  titulo: string;
  qtd_hospedes: number;
  qtd_camas: number;
  qtd_banheiros: number;
  id_anfitriao: string;
  imagens: string[];
};

const ExibirAnuncio: React.FC<AnuncioProps> = (anuncio) => {
  const { titulo, qtd_hospedes, qtd_camas, qtd_banheiros, imagens } = anuncio;
  const [nota] = useState(3.5);


  return (
    <div className="bg-[#fff7f4] h-full font-josefin md:flex flex-col items-center" >
      {/* Section 1 */}
      <section className="flex justify-center flex-col mb-4 " >
        <div className="bg-[#faf8f8] flex flex-row justify-between p-2 pb-0 flex-wrap max-w-[1184px]">
          <h1 className="text-tituloa text-black p-0 font-bold mb-0 mt-1 ">
            {titulo}
          </h1>
          <Avaliacao nota={nota} qtd_avaliacoes={20} />
        </div>
        <div className="flex flex-col items-center mb-4">
          <Carrossel imagens={imagens} />
          <IconesAnuncio
            qtd_hospedes={qtd_hospedes}
            qtd_banheiros={qtd_banheiros}
            qtd_camas={qtd_camas}
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className=' flex justify-center items-center max-w-screen-xl'>
        <AnfitriaoInfos quartos={3} banheiros={2} vagas={4} {...anfitriaoData} />
      </section>
      <hr className="w-full border-t border-[#3D3D43] my-2 lg:not-sr-only" />

      {/* Section 3 */}
      <section>
        <FeedBacksAnte />
      </section>
    </div>
  );
};


// Função para buscar o anúncio
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id_anuncio } = context.query;

  try {
    const res = await fetch(`http://localhost:3000/api/anuncio/${id_anuncio}`);
    const anuncio = await res.json();
    console.log(`Anúncio encontrado: ${anuncio}`);
    return {
      props: anuncio,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default ExibirAnuncio;
