import React, { useState } from "react";

interface ReservaProps {
  local: string;
  nome: string;
  data: string;
  status: string;
  periodo: { inicio: string; fim: string };
  detalhes: {
    adultos: number;
    bebes: number;
    criancas: number;
    pets: number;
  };
}

const reservas = [
  {
    local: "Local A",
    nome: "Nome de quem agendou",
    data: "10/10/2024",
    status: "Em Análise",
    periodo: { inicio: "18/10/2024", fim: "26/10/2024" },
    detalhes: { adultos: 100, bebes: 100, criancas: 100, pets: 100 },
  },
  {
    local: "Local B",
    nome: "Nome de quem agendou",
    data: "15/10/2024",
    status: "Confirmado",
    periodo: { inicio: "20/10/2024", fim: "30/10/2024" },
    detalhes: { adultos: 50, bebes: 30, criancas: 40, pets: 10 },
  },
];

const Gerenciar_reservas: React.FC = () => {
  const [localAtivo, setLocalAtivo] = useState("Local A");

  const reservaAtiva = reservas.find((reserva) => reserva.local === localAtivo);

  return (
    <div className="flex flex-col bg-gray-100 p-4 rounded-md shadow-lg w-8/12 m-20">
      {/* Abas superiores */}
      <div className="flex space-x-2 border-b border-gray-300 mb-4">
        {reservas.map((reserva) => (
          <button
            key={reserva.local}
            onClick={() => setLocalAtivo(reserva.local)}
            className={`px-4 py-2 ${
              localAtivo === reserva.local
                ? "bg-gray-300 font-bold"
                : "bg-gray-200 hover:bg-gray-300"
            } rounded-t-md`}
          >
            {reserva.local}
          </button>
        ))}
      </div>

      {/* Conteúdo da aba ativa */}
      {reservaAtiva && (
        <div className="bg-white p-4 rounded-md shadow-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{reservaAtiva.nome}</h2>
            <span className="text-sm">Data: {reservaAtiva.data}</span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span>Status:</span>
            <span
              className={`px-2 py-1 text-sm font-semibold rounded ${
                reservaAtiva.status === "Em Análise"
                  ? "bg-yellow-200 text-yellow-700"
                  : "bg-green-200 text-green-700"
              }`}
            >
              {reservaAtiva.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold">Período de reserva:</label>
              <span>
                {reservaAtiva.periodo.inicio} - {reservaAtiva.periodo.fim}
              </span>
            </div>
            <div>
              <label className="block text-sm font-semibold">Nº de Adultos:</label>
              <span>{reservaAtiva.detalhes.adultos}</span>
            </div>
            <div>
              <label className="block text-sm font-semibold">Nº de Bebês:</label>
              <span>{reservaAtiva.detalhes.bebes}</span>
            </div>
            <div>
              <label className="block text-sm font-semibold">Nº de Crianças:</label>
              <span>{reservaAtiva.detalhes.criancas}</span>
            </div>
            <div>
              <label className="block text-sm font-semibold">Nº de Pets:</label>
              <span>{reservaAtiva.detalhes.pets}</span>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex justify-end space-x-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Aceitar
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gerenciar_reservas;
