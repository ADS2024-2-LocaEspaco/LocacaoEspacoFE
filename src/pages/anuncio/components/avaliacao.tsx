/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import axios from 'axios';

import { GetDadosAvaliacao } from '@/utils/api';

const estrelaAtiva = "/icons/avaliacao_estrela_ativa.svg";
const estrelaInativa = "/icons/avaliacao_estrela_inativa.svg";

interface AvaliacaoProps {
  anuncioId: string;
}

const Avaliacao: React.FC<AvaliacaoProps> = ({ anuncioId }) => {
  const [notaMedia, setNotaMedia] = useState<number>(0);
  const [quantAvaliacoes, setQuantAvaliacoes] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchAvaliacao = async () => {
      try {
        const result = await GetDadosAvaliacao(anuncioId);
        
        if (result?.media_notas) {
          const notas = result.media_notas;
          const valores = [
            Number(notas.nota_limpeza),
            Number(notas.nota_cordialidade),
            Number(notas.nota_custo_beneficio),
            Number(notas.nota_exatidao_anuncio),
            Number(notas.nota_localizacao),
            Number(notas.nota_pontualidade),
            Number(notas.nota_seguiu_regras)
          ].filter(nota => !isNaN(nota));

          if (valores.length > 0) {
            const media = valores.reduce((acc, curr) => acc + curr, 0) / valores.length;
            setNotaMedia(Number(media.toFixed(1)));
            setQuantAvaliacoes(valores.length);
          }
        }
      } catch (err) {
        setError('Erro ao carregar avaliações');
        console.error('Erro:', err);
      }
    };

    fetchAvaliacao();
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