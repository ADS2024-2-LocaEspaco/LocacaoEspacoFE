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
            fetch(`http://localhost:3000/api/anuncio/${id_anuncio}`)
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
        <div className='h-full w-full flex -justify-center items-center'>
        <div className='justify-evenly items-center flex-col flex border border-[#f1f1f3] rounded-[10px] w-[357px] h-[342px] shadow-md'>
            <div className='justify-center items-center flex flex-col '>
            <img
                src={imagens[0]}
                alt={titulo}
                className='p-2 max-h-[160px] rounded-[15%]'
            />
            <div className='text-black-300 font-semibold my-0'>
                {titulo}
            </div>
            </div>

            <div className='flex row gap-2'>
            {comodidades.map((comodidade, index) => (
                <img key={index} src={comodidade.icone} alt={comodidade.nome} className='icon-class  h-[20px]' />
            ))}
            </div>

            <div>
            {nota} Estrelas
            </div>
        </div>
        </div>
    );
};

export default AnuncioCard;