import { useRouter } from 'next/router';
import React from 'react';

const Cancelamento: React.FC = () => {
    const router = useRouter();
    const { id_anuncio } = router.query;
    const data_gratuita: string = '14 de setembro';
    const data_reembolso: string = '7 de outubro';

    return (
        <div>
            <h1>Política de cancelamento</h1>
            <p>Cancelamento gratuito antes de {data_gratuita}.
                Se você cancelar antes de {data_reembolso}, receberá um reembolso parcial.
            </p>

        </div>
    );
};

export default Cancelamento;