import { useState } from 'react';
import Tabela from '../reservas/components/Tabela';
import Menu from '../reservas/components/Menu';
import Pesquisa from '../reservas/components/Pesquisa';

const ReservasPage = () => {
    const [filtros, setFiltros] = useState({});
    const [reservas, setReservas] = useState([
        { id: 1, data: '2024-09-01', status: 'Pendente', imovel: 'Casa 1', nome: 'João', periodo: '10h-12h', aprovado: false, recusado: false },
        { id: 2, data: '2024-09-02', status: 'Confirmado', imovel: 'Casa 2', nome: 'Maria', periodo: '14h-16h', aprovado: false, recusado: false },
        // ... outras reservas
    ]);

    const handleFilter = (newFilters: any) => {
        setFiltros(newFilters);
    };

    const reservasFiltradas = reservas.filter((reserva) => {
        if (filtros.data && !reserva.data.includes(filtros.data)) return false;
        if (filtros.status && !reserva.status.includes(filtros.status)) return false;
        if (filtros.imovel && !reserva.imovel.includes(filtros.imovel)) return false;
        if (filtros.nome && !reserva.nome.includes(filtros.nome)) return false;
        if (filtros.periodo && (reserva.periodo < filtros.periodoInicio || reserva.periodo > filtros.periodoFim)) return false;
        return true;
    });

    return (
        <div className="w-full h-auto bg-white">
            <Menu />

            <div className="w-full h-auto p-4 bg-white"> 
                <h1 className="text-2xl font-bold mb-4">Página de Reservas</h1>

                <div className="flex justify-between w-full h-auto mx-auto">
                    <div className="w-3/4 h-auto">
                        <Tabela reservas={reservasFiltradas} />
                    </div>

                    <div className="w-1/4 h-auto ml-4">
                        <Pesquisa onFilter={handleFilter} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservasPage;

