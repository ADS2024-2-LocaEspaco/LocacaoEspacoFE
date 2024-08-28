import React from "react";

const banheiros = "/icons/shower_icon.svg";
const hospedes = "/icons/group_icon.svg";
const camas = "/icons/bed_icon.svg";
const compartilhar = "/icons/share_icon.svg";
const favoritar = "/icons/favorite_icon.svg";
const mapa = "/icons/map_icon.svg";

const estiloIcone =
  "bg-[#FFD7B8] flex justify-center items-center rounded-full";

const estiloTexto = 'text-[#333333] font-opensans text-[14px] p-0 pl-1 ';

  const IconesAnuncio: React.FC = () => {
  return (
    <div className="flex flew-row justify-between h-4 mt-2 w-[95%] md:w-[80%]">
      {/* Ícones de comodidades */}
      <div className="hidden md:flex flew-row gap-4 ">
        <div className={`${estiloIcone} w-[60px] h-[32px]`}>
          <img src={camas} alt="ícone quantidade de camas" />
          <p className={estiloTexto}>2</p>
        </div>
        <div className={`${estiloIcone} w-[60px] h-[32px]`}>
          <img src={hospedes} alt="ícone quantidade de hóspedes" />
          <p className={estiloTexto}>2</p>
        </div>
        <div className={`${estiloIcone} w-[60px] h-[32px]`}>
          <img src={banheiros} alt="ícone quantidade de banheiros" />
          <p className={estiloTexto}>2</p>
        </div>
      </div>

<div className='flex justify-between md:justify-end w-full'>
      {/* Ícone mapa*/}
      <div className='flex md:justify-end  p-0 m-0'>
        <div className={`${estiloIcone}  w-[150px] h-[32px] text-[14px] bg-[#17A1FA]`}>
          <img src={mapa} alt="ícone mostrar mapa" />{" "}
          <p className={estiloTexto}>Veja no mapa</p>
        </div>
        50{" "}
      </div>

      {/* Ícones de compartilhar e favoritar */}
      <div className="flex flew-row gap-2 justify-end  p-0 m-0">
        <div className={`${estiloIcone} w-[32px] h-[32px] bg-transparent border border-[#333333]	`}>
          <img src={compartilhar} alt="icone compartilhar" className="" />
        </div>
        <div className={`${estiloIcone} w-[32px] h-[32px] rounded-full bg-transparent border border-[#333333]	 `}>
          <img src={favoritar} alt="icone favoritar" className="" />{" "}
        </div>
      </div>
      </div>
    </div>
  );
};

export default IconesAnuncio;
