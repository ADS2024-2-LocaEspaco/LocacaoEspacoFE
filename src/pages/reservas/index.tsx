import { useState } from "react";
import Tabela from "../reservas/components/Tabela";
import Menu from "../reservas/components/Menu";
import Pesquisa from "../reservas/components/Pesquisa";
import Navbar from "./components/Navbar";
import Calendario from "./components/Calendario";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import ConfigReserva from "./components/ConfigReserva";

const ReservasPage = () => {
  return (
    <div className=" w-full h-auto">
      {/* Navbar */}
      <Navbar />

      {/* Menu de navegação ou filtros */}
      <Menu />

      {/* Conteúdo Principal */}
      <div className="color_auto w-full h-auto p-4">
        <div className="flex justify-between w-full h-auto mx-auto">
          {/* Calendário */}
          <div className="w-3/4 h-auto border-black ">
            <Calendario />
          </div>

          {/* Pesquisa ou Filtros */}
          <div className="w-1/4 h-auto ml-4">
            <ConfigReserva/>
            {/* <Pesquisa onFilter={handleFilter} /> */}
          </div>
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
      border black;
    }
  }

      
`}</style>
    </div>
  );
};

export default ReservasPage;
