/* eslint-disable @next/next/no-img-element */
'use client'
import { useRef, useState } from "react"

interface AnfitriaoProps {
  foto: string,
  nome: string,
  descricao: string
}
export const anfitriaoData = {
  foto: 'https://marketplace.canva.com/EAE_5IzADKE/1/0/1600w/canva-OwKgqn8V-m8.jpg',
  nome: 'Usuário Anfitrião',
  descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
}

const AnfitriaoInfos = ({ foto, nome, descricao }: AnfitriaoProps) => {
  const [lerMais, setLerMais] = useState(false);
  const truncatedDescription = descricao.substring(0, 300);
  const descricaoRef = useRef<HTMLParagraphElement>(null);


  return (
    <div className="flex flex-col justify-items-center ml-0">
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
      </div>
    </div>
  )
};

export default AnfitriaoInfos;
