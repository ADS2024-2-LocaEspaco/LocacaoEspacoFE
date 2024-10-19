import Image from 'next/image';

interface RatingComponentProps {
  rating: number;  // Avaliação numérica (ex: 4)
  maxRating?: number;  // Avaliação máxima possível, por padrão 5
  filledStar: string;  // Ícone da estrela preenchida
  emptyStar: string;  // Ícone da estrela vazia
}

const RatingComponent: React.FC<RatingComponentProps> = ({
    rating,
    maxRating = 5,
    filledStar,
    emptyStar,
}) => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
        stars.push(
<Image key={i} src={i <= rating ? filledStar : emptyStar} alt={i <= rating ? 'Filled Star' : 'Empty Star'} className="size-9" />
        );
    }

    return (
        <div className="rating-component mt-4">
            <label className="mt-4 text-base font-medium dark:text-white">
                Média de avaliação
            </label>
            <div className="flex items-center mt-2">
                {stars}
                <p className="ml-2 text-sm dark:text-white">
                {rating} de {maxRating}
            </p>
            </div>
        </div>
    );
};

export default RatingComponent;
