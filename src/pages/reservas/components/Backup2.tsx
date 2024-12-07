// import React, { useState, useEffect, useRef } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import ptBr from "@fullcalendar/core/locales/pt-br";
// import Modal from "react-modal";
// import axios from "axios";

// Modal.setAppElement("#root");

// interface Reserva {
//   data_inicial: string;
//   data_final: string;
//   status_reserva: string;
//   id_anuncio: number;
// }

// interface CalendarEvent {
//   title: string;
//   start: string;
//   end: string;
//   extendedProps: {
//     status: string;
//   };
// }

// interface CalendarComponentProps {
//   idUsuario: string;
// }

// const CalendarComponent: React.FC<CalendarComponentProps> = ({ idUsuario }) => {
//   const [events, setEvents] = useState<CalendarEvent[]>([]);
//   const [logs, setLogs] = useState<string[]>([]); // Para exibir logs na página

//   const addLog = (message: string) => {
//     setLogs((prevLogs) => [...prevLogs, message]);
//   };

//   const fetchReservations = async (idUsuario: string) => {
//     addLog(`Buscando reservas para o ID do usuário: ${idUsuario}`);
//     try {
//       const response = await axios.get("http://localhost:4000/reservas", {
//         params: { id_usuario: idUsuario },
//       });

//       addLog(`Dados recebidos da API: ${JSON.stringify(response.data)}`);

//       if (Array.isArray(response.data)) {
//         const mappedEvents = response.data.flatMap((reserva) => {
//           const startDate = new Date(reserva.data_inicial);
//           const endDate = new Date(reserva.data_final);
//           const events: CalendarEvent[] = [];

//           for (
//             let date = new Date(startDate);
//             date <= endDate;
//             date.setDate(date.getDate() + 1)
//           ) {
//             events.push({
//               title: "Reserva",
//               start: date.toISOString().split("T")[0],
//               end: date.toISOString().split("T")[0],
//               extendedProps: {
//                 status: reserva.status_aceite,
//               },
//             });
//           }

//           return events;
//         });

//         setEvents(mappedEvents);
//         addLog("Eventos mapeados para o calendário");
//       } else {
//         addLog("Erro: A resposta da API não é um array");
//       }
//     } catch (error) {
//       addLog(`Erro ao buscar reservas: ${error}`);
//     }
//   };

//   useEffect(() => {
//     fetchReservations(idUsuario);
//   }, [idUsuario]);

//   return (
//     <div className="container mx-auto p-4">
//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         locales={[ptBr]}
//         locale="pt-br"
//       />
//       {/* Sessão para exibir os logs */}
//       <div className="mt-4 p-2 border rounded bg-gray-100">
//         <h2 className="font-bold">Logs:</h2>
//         <ul className="text-sm">
//           {logs.map((log, index) => (
//             <li key={index}>{log}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CalendarComponent;



// //novo