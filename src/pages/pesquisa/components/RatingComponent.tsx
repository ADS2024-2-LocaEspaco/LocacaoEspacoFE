import Image from 'next/image';
import StarFill from "../../../../public/icons/starFill.svg";
import Star from "../../../../public/icons/star.svg";

interface RatingComponentProps {
    rating: number;
    maxRating?: number;
}

const RatingComponent: React.FC<RatingComponentProps> = ({ rating, maxRating = 5 }) => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
        stars.push(
            <Image
                key={i}
                src={i <= rating ? StarFill : Star}
                alt={i <= rating ? 'Estrela preenchida' : 'Estrela vazia'}
                className="w-4 h-4 lg:w-5 lg:h-5"
            />
        );
    }

    return (
        <div className="text-end mt-4">
            <div className="flex items-center" aria-label={`Avaliação: ${rating} de ${maxRating}`}>
                {stars}
                {/* Mostrado apenas em telas médias */}
                <p className="hidden md:block lg:hidden ml-2 text-sm lg:text-base text-gray-700 dark:text-white">
                    {rating} de {maxRating}
                </p>
            </div>
            {/* Mostrado apenas em telas pequenas e grandes */}
            <p className="block md:hidden lg:block ml-2 text-sm lg:text-base text-gray-700 dark:text-white">
                {rating} de {maxRating}
            </p>
        </div>

    );
};

export default RatingComponent;
