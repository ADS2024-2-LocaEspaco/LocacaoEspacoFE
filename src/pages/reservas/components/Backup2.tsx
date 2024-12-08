import React, { useState, useEffect } from "react";
import axios from "axios";

interface Reserva {
  id: number;
  id_usuario: number;
  id_anuncio: number;
  qtd_adultos: number;
  qtd_criancas: number;
  qtd_bebes: number;
  qtd_pets: number;
  data_inicial: string;
  data_final: string;
  prazo_cancelamento: string;
  status_aceite: string;
  status_reserva: string;
  status_pagamento: string;
  criado_em: string;
  titulo?: string; // Propriedade para armazenar o título do anúncio
}

interface ReservaProps {
  selectedDate: string | null;
  idUsuario: string;
}

interface Anuncio {
  id: number;
  titulo: string;
}

const Gerenciar_reservas: React.FC<ReservaProps> = ({ selectedDate, idUsuario }) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [localAtivo, setLocalAtivo] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedDate || !idUsuario) return;

    const fetchReservas = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000/reservas/dados", {
          params: { id_usuario: idUsuario },
        });

        const allReservas = response.data.Reservas.reserva || [];
        const { Anuncio } = response.data;

        // Lista de anúncios disponíveis
        const anuncios = Array.isArray(Anuncio.anuncio) ? Anuncio.anuncio : [Anuncio.anuncio];

        // Filtra reservas com base na data
        const filteredReservas = allReservas.filter((reserva: Reserva) => {
          const dataInicial = new Date(reserva.data_inicial);
          const dataFinal = new Date(reserva.data_final);
          const dataSelecionada = new Date(selectedDate);
          return dataSelecionada >= dataInicial && dataSelecionada <= dataFinal;
        });

        // Combina título do anúncio com reservas
        const reservasComTitulos = filteredReservas.map((reserva: Reserva) => {
          const anuncio = anuncios.find((a: Anuncio) => a.id === reserva.id_anuncio);
          return {
            ...reserva,
            titulo: anuncio ? anuncio.titulo : "Sem título",
          };
        });

        setReservas(reservasComTitulos);
        setLocalAtivo(reservasComTitulos.length > 0 ? reservasComTitulos[0].id : null);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [selectedDate, idUsuario]);

const updateStatus = async (reservaId: number, status: "Aceita" | "Negada") => {
  try {
    // Envia a requisição ao backend para atualizar o status de aceite
    const response = await axios.put("http://localhost:4000/host/aceite", null, {
      params: {
        status_aceite: status,
        id_reserva: reservaId,
        id_usuario: idUsuario,
      },
    });

    // Verifica a resposta do backend (opcional)
    console.log(`Reserva ${reservaId} atualizada para ${status}:`, response.data);

    // Atualiza o estado local para refletir a alteração
    setReservas((prevReservas) =>
      prevReservas.map((reserva) =>
        reserva.id === reservaId ? { ...reserva, status_aceite: status } : reserva
      )
    );
  } catch (error) {
    console.error(`Erro ao atualizar o status da reserva ${reservaId}:`, error);
  }
};


  const reservaAtiva = reservas.find((reserva) => reserva.id === localAtivo);

  if (loading) {
    return <div className="text-center">Carregando...</div>;
  }

  if (!reservas.length) {
    return (
      <div className="text-center text-gray-600">
        Nenhuma reserva encontrada para a data selecionada ({selectedDate}).
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-100 p-4 rounded-md shadow-lg w-8/12 m-20">
      {/* Abas superiores */}
      <div className="flex space-x-2 border-b border-gray-300 mb-4 overflow-x-auto">
        {reservas.map((reserva) => (
          <button
            key={reserva.id}
            onClick={() => setLocalAtivo(reserva.id)}
            className={`px-4 py-2 ${
              localAtivo === reserva.id
                ? "bg-gray-300 font-bold"
                : "bg-gray-200 hover:bg-gray-300"
            } rounded-t-md whitespace-nowrap`}
          >
            {reserva.titulo}
          </button>
        ))}
      </div>

      {/* Conteúdo da aba ativa */}
      {reservaAtiva && (
        <div className="bg-white p-4 rounded-md shadow-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{`Reserva ${reservaAtiva.id}`}</h2>
            <span className="text-sm">{`Data: ${selectedDate}`}</span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span>Status:</span>
            <span
              className={`px-2 py-1 text-sm font-semibold rounded ${
                reservaAtiva.status_aceite === "Em Análise"
                  ? "bg-yellow-200 text-yellow-700"
                  : reservaAtiva.status_aceite === "Aceita"
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              {reservaAtiva.status_aceite}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold">Período de reserva:</label>
              <span>
                {new Date(reservaAtiva.data_inicial).toLocaleDateString()} -{" "}
                {new Date(reservaAtiva.data_final).toLocaleDateString()}
              </span>
            </div>
            <div>
              <label className="block text-sm font-semibold">Nº de Adultos:</label>
              <span>{reservaAtiva.qtd_adultos}</span>
            </div>
            <div>
              <label className="block text-sm font-semibold">Nº de Bebês:</label>
              <span>{reservaAtiva.qtd_bebes}</span>
            </div>
            <div>
              <label className="block text-sm font-semibold">Nº de Crianças:</label>
              <span>{reservaAtiva.qtd_criancas}</span>
            </div>
            <div>
              <label className="block text-sm font-semibold">Nº de Pets:</label>
              <span>{reservaAtiva.qtd_pets}</span>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={() => updateStatus(reservaAtiva.id, "Aceita")}
            >
              Aceitar
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={() => updateStatus(reservaAtiva.id, "Negada")}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gerenciar_reservas;
