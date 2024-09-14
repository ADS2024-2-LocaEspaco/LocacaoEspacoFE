/* eslint-disable @next/next/no-img-element */
import React from "react";

const estrelaAtiva = "/icons/avaliacao_estrela_ativa.svg";
const estrelaInativa = "/icons/avaliacao_estrela_inativa.svg";

// Componente de Avaliação
type AvaliacaoProps = {
  nota: number;
  qtd_avaliacoes?: number;
  exibirNotaMedia?: boolean; // Determina se mostra a nota média ou quantidade de avaliações
};

const Avaliacao: React.FC<AvaliacaoProps> = ({
  nota,
  qtd_avaliacoes = 0,
  exibirNotaMedia = false,
}) => {
  const estrelasTotais = 5;
  const estrelasCheias = Math.floor(nota);
  const ehMeiaEstrela = nota % 1 >= 0.5;
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
          data-testid="estrela-ativa"
          className="w-[19px] h-[17px]"
        />
      ))}

      {ehMeiaEstrela && meiaEstrela}

      {[...Array(estrelasVazias)].map((_, index) => (
        <img
          key={index}
          src={estrelaInativa}
          alt={`estrela inativa ${index + 1}`}
          data-testid="estrela-inativa"
          className="w-[19px] h-[17px]"
        />
      ))}

      {exibirNotaMedia ? (
        <p className="text-[#F37216] text-avaliacaol pt-1" data-testid="nota-media">
          {nota.toFixed(1)}
        </p>
      ) : (
        <p className="text-[#F37216] text-avaliacaol pt-1" data-testid="qtd-avaliacoes">
          ({qtd_avaliacoes})
        </p>
      )}
    </div>
  );
};

export default Avaliacao;
