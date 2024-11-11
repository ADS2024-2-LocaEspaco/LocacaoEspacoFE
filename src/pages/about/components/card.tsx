import Image from "next/image";

interface CardProps {
    pathImage: string
    children: React.ReactNode
}

export default function Card({ pathImage, children }: CardProps) {
    return (
        <div className="h-[220px] max-md:h-[160px] w-[260px] shadow-md px-4 max-md:px-3 py-7 max-md:py-2 space-y-4 rounded-lg text-center  bg-white dark:bg-black-100">
            <Image src={pathImage} alt="Ícone de objetivo" className="mx-auto" />

            {children}
        </div>
    )
};
