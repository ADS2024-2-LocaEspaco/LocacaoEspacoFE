import { useState } from 'react';

const Pesquisa: React.FC<{ onFilter: (filters: any) => void }> = ({ onFilter }) => {
    const [filters, setFiltros] = useState({
        data: false,
        status: false,
        imovel: false,
        nome: false,
        periodo: false,
        periodoInicio: '',
        periodoFim: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setFiltros((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = () => {
        onFilter(filters);
    };

    return (
        <div className="flex flex-col p-4 bg-gray-100 rounded-md">
            <h2 className="text-xl font-bold mb-2">Pesquisar</h2>
            <div className="flex flex-col p-4 mb-2">
                <label className="block font-semibold">Filtros:</label>
                <label>
                    <input type="checkbox" name="data" checked={filters.data} onChange={handleChange} />
                    Data
                </label>
                <label>
                    <input type="checkbox" name="status" checked={filters.status} onChange={handleChange} />
                    Status
                </label>
                <label>
                    <input type="checkbox" name="imovel" checked={filters.imovel} onChange={handleChange} />
                    Imóvel
                </label>
                <label>
                    <input type="checkbox" name="nome" checked={filters.nome} onChange={handleChange} />
                    Nome
                </label>
                <label>
                    <input type="checkbox" name="periodo" checked={filters.periodo} onChange={handleChange} />
                    Período de Reserva
                </label>
            </div>
            <div className="mb-2">
                <label className="block font-semibold">Pesquisar por Período:</label>
                <input
                    type="date"
                    name="periodoInicio"
                    value={filters.periodoInicio}
                    onChange={handleChange}
                    className="border px-2 py-1 mb-2"
                />
                até
                <input
                    type="date"
                    name="periodoFim"
                    value={filters.periodoFim}
                    onChange={handleChange}
                    className="border px-2 py-1 ml-2"
                />
            </div>
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
                Pesquisar
            </button>
        </div>
    );
};

export default Pesquisa;

