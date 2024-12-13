/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetDadosAvaliacao } from '@/utils/api';

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

const mockComodidades: Comodidade[] = [
    { nome: 'Jardim amplo', icone: '/icons/outdoor_garden_icon.svg' },
    { nome: 'Wi-Fi', icone: '/icons/wifi_icon.svg' },
    { nome: 'Ar Condicionado', icone: '/icons/ice_icon.svg' },
    { nome: 'Acessibilidade', icone: '/icons/accessibility_icon.svg' },
    { nome: 'Piscina', icone: '/icons/pool_icon.svg' },
    { nome: 'Cozinha', icone: '/icons/restaurant_icon.svg' },
    { nome: 'Máquina de Lavar', icone: '/icons/laundry_icon.svg' },
    { nome: 'Permitido animais', icone: '/icons/pets_icon.svg' },
    { nome: 'Área para churrasco', icone: '/icons/outdoor_grill_icon.svg' },
    { nome: 'Garagem para quatro carros', icone: '/icons/car_icon.svg' }
];

const AnuncioCard: React.FC = () => {
    const router = useRouter();
    const { id_anuncio } = router.query;
    const [anuncio, setAnuncio] = useState<AnuncioCardProps | null>(null);
    const [averageRating, setAverageRating] = useState<number | null>(null);

    useEffect(() => {
        if (id_anuncio) {
            fetch(`http://localhost:4000/anuncio/${id_anuncio}`)
                .then(res => res.json())
                .then(data => setAnuncio(data))
                .catch(err => console.error(err));
        }
    }, [id_anuncio]);

    useEffect(() => {
        if (id_anuncio) {
            GetDadosAvaliacao(id_anuncio as string)
                .then(data => {
                    const totalNotas = Object.values(data.media_notas).map(Number);
                    const somaNotas = totalNotas.reduce((acc, curr) => acc + curr, 0);
                    const media = (somaNotas / totalNotas.length).toFixed(1);
                    setAverageRating(parseFloat(media));
                })
                .catch(err => console.error(err));
        }
    }, [id_anuncio]);

    if (!anuncio) {
        return <div>Carregando anuncio...</div>;
    }

    const { titulo, imagens } = anuncio;

    return (
        <div className="w-full max-w-[400px] h-full text-black-300">
            <div className="flex flex-col border border-[#f1f1f3] rounded-[10px] shadow-md p-4">
                {imagens && imagens.length > 0 ? (
                    <img
                        src={imagens[0]}
                        alt={titulo}
                        className="w-full h-[250px] rounded-lg object-cover mb-4"
                    />
                ) : (
                    <div className="w-full h-[250px] rounded-lg bg-gray-200 flex items-center justify-center mb-4">
                        <span>Sem imagem</span>
                    </div>
                )}
                <h2 className="text-xl font-semibold mb-4">{titulo}</h2>
                <div className="flex flex-wrap gap-3 mb-4">
                    {mockComodidades.map((comodidade, index) => (
                        <div key={index} className="flex items-center">
                            <img src={comodidade.icone} alt={comodidade.nome} className="w-5 h-5 mr-2" />
                        </div>
                    ))}
                </div>
                <div className="flex items-center">
                    <span className="text-sm">Nota: {averageRating ? `${averageRating} de 5` : "Sem avaliações"}</span>
                </div>
            </div>
        </div>
    );
};

export default AnuncioCard;