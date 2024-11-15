import React from "react";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const etapas = {
    etapa1: [
      '/imovel/cadastroImovel/tipoImovel',
      '/imovel/cadastroImovel/tipoEspaco',
      '/imovel/cadastroImovel/endereco',
      '/imovel/cadastroImovel/acomodacoes',
    ],
    etapa2: [
      '/imovel/cadastroImovel/comodidades',
      '/imovel/cadastroImovel/comodidadesEspeciais',
      '/imovel/cadastroImovel/seguranca',
      '/imovel/cadastroImovel/imagem',
      '/imovel/cadastroImovel/tituloEdescricao',
    ],
    etapa3: [
      '/imovel/cadastroImovel/cameraAviso',
      '/imovel/cadastroImovel/camera',
      '/imovel/cadastroImovel/tipoReserva',
      '/imovel/cadastroImovel/tiposHospede',
      '/imovel/cadastroImovel/valorEreserva',
      '/imovel/cadastroImovel/prototipo',
    ],
  };

const allPages = [...etapas.etapa1, ...etapas.etapa2, ...etapas.etapa3];

const ProgressoCadastro = () => {
    const router = useRouter();
    //const [currentStep, setCurrentStep] = useState(allPages.indexOf(router.pathname));
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const completedPages = JSON.parse(localStorage.getItem('completedPages') || '[]');

        const progressoAtual = (completedPages.length / allPages.length) * 100;
        setProgress(progressoAtual);
    }, [router.pathname]);

    const marcarPaginaComoConcluida = (paginaAtual: string) => {
        const completedPages = JSON.parse(localStorage.getItem('completedPages') || '[]');

        if (!completedPages.includes(paginaAtual)) {
            completedPages.push(paginaAtual);
            localStorage.setItem('completedPages', JSON.stringify(completedPages));
        }
    };

    useEffect(() => {
        marcarPaginaComoConcluida(router.pathname);
    }, [router.pathname]);

    return (
        <div className="w-full fixed bottom-0 h-2 bg-gray-300">
          <div
            className="h-full bg-black-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      );

}

export default ProgressoCadastro;