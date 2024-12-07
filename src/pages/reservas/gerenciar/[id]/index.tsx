import { useParams } from "react-router-dom"; // Import para capturar o ID da URL
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";
import ConfigReserva from "../../components/ConfigReserva";
import Gerenciar_reservas from "../../components/Gerenciar_reservas";
import CalendarComponent from "../../components/Calendario";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

const ReservasPage = () => {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da URL
  const idUsuario = Array.isArray(id) ? id[0] : id || "";

  if (!id) {
    return <div>Erro: ID do usuário não foi encontrado na URL.</div>;
  }

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
          <CalendarComponent idUsuario={idUsuario} />

          </div>

          {/* Pesquisa ou Filtros */}
          <div className="w-1/4 h-auto ml-4">
            <ConfigReserva />
          </div>
        </div>
        <div>
          <Gerenciar_reservas />
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
