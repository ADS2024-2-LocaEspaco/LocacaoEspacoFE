/* eslint-disable @next/next/no-img-element */
'use client'
import { useRef, useState } from "react"

interface AnfitriaoProps {
  foto: string,
  nome: string,
  descricao: string
}

interface ImovelProps {
  nome: string,
  descricao: string,
  endereco: string,
  preco: number,
  quartos: number,
  banheiros: number,
  vagas: number,
  area: number,
  anfitriao: AnfitriaoProps
}

export const anfitriaoData = {
  foto: 'https://marketplace.canva.com/EAE_5IzADKE/1/0/1600w/canva-OwKgqn8V-m8.jpg',
  nome: 'Usuário Anfitrião',
  descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
}

export const imovelData = {
  nome: 'Lindo Apartamento no Centro',
  descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  endereco: 'Rua dos Bobos, 0 - Centro, São Paulo - SP',
  preco: 200,
  quartos: 2,
  banheiros: 2,
  vagas: 1,
  area: 50,
  anfitriao: anfitriaoData
}

const AnfitriaoInfos = ({ foto, nome, descricao, quartos, banheiros, vagas }: AnfitriaoProps & { quartos: number, banheiros: number, vagas: number }) => {
  const [lerMais, setLerMais] = useState(false);
  const truncatedDescription = descricao.substring(0, 300);
  const descricaoRef = useRef<HTMLParagraphElement>(null);

  const amenities = [
    { type: 'Quartos', count: quartos, icon: '/icons/bed_icon.svg' },
    { type: 'Banheiros', count: banheiros, icon: '/icons/shower_icon.svg' },
    { type: 'Vagas', count: vagas, icon: '/icons/car_icon.svg' },
  ];


  return (
    <div className="flex flex-col justify-items-center ml-0 h-screen">
      <div className="flex items-center mb-2 px-5">
        <img src={foto} alt="" className="rounded-full w-10 h-10 mr-2" />
        <h2 className="font-josefin text-xl font-medium text-[#3D3D43] truncate md:max-w-md " >{nome}</h2>
      </div>
      <div className="relative px-5">
        <p ref={descricaoRef} className="text-sm font-normal text-justify text-[#3D3D43]">
          {lerMais ? descricao : truncatedDescription + '...'}
        </p>
        {!lerMais && (
          <div className="absolute bottom-6 left-0 w-full h-4 bg-gradient-to-b from-transparent via-white to-white blur-md pointer-events-none " />
        )}
        <div className="flex pt-2 justify-center">
          {descricao.length > 350 && (
            <button onClick={() => setLerMais(!lerMais)} className="text-[#051F38] text-sm items-center font-normal underline ">
              {lerMais ? 'Ler Menos' : 'Ler Mais'}
            </button>
          )}
        </div>

        <div className="pt-5 pb-10 flex justify-center space-x-4">
          {amenities.map((amenity) => (
            <button key={amenity.type} className="flex bg-[#FFD7B8] w-[60px] h-8 rounded-2xl justify-around items-center">
              <img src={amenity.icon} alt={amenity.type} />
              <p className="text-black text-base">{amenity.count}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
};

export default AnfitriaoInfos;
