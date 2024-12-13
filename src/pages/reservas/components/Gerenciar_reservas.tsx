import React, { useState, useEffect } from "react";
import axios from "axios";

interface Usuario {
  id: number;
  nome: string;
}

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
  titulo?: string;
}

interface ReservaProps {
  selectedDate: string | null;
  idUsuario: string;
  onReservaAtualizada?: () => void; // Callback para notificar mudanças
}

interface Anuncio {
  id: number;
  titulo: string;
}

const Gerenciar_reservas: React.FC<ReservaProps> = ({ selectedDate, idUsuario, onReservaAtualizada }) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [localAtivo, setLocalAtivo] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState<Reserva | null>(null);

  useEffect(() => {
    if (!selectedDate || !idUsuario) return;

    const fetchReservas = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000/reservas/dados", {
          params: { id_usuario: idUsuario },
        });

        const data = response.data;

        if (!Array.isArray(data) || data.length === 0) {
          console.error("Nenhum dado encontrado.");
          return;
        }

        const todasReservas: Reserva[] = [];
        const todosAnuncios: Anuncio[] = [];

        data.forEach((item: any) => {
          const { anuncio, reservas } = item;

          if (anuncio) todosAnuncios.push(anuncio);

          if (reservas) {
            reservas.forEach((reservaData: any) => {
              const { reserva } = reservaData;
              if (reserva) {
                todasReservas.push({
                  ...reserva,
                  titulo: anuncio?.titulo || "Sem título",
                });
              }
            });
          }
        });

        const filteredReservas = todasReservas.filter((reserva) => {
          const dataInicial = new Date(reserva.data_inicial);
          const dataFinal = new Date(reserva.data_final);
          const dataSelecionada = new Date(selectedDate);
          return dataSelecionada >= dataInicial && dataSelecionada <= dataFinal;
        });

        setReservas(filteredReservas);
        setAnuncios(todosAnuncios);
        setLocalAtivo(filteredReservas.length > 0 ? filteredReservas[0].id : null);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [selectedDate, idUsuario]);

  const updateStatus = async (idReserva: number, idUsuario: string, statusAceite: number) => {
    try {
      const response = await axios.put("http://localhost:4000/reservas/aceite", null, {
        params: {
          status_aceite: statusAceite,
          id_reserva: idReserva,
          id_usuario: idUsuario,
        },
      });

      if (response.data) {
        setReservas((prevReservas) =>
          prevReservas.map((reserva) =>
            reserva.id === idReserva ? { ...reserva, status_aceite: response.data.status_aceite } : reserva
          )
        );

        if (onReservaAtualizada) {
          onReservaAtualizada();
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar reserva:", error);
    }
  };

  const abrirModal = (reserva: Reserva) => {
    setReservaSelecionada(reserva);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setReservaSelecionada(null);
  };

  const confirmarCancelamento = () => {
    if (reservaSelecionada) {
      updateStatus(reservaSelecionada.id, reservaSelecionada.id_usuario.toString(), 1);
      fecharModal();
    }
  };

  const reservaAtiva = reservas.find((reserva) => reserva.id === localAtivo);

  if (loading) {
    return <div className="text-center"></div>;
  }

  if (!reservas.length) {
    return (
      <div className="text-center text-gray-600">
        Nenhuma reserva encontrada para a data selecionada ({selectedDate}).
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-100 p-4 rounded-md shadow-lg w-full m-0">
      <div className="flex space-x-2 border-b overflow-x-auto">
        {reservas.map((reserva) => (
          <button
            key={reserva.id}
            onClick={() => setLocalAtivo(reserva.id)}
            className={`px-4 mx-1 text-black py-2 mt-2 ${
              localAtivo === reserva.id
                ? "bg-gray-200"
                : "bg-gray-300 hover:bg-gray-300 border-b-2"
            } rounded-t-md whitespace-nowrap`}
          >
            {reserva.titulo}
          </button>
        ))}
      </div>

      {reservaAtiva && (
  <div className="bg-gray-200 h-1/4 p-4 rounded-md shadow-md w-full">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg text-black font-semibold">{`Reserva ${reservaAtiva.id}`}</h2>
      <span className="bg-white border-solid border border-gray-400 rounded-md px-2 text-xs text-black ">{`Data: ${selectedDate}`}</span>
    </div>

    <div className="flex text-black items-center mb-4">
      <span>Status:</span>
      <span
        className={`px-2 py-1 mx-2 text-sm font-semibold rounded ${
          reservaAtiva.status_aceite === "Aceita"
            ? "bg-green-200 text-green-700"
            : reservaAtiva.status_aceite === "Negada"
            ? "bg-red-200 text-red-700"
            : "bg-yellow-200 text-yellow-700"
        }`}
      >
        {reservaAtiva.status_aceite === "Aceita" || reservaAtiva.status_aceite === "Negada"
          ? reservaAtiva.status_aceite
          : "Em análise"}
      </span>
    </div>

    <div className="flex text-black gap-12 mb-4">
      <div className="w-30">
        <label className="block text-xs text-black font-semibold">Período de reserva:</label>
        <span className="bg-white border-solid border border-gray-400 rounded-md px-2 text-xs">
          {new Date(reservaAtiva.data_inicial).toLocaleDateString()}               
        </span>
        {" "}- 
        <span className="bg-white ml-1 border-solid border border-gray-400 rounded-md px-2 text-xs">
          {new Date(reservaAtiva.data_final).toLocaleDateString()}
        </span>
      </div>

      <div className="flex text-black gap-3">
        <div>
          <label className="block text-black w-20 text-xs font-semibold">Nº de Adultos:</label>
          <span className="bg-white ml-3 border-solid border border-gray-400 rounded-md px-2">{reservaAtiva.qtd_adultos}</span>
        </div>
        <div>
          <label className="block text-black w-20 text-xs font-semibold">Nº de Bebês:</label>
          <span className="bg-white ml-3 border-solid border border-gray-400 rounded-md px-2">{reservaAtiva.qtd_bebes}</span>
        </div>
        <div>
          <label className="block text-black w-24 text-xs font-semibold">Nº de Crianças:</label>
          <span className="bg-white ml-3 border-solid border border-gray-400 rounded-md px-2">{reservaAtiva.qtd_criancas}</span>
        </div>
        <div>
          <label className="block text-black w-20 text-xs font-semibold">Nº de Pets:</label>
          <span className="bg-white ml-3 border-solid border border-gray-400 rounded-md px-2">{reservaAtiva.qtd_pets}</span>
        </div>
      </div>
    </div>

    <div className="flex justify-end space-x-4">
      <button
        className="px-3 w-15 h-10 py-2 bg-green-500 text-xs text-white rounded-md hover:bg-green-600"
        onClick={() => updateStatus(reservaAtiva.id, reservaAtiva.id_usuario.toString(), 0)}
      >
        Aceitar
      </button>
      <button
        className="px-3 w-15 h-10 bg-red-500 text-white rounded-md text-xs hover:bg-red-600"
        onClick={() => abrirModal(reservaAtiva)}
      >
        Cancelar
      </button>
    </div>
  </div>
)}


      {modalAberto && (
        <div className="modal fixed inset-0 z-50 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content mx-96 p-6 rounded shadow-lg w-96 z-60">
            <h2 className="text-lg font-semibold mb-4">Tem certeza?</h2>
            <p className="mb-4 text-sm">
              Ao cancelar uma reserva dentro do prazo estabelecido, você será cobrado uma multa por cancelamento de 10% do valor da reserva.
            </p>
            <img
              src="/icons/cancel-button-svgrepo-com.svg"
              alt="Confirmar"
              className="w-20 h-20 mx-20 my-6"
               />
                <div className="flex justify-center  space-x-4">
                <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={fecharModal}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmarCancelamento}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
        <style jsx>{`
          .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          }

          .modal-content {
          background: #dcdcdc;
          padding: 20px;          
          border-radius: 8px;
          text-align: center;
          max-width: 400px;
          }

          @media (prefers-color-scheme: dark) {
          .modal-content {
          background: black;
          color: white;
            }
          }

          .modal-actions {
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
          }
        `}</style>
    </div>
  );
};

export default Gerenciar_reservas;
