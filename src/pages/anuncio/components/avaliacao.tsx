/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import axios from 'axios';

const estrelaAtiva = "/icons/avaliacao_estrela_ativa.svg";
const estrelaInativa = "/icons/avaliacao_estrela_inativa.svg";

interface AvaliacaoProps {
  anuncioId: string;
}

const Avaliacao: React.FC<AvaliacaoProps> = ({ anuncioId }) => {
  const [notaMedia, setNotaMedia] = useState<number>(0);
  const [quantAvaliacoes, setQuantAvaliacoes] = useState<number>(0);

  useEffect(() => {
    const fetchMediaAvaliacao = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/anuncio/media-avaliacao/data-reservas`, {
          params: { id_Anuncio: anuncioId },
          headers: { 'Content-Type': 'application/json' },
        });

        const result = response.data;

        if (result.media_notas) {
          const mediaNotas = result.media_notas;
          const totalNotas = Object.values(mediaNotas).map(Number);
          const somaNotas = totalNotas.reduce((acc, curr) => acc + curr, 0);
          const notaMediaCalculada = somaNotas / totalNotas.length;
          setNotaMedia(notaMediaCalculada);
        }

        setQuantAvaliacoes(result.quant_hospedes || 0);
      } catch (error) {
        console.error('Erro ao buscar a Média das Avaliações:', error);
      }

    }


    fetchMediaAvaliacao();
  }, [anuncioId]);

  const estrelasTotais = 5;
  const estrelasCheias = Math.floor(notaMedia);
  const ehMeiaEstrela = notaMedia % 1 >= 0.5;
  const estrelasVazias = estrelasTotais - estrelasCheias - (ehMeiaEstrela ? 1 : 0);

  const meiaEstrela = (
    <div className="relative" data-testid="meia-estrela">
      <img
        src={estrelaAtiva}
        alt="meia estrela ativa"
        className="absolute w-[19px] h-[17px]"
        style={{ clipPath: "inset(0 50% 0 0)" }}
      />
      <img
        src={estrelaInativa}
        alt="meia estrela inativa"
        className="w-[19px] h-[17px]"
        style={{ clipPath: "inset(0 0 0 50%)" }}
      />
    </div>
  );

  return (
    <div className="flex items-center space-x-2 justify-center">
      {[...Array(estrelasCheias)].map((_, index) => (
        <img
          key={index}
          src={estrelaAtiva}
          alt={`estrela ativa ${index + 1}`}
          className="w-[19px] h-[17px]"
        />
      ))}

      {ehMeiaEstrela && meiaEstrela}

      {[...Array(estrelasVazias)].map((_, index) => (
        <img
          key={index}
          src={estrelaInativa}
          alt={`estrela inativa ${index + 1}`}
          className="w-[19px] h-[17px]"
        />
      ))}

      <p className="text-[#F37216] text-avaliacaol pt-1">
        {notaMedia.toFixed(1)} ({quantAvaliacoes})
      </p>
    </div>
  );
};

export default Avaliacao;