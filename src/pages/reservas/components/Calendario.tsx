import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBr from "@fullcalendar/core/locales/pt-br";
import Modal from "react-modal";
import axios from "axios";


Modal.setAppElement("#root");

interface Reserva {
  id: number;
  id_anuncio: number;
  data_inicial: string;
  data_final: string;
  criado_em: string;
  status_aceite: string;
}




interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  extendedProps: {
    status: string;
  };
}

interface Anuncio {
  id: number;
  titulo: string;
}



interface CalendarComponentProps {
  idUsuario: string;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ idUsuario }) => {
  console.log("ID do usuário recebido:", idUsuario);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedCell, setSelectedCell] = useState<string | null>(null); // Novo estado para destacar célula clicada
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isYearModalOpen, setIsYearModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const lastDateRef = useRef<{ month: number; year: number } | null>(null);
  const calendarRef = useRef<FullCalendar | null>(null);

  const [debugLogs, setDebugLogs] = useState<string[]>([]); //wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
  const addLog = (message: string) => {
    setDebugLogs((prevLogs) => [...prevLogs, message]);
  };
  

  const months = [
    "Jan.", "Fev.", "Mar.", "Abr.",
    "Mai.", "Jun.", "Jul.", "Ago.",
    "Set.", "Out.", "Nov.", "Dez.",
  ];
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  
const fetchReservations = async () => {
  try {
    const response = await axios.get("http://localhost:4000/reservas/dados", {
      params: { id_usuario: idUsuario },
    });

    const { Reservas, Anuncio } = response.data;

    if (!Reservas || !Reservas.reserva || !Anuncio || !Anuncio.anuncio) {
      addLog("Erro: Dados incompletos retornados da API.");
      return;
    }

    const reservas = Reservas.reserva;
    const anuncios = Array.isArray(Anuncio.anuncio) ? Anuncio.anuncio : [Anuncio.anuncio];

    addLog("Anúncios disponíveis:");
    anuncios.forEach((anuncio: Anuncio) => addLog(JSON.stringify(anuncio)));

    const mappedEvents = reservas.flatMap((reserva: Reserva) => {
      // Encontra o anúncio correspondente para cada reserva
      const anuncioCorrespondente = anuncios.find(
        (anuncio: Anuncio) => anuncio.id === reserva.id_anuncio
      );

      // Verifica se um anúncio correspondente foi encontrado
      const tituloAnuncio = anuncioCorrespondente
        ? anuncioCorrespondente.titulo
        : "Sem título";

      addLog(`Título do anúncio para reserva ${reserva.id}: ${tituloAnuncio}`);

      const startDate = new Date(reserva.data_inicial);
      const endDate = new Date(reserva.data_final);

      const events: CalendarEvent[] = [];

      // Cria eventos para cada dia da reserva
      for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        events.push({
          title: `${tituloAnuncio} - ${new Date(reserva.criado_em).toLocaleDateString()}`,
          start: date.toISOString().split("T")[0],
          end: date.toISOString().split("T")[0],
          extendedProps: {
            status: reserva.status_aceite,
          },
        });
      }

      return events;
    });

    // Atualiza o estado com os eventos mapeados
    setEvents(mappedEvents);
  } catch (error) {
    if (error instanceof Error) {
      addLog(`Erro ao buscar dados: ${error.message}`);
    } else {
      addLog("Erro desconhecido ao buscar dados.");
    }
  }
};



  
  //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  

  const handleDatesSet = (dateInfo: any) => {
    const month = dateInfo.start.getMonth();
    const year = dateInfo.start.getFullYear();

    if (lastDateRef.current?.month === month && lastDateRef.current?.year === year) return;

    lastDateRef.current = { month, year };
    fetchReservations();
  };



  const handleDayClick = (dateInfo: any) => {
    const dateInstance = new Date(dateInfo.date);
    const displayedMonth = dateInfo.view.currentStart.getMonth(); // Mês do calendário exibido
    const displayedYear = dateInfo.view.currentStart.getFullYear(); // Ano do calendário exibido
  
    // Verifica se a data pertence ao mês e ano do calendário exibido
    if (
      dateInstance.getMonth() !== displayedMonth ||
      dateInstance.getFullYear() !== displayedYear
    ) {
      console.log("Célula fora do mês exibido. Clique ignorado.");
      return; // Ignora o clique
    }
  
    const formattedDate = dateInstance.toISOString().split("T")[0];
    setSelectedCell(formattedDate); // Atualiza o estado com a data clicada
    console.log("Data selecionada:", formattedDate);
  };
  


  const handleMonthClick = () => {
    setIsModalOpen(true);
  };


  const handleYearClick = () => {
    setIsYearModalOpen(true);
  };
  

  const handleMonthSelect = (month: number) => {
    const newDate = new Date(selectedYear, month, 1);
    setSelectedDate(newDate);
    setIsModalOpen(false);

    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(newDate);
      fetchReservations();
    }
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    setSelectedDate(new Date(year, selectedDate.getMonth(), 1));
    setIsYearModalOpen(false);
  };

  const eventDidMount = (info: any) => {
    const dot = document.createElement("span");
    dot.style.height = "10px";
    dot.style.width = "10px";
    dot.style.borderRadius = "50%";
    dot.style.display = "inline-block";
    dot.style.marginRight = "8px";
  
    const status = info.event.extendedProps?.status || "Desconhecido";
    switch (status) {
      case "Aguardando_resposta_anfitiao":
        dot.style.backgroundColor = "yellow";
        break;
      case "Aceita":
        dot.style.backgroundColor = "green";
        break;
      case "Negada":
        dot.style.backgroundColor = "red";
        break;
      default:
        dot.style.backgroundColor = "gray";
    }
  
    const titleElement = info.el.querySelector(".fc-event-title");
    if (titleElement) {
      titleElement.prepend(dot);
      titleElement.style.color = "black";
    }
  
    info.el.style.backgroundColor = "transparent";
    info.el.style.border = "none";
  };
  

  //const [anuncios, setAnuncios] = useState<Anuncio[]>([]);


  useEffect(() => {
    fetchReservations();
  
  
    const updateToolbarClickHandler = () => {
      const toolbarTitle = document.querySelector(".fc-toolbar-title") as HTMLElement;
      if (toolbarTitle) {
        toolbarTitle.style.cursor = "pointer";
        toolbarTitle.onclick = handleMonthClick; // Adiciona o clique no mês
      }
    };

    updateToolbarClickHandler();

    return () => {
      const toolbarTitle = document.querySelector(".fc-toolbar-title") as HTMLElement;
      if (toolbarTitle) {
        toolbarTitle.onclick = null; // Remove o clique no mês ao desmontar
      }
    };
  }, [idUsuario]);

  function addGrayBackground(date: any) {
    const dateInstance = new Date(date.date);
    const displayedMonth = date.view.currentStart.getMonth();
    const displayedYear = date.view.currentStart.getFullYear();
    const today = new Date();

    if (selectedCell === date.date.toISOString().split("T")[0]) {
      return "bg-blue-500 text-white"; // Estilo para a célula clicada
    }

    if (dateInstance.getMonth() !== displayedMonth ||
      dateInstance.getFullYear() !== displayedYear) {
      return "bg-gray-400 text-transparent"; // Fora do mês exibido
    }

    if (dateInstance.getFullYear() === today.getFullYear() &&
      dateInstance.getMonth() === today.getMonth() &&
      dateInstance <= today) {
      return "bg-gray-100 text-black"; // Dias passados
    }

    // Dia atual
    if (dateInstance.getFullYear() === today.getFullYear() &&
      dateInstance.getMonth() === today.getMonth() &&
      dateInstance.getDate() === today.getDate()) {
      return "bg-blue-100 text-black border border-blue-500"; // Fundo azul claro, texto preto e borda azul
    }


    return "bg-white text-black"; // Dias do mês exibido
  }
  
  return (
    <div className="container mx-auto p-4">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        locales={[ptBr]}
        locale="pt-br"
        headerToolbar={{
          left: "title",
          center: "",
          right: "",
        }}
        dayCellClassNames={(date) => addGrayBackground(date)}
        ref={calendarRef}
        dateClick={handleDayClick} // Incremental: Adiciona clique na célula
        datesSet={handleDatesSet}
        eventDidMount={eventDidMount}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="calendar p-4">
          <h2 className="text-center text-xl mb-2 cursor-pointer" onClick={handleYearClick}>
            {selectedYear}
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {months.map((month, index) => (
              <div
                key={index}
                className="p-1 text-center text-xl cursor-pointer hover:bg-blue-500"
                onClick={() => handleMonthSelect(index)}
              >
                {month}
              </div>
            ))}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isYearModalOpen}
        onRequestClose={() => setIsYearModalOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="p-4">
          <div className="grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-2 border rounded mt-6 text-center text-2xl cursor-pointer hover:bg-blue-500"
                onClick={() => handleYearSelect(selectedDate.getFullYear() - 1 + i)}
              >
                {selectedDate.getFullYear() - 1 + i}
              </div>
            ))}
          </div>
        </div>
      </Modal>
      <div className="debug-logs">
  <h3>Debug Logs</h3>
  <div style={{ maxHeight: '200px', overflowY: 'scroll', backgroundColor: '#f5f5f5', padding: '10px' }}>
    {debugLogs.map((log, index) => (
      <p key={index} style={{ fontSize: '12px', margin: '0', fontFamily: 'monospace' }}>
        {log}
      </p>
    ))}
  </div>
</div>

      <style jsx>{`
        .container {
          transition: background-color 0.3s, color 0.3s;
        }

        @media (prefers-color-scheme: dark) {
          .container {
            background-color: #4f4f4f;
            color: white;
          }
        }

        .debug-logs {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

          :global(.fc-event) {
           display: block !important;
          color: black !important;
         }

        :global(.modal-content) {
          position: absolute;
          top: 250px;
          left: 100px;
          background: white;
          color: black;
          border-radius: 5px;
          width: 300px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1050;
          transition: background-color 0.3s, color 0.3s;
        }

        @media (prefers-color-scheme: dark) {
          :global(.modal-content) {
            background: #4f4f4f;
            color: white;
          }
        }

        :global(.modal-overlay) {
          background: rgba(0, 0, 0, 0.5);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1040;
        }

        :global(.fc-day-today) {
          background-color: #ececec !important;
          border: 2px solid #cccccc !important;
          color: black !important;
        }

        :global(.fc-daygrid-day:hover) {
          border: 4px solid #00bfff !important;
          transition: border-color 0.3s ease;
        }

        :global(.fc .fc-col-header-cell) {
          background-color: white;
          color: black;
          font-weight: bold;
          border: 1px solid #ddd;
        }
      `}</style>


    </div>
  );
};

export default CalendarComponent;


