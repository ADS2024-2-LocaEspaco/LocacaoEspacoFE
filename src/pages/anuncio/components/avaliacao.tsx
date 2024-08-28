import React from "react";

const estrelaAtiva = "/icons/avaliacao_estrela_ativa.svg"; 
const estrelaInativa = "/icons/avaliacao_estrela_inativa.svg";


// Componente de Avaliação
type AvaliacaoProps = {
  nota: number;
  qtd_avaliacoes: number;
};

const Avaliacao: React.FC<AvaliacaoProps> = ({ nota, qtd_avaliacoes }) => {
  const estrelasTotais = 5;
  const estrelasCheias = Math.floor(nota); 
  const ehMeiaEstrela = nota % 1 !== 0; 
  const estrelasVazias = estrelasTotais - estrelasCheias - (ehMeiaEstrela ? 1 : 0);

  const meiaEstrela = (<div className="relative">
    <img src={estrelaAtiva} alt="meia estrela" className="absolute w-[19px] h-[17px] -[50]%" style={{ clipPath: 'inset(0 50% 0 0)' }}/>
    <img src={estrelaInativa} alt="estrela inativa" className=" w-[19px] h-[17px] t-[50]%" style={{ clipPath: 'inset(0 0 0 50% )' }}/> 
    </div>
  )

  return (
    <div className="mb-4 flex items-center space-x-2 md:pr-[10%] justify-center">
      {[...Array(estrelasCheias)].map((_, index) => (
        <img key={index} src={estrelaAtiva} alt="estrela ativa" className="w-[19px] h-[17px]" />
      ))}

      {ehMeiaEstrela && meiaEstrela}

      {[...Array(estrelasVazias)].map((_, index) => (
        <img key={index} src={estrelaInativa} alt="estrela inativa" className="w-[19px] h-[17px]" />
      ))}

      <p className="text-[#F37216] text-avaliacao">({qtd_avaliacoes})</p>
    </div>
  );
};

export default Avaliacao;
