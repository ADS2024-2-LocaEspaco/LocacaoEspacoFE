/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Comodidade {
    nome: string;
    icone: string;
}

interface AnuncioCardProps {
    imagens: string[];
    titulo: string;
    nota: number;
    comodidades: Comodidade[];
}

const AnuncioCard: React.FC = () => {
    const router = useRouter();
    const { id_anuncio } = router.query;
    const [anuncio, setAnuncio] = useState<AnuncioCardProps | null>(null);

    useEffect(() => {
        if (id_anuncio) {
            fetch(`http://localhost:3001/anuncio/${id_anuncio}`)
                .then(res => res.json())
                .then(data => setAnuncio(data))
                .catch(err => console.error(err));
        }
    }, [id_anuncio]);

    if (!anuncio) {
        return <div>Carregando anuncio...</div>;
    }

    const { titulo, imagens, comodidades } = anuncio;
    const nota = anuncio.nota.toFixed(1);

    return (
        <div className="w-full h-full text-black-300">
            <div className="flex flex-col border border-[#f1f1f3] rounded-[10px] w-dvh  max-w-[546px] h-auto shadow-md p-4">
                <div className="flex flex-row items-center">
                    <img
                        src={imagens[0]}
                        alt={titulo}
                        className="w-[180px] h-[130px] rounded-[10%] object-cover"
                    />
                    <div className="ml-4">
                        <h2 className="text-lg font-semibold">{titulo}</h2>
                        <div className="flex gap-2 mt-2">
                            {comodidades.map((comodidade, index) => (
                                <img key={index} src={comodidade.icone} alt={comodidade.nome} className="h-[15px]" />
                            ))}
                        </div>
                        <div className="mt-4">
                            <span>{nota} Estrelas</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnuncioCard;