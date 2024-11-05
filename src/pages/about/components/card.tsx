import Image from "next/image";

interface CardProps {
    image: string

}

export default function Card() {
    return (
        <div className="w-[260px] shadow-md px-4 py-7 space-y-4 rounded-lg text-center bg-white">
            {/* <Image src={TargetIcon} alt="Ícone de objetivo" className="mx-auto" /> */}

            <p>Nossa <span className="text-blue-600">missão</span> é proporcionar experiências únicas e acessíveis conectando anfitriões e viajantes de todo o mundo.</p>
        </div>
    )
};
