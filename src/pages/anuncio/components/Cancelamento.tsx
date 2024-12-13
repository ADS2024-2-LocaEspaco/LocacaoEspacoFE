import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Cancelamento: React.FC = () => {
    const router = useRouter();
    const { id_anuncio } = router.query;
    const data_reembolso: string = '7 de outubro';
    const dataAtual = new Date();
    const [cancelamento, setCancelamento] = useState<any>({});
    const [startDate, setStartDate] = useState<string | null>(null);
    const [maxCancelamento, setMaxCancelamento] = useState<string | null>(null);

    useEffect(() => {
        const { id_anuncio, startDate } = router.query;
        if (id_anuncio && startDate) {
            fetch(`http://localhost:3000/api/anuncio/${id_anuncio}`)
                .then((res) => res.json())
                .then((data) => {
                    setCancelamento(data.politicaCancelamento);
                    setStartDate(startDate as string);
                });
        }
    }, [id_anuncio, router.query]);

    useEffect(() => {
        const dataCancelamentoHandler = (politica: any, startDate: string) => {
            const startDateObj = new Date(startDate);
            const cancelamentoValue: number = Object.values(politica)[0] as number;
            console.log('Cancelamento:', cancelamentoValue);

            const daysDifference = (startDateObj.getTime() - dataAtual.getTime()) / (1000 * 60 * 60 * 24);
            console.log('Diferença de dias:', daysDifference);
            console.log('Data de início:', startDateObj);
            console.log('Data atual:', dataAtual);
            console.log('Data de cancelamento:', cancelamento);

            if (daysDifference <= cancelamentoValue) {
                setMaxCancelamento(null);
            } else {
                const maxCancelamentoDate = new Date(startDateObj.getTime() - cancelamentoValue * 24 * 60 * 60 * 1000);
                setMaxCancelamento(maxCancelamentoDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' }));
                console.log('Data máxima para cancelamento:', maxCancelamento);
                console.log('Valor de cancelamento:', cancelamentoValue);
            }
        };

        if (startDate) {
            dataCancelamentoHandler(cancelamento, startDate);
        }
    }, [startDate, cancelamento, dataAtual]);

    return (
        <div className='text-black-100 p-4'>
            <h1 className='text-black-300 font-bold text-lg'>Política de cancelamento</h1>
            {maxCancelamento ? (
                <div className='flex items-center p-2 m-4'>
                    <p className='text-black-100'>
                        Cancelamento gratuito antes de {maxCancelamento}. Após essa data, será cobrado o valor total da reserva.
                    </p>
                </div>
            ) : (
                <p className='text-black-100'>Não é possível cancelar esta reserva.</p>
            )}
        </div>
    );
};

export default Cancelamento;