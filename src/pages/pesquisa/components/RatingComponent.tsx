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
                alt={i <= rating ? 'Filled Star' : 'Empty Star'}
                className="size-9"
            />
        );
    }

    return (
        <div className="rating-component">
            <div className="flex items-center">
                {stars}
                <p className="ml-2 text-sm dark:text-white">
                    {rating} de {maxRating}
                </p>
            </div>
        </div>
    );
};

export default RatingComponent;
