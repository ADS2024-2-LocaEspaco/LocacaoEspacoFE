import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";
import ConfigReserva from "../../components/ConfigReserva";
import Gerenciar_reservas from "../../components/Gerenciar_reservas";
import CalendarComponent from "../../components/Calendario";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { useState } from "react";

const ReservasPage = () => {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da URL
  const idUsuario = Array.isArray(id) ? id[0] : id || "";
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (!id) {
    return <div>Erro: ID do usuário não foi encontrado na URL.</div>;
  }

  // Função que será passada para o componente Calendário
  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    console.log("Data clicada enviada para Gerenciar_reservas:", date);
  };

  return (
    <div className="w-full h-auto">
      {/* Navbar */}
      <Navbar />

      {/* Menu de navegação ou filtros */}
      <Menu />

      {/* Conteúdo Principal */}
      <div className="color_auto w-full h-auto p-4">
        <div className="flex justify-between w-full h-auto mx-auto">
          {/* Calendário */}
          <div className="w-3/4 h-auto border-black">
            <CalendarComponent idUsuario={idUsuario} onDateClick={handleDateClick} />
          </div>

          {/* Pesquisa ou Filtros */}
          <div className="w-1/4 h-auto ml-4">
            <ConfigReserva />
          </div>
        </div>
        <div>
        <Gerenciar_reservas selectedDate={selectedDate} idUsuario={idUsuario} />

  


        </div>
      </div>
      <style jsx>{`
        /* Estilo para tema claro */
        .color_auto {
          background-color: white;
          color: black;
        }

        /* Estilo para tema escuro */
        @media (prefers-color-scheme: dark) {
          .color_auto {
            background-color: #363636;
            color: white;
          }
        }
      `}</style>
    </div>
  );
};

export default ReservasPage;
