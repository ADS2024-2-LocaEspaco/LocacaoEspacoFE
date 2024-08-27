import ReactStars from 'react-stars';

// Componente de Avaliação
type AvaliacaoProps = {
    nota: number;
  };
  
  const Avaliacao: React.FC<AvaliacaoProps> = ({ nota }) => {
    return (
      <div className="mb-4">
        <ReactStars count={5} value={nota} size={18} color2={'#ffd700'} edit={false} />
      </div>
    );
  };

  export default Avaliacao;