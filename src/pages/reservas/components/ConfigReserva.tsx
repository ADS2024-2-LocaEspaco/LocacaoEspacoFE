import React, { useState } from "react";

const ConfigReserva: React.FC = () => {

  const [isBlocked, setIsBlocked] = useState(false);
  const [precoDiaria, setPrecoDiaria] = useState(0);
  const [taxaLimpeza, setTaxaLimpeza] = useState(0);
  const [estadiaMinima, setEstadiaMinima] = useState(1);
  const [estadiaMaxima, setEstadiaMaxima] = useState(7);
  const [antecedenciaReserva, setAntecedenciaReserva] = useState(0);
  const [horarioCheckin, setHorarioCheckin] = useState("00:00");
  const [horarioCheckout, setHorarioCheckout] = useState("23:59");
  const [precheckinPeriodo, setPrecheckinPeriodo] = useState(2);

  const handleSalvar = () => {
    // Lógica para salvar as configurações
    console.log({
      isBlocked,
      precoDiaria,
      taxaLimpeza,
      estadiaMinima,
      estadiaMaxima,
      antecedenciaReserva,
      horarioCheckin,
      horarioCheckout,
      precheckinPeriodo,
    });
  };

  return (
    <div className="color_auto p-4 max-w-lg h-full mx-auto shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-6">Configurações</h2>
      <p className="text-gray-500  mb-2">
        Você pode alterar as definições de reservas para todas as datas.
      </p>
      <hr/>

      {/* Bloquear o Dia */}
      <div className="mb-2">
        <h3 className="font-semibold">Bloquear o Dia</h3>
        <p className="text-sm text-gray-500 mb-2">
          Ao bloquear um dia, nenhuma reserva poderá ser realizada para esta
          data.
        </p>
        <button className={`w-full py-2 rounded-md ${
            isBlocked ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
          onClick={() => setIsBlocked(!isBlocked)}
        >
          {isBlocked ? "Bloqueado" : "Desbloqueado"}
        </button>
      </div>
      <hr/>

      {/* Sobre os Preços */}
      <div className="my-2">
        <h3 className="font-semibold">Sobre os Preços</h3>
        <label className="block text-xs mb-1">Preço da Diária</label>
        <input
          type="number"
          value={precoDiaria}
          onChange={(e) => setPrecoDiaria(Number(e.target.value))}
          className="w-full border px-2 py-1 rounded-md mb-2"
        />
        <label className="block text-xs mb-1">Taxa de Limpeza</label>
        <input
          type="number"
          value={taxaLimpeza}
          onChange={(e) => setTaxaLimpeza(Number(e.target.value))}
          className="w-full border px-2 py-1 rounded-md"
        />
      </div>
      <hr/>

      {/* Sobre as Reservas */}
      <div className="mb-4">
        <h3 className="font-semibold">Sobre as Reservas</h3>
        <label className="block text-xs mb-1">Estadia Mínima</label>
        <input
          type="number"
          value={estadiaMinima}
          onChange={(e) => setEstadiaMinima(Number(e.target.value))}
          className="w-full border px-2 py-1 rounded-md mb-2"
        />
        <label className="block text-xs mb-1">Estadia Máxima</label>
        <input
          type="number"
          value={estadiaMaxima}
          onChange={(e) => setEstadiaMaxima(Number(e.target.value))}
          className="w-full border px-2 py-1 rounded-md mb-2"
        />
        <label className="block text-xs mb-1">
          Tempo Mínimo de Antecedência de Reserva
        </label>
        <input
          type="number"
          value={antecedenciaReserva}
          onChange={(e) => setAntecedenciaReserva(Number(e.target.value))}
          className="w-full border px-2 py-1 rounded-md"
        />
      </div>
      <hr/>

      {/* Sobre os Horários */}
      <div className="mb-4">
        <h3 className="font-semibold">Sobre os Horários</h3>
        <label className="block text-xs mb-1">Horário de Check-in</label>
        <input
          type="time"
          value={horarioCheckin}
          onChange={(e) => setHorarioCheckin(e.target.value)}
          className="w-full border px-2 py-1 rounded-md mb-2"
        />
        <label className="block text-xs mb-1">Horário de Check-out</label>
        <input
          type="time"
          value={horarioCheckout}
          onChange={(e) => setHorarioCheckout(e.target.value)}
          className="w-full border px-2 py-1 rounded-md"
        />
      </div>
      <hr/>

      {/* Sobre as Multas */}
      <div className="mb-4">
        <h3 className="font-semibold">Sobre as Multas</h3>
        <label className="block text-xs mb-1">Período Pré-check-in</label>
        <input
          type="number"
          value={precheckinPeriodo}
          onChange={(e) => setPrecheckinPeriodo(Number(e.target.value))}
          className="w-full border px-2 py-1 rounded-md"
        />
      </div>

      <hr/>

      {/* Botão Salvar */}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
        onClick={handleSalvar}
      >
        SALVAR
      </button>
      <style jsx>{`
  /* Estilo para tema claro */
  .color_auto {
    background-color: white;
    color: black;
  }

  /* Estilo para tema escuro */
  @media (prefers-color-scheme: dark) {
    .color_auto {
      background-color: #1c1c1c;
      color: white;
      border black;
      
    }
       input {
      color: black;
      border: 1px solid #444; 
    }
  }

      
`}</style>
    </div>
  );
};

export default ConfigReserva;
