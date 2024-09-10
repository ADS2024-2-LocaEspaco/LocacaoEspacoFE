import { useState } from 'react';

interface Reserva {
    id: number;
    data: string;
    status: string;
    imovel: string;
    nome: string;
    periodo: string;
    aprovado: boolean;
    recusado: boolean;
}

const Tabela: React.FC = () => {
    const [reservas, setReservas] = useState<Reserva[]>([
        { id: 1, data: '2024-09-01', status: 'Pendente', imovel: 'Casa 1', nome: 'João', periodo: '10h-12h', aprovado: false, recusado: false },
        { id: 2, data: '2024-09-02', status: 'Confirmado', imovel: 'Casa 2', nome: 'Maria', periodo: '14h-16h', aprovado: false, recusado: false },
        { id: 3, data: '2024-09-01', status: 'Pendente', imovel: 'Casa 3', nome: 'Pedro', periodo: '10h-12h', aprovado: false, recusado: false },
        { id: 4, data: '2024-09-02', status: 'Confirmado', imovel: 'Casa 4', nome: 'Ana', periodo: '14h-16h', aprovado: false, recusado: false },
    ]);

    const handleAprovar = (id: number) => {
        setReservas(reservas.map((reserva) =>
            reserva.id === id
                ? { ...reserva, aprovado: !reserva.aprovado, recusado: false }
                : reserva
        ));
    };

    const handleRecusar = (id: number) => {
        setReservas(reservas.map((reserva) =>
            reserva.id === id
                ? { ...reserva, recusado: !reserva.recusado, aprovado: false }
                : reserva
        ));
    };

    return (
        <div className="h-full w-full p-4">
            <table className="min-w-full bg-white border border-black">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2 border-b border-black border-r">Data</th>
                        <th className="px-4 py-2 border-b border-black border-r">Status</th>
                        <th className="px-4 py-2 border-b border-black border-r">Imóvel</th>
                        <th className="px-4 py-2 border-b border-black border-r">Nome</th>
                        <th className="px-4 py-2 border-b border-black border-r">Período da Reserva</th>
                        <th className="px-4 py-2 border-b border-black border-r">Aprovar</th>
                        <th className="px-4 py-2 border-b border-black">Recusar</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva, index) => (
                        <tr key={reserva.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                            <td className="px-4 py-2 border-r border-black">{reserva.data}</td>
                            <td className="px-4 py-2 border-r border-black">{reserva.status}</td>
                            <td className="px-4 py-2 border-r border-black">{reserva.imovel}</td>
                            <td className="px-4 py-2 border-r border-black">{reserva.nome}</td>
                            <td className="px-4 py-2 border-r border-black">{reserva.periodo}</td>
                            <td className="px-4 py-2 border-r border-black">
                                <button
                                    onClick={() => handleAprovar(reserva.id)}
                                >
                                    <span className={`material-icons-sharp ${reserva.aprovado ? 'text-green-400' : 'text-gray-200'}`}>
                                        check
                                    </span>
                                </button>
                            </td>
                            <td className="px-4 py-2 border-black">
                                <button
                                    onClick={() => handleRecusar(reserva.id)}
                                >
                                    <span className={`material-icons-sharp ${reserva.recusado ? 'text-red-300' : 'text-gray-200'}`}>
                                        close
                                    </span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tabela;
