import Tabela from '../reservas/components/Tabela'; // Caminho relativo para o componente

const ReservasPage = () => {
    return (
        <div className="w-full h-auto p-4 bg-white"> {/* Definindo tamanho e estilo da div */}
            <h1 className="text-2xl font-bold mb-4">Página de Reservas</h1>
            <div className="w-3/4 h-auto mx-auto"> {/* Tamanho personalizado da div que contém a tabela */}
                <Tabela /> {/* Exibe o componente Tabela */}
            </div>
        </div>
    );
};

export default ReservasPage;