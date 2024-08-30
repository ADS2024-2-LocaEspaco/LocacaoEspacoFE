/* eslint-disable @next/next/no-img-element */
'use client'
import { use, useEffect, useRef, useState } from "react"
import AnuncioDetalhes from "./anuncioDetalhe"
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

interface ComodidadesProps {
  nome: string,
  icone: string
}

export const anfitriaoData = {
  id:'123',
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

const mockFetchComodidades = (): Promise<ComodidadesProps[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { nome: 'Jardim amplo', icone: '/icons/outdoor_garden_icon.svg' },
        { nome: 'Wi-Fi', icone: '/icons/wifi_icon.svg' },
        { nome: 'Ar Condicionado', icone: '/icons/ice_icon.svg' },
        { nome: 'Acessibilidade', icone: '/icons/accessibility_icon.svg' },
        { nome: 'Piscina', icone: '/icons/pool_icon.svg' },
        { nome: 'Cozinha', icone: '/icons/restaurant_icon.svg' },
        { nome: 'Máquina de Lavar', icone: '/icons/laundry_icon.svg' },
        { nome: 'Permitido animais', icone: '/icons/pets_icon.svg' },
        { nome: 'Área para churrasco', icone: '/icons/outdoor_grill_icon.svg' },
        { nome: 'Garagem para quatro carros', icone: '/icons/car_icon.svg' }
      ])
    }, 2000)
  })
}

const AnfitriaoInfos = ({ foto, nome, descricao, quartos, banheiros, vagas }: AnfitriaoProps & { quartos: number, banheiros: number, vagas: number }) => {
  const [lerMais, setLerMais] = useState(false);
  const truncatedDescription = descricao.substring(0, 300);
  const descricaoRef = useRef<HTMLParagraphElement>(null);
  const [comodidades, setComodidades] = useState<ComodidadesProps[]>([]);
  const [dataEscolhida, setDataEscolhida] = useState('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataEscolhida(event.target.value);
  };

  const [lastLineClass, setLastLineClass] = useState('');

  const amenities = [
    { type: 'Quartos', count: quartos, icon: '/icons/bed.svg' },
    { type: 'Banheiros', count: banheiros, icon: '/icons/shower.svg' },
    { type: 'Vagas', count: vagas, icon: '/icons/car_icon.svg' },
  ];

  useEffect(() => {
    mockFetchComodidades().then((comodidades) => setComodidades(comodidades));
  }, []);

  useEffect(() => {
    const highlightLastLine = () => {
      if (descricaoRef.current) {
        const range = document.createRange();
        range.selectNodeContents(descricaoRef.current);

        const lines = range.toString().split('\n');

        if (lines.length > 0) {
          setLastLineClass("highlight-last-line");
        }
      }
    };

    highlightLastLine();
  }, [descricao]);


  const [verMaisComodidades, setVerMaisComodidades] = useState(false);
  const comodidadesParaExibir = verMaisComodidades ? comodidades : comodidades.slice(0, 4);

  return (
    <div className="flex flex-col justify-items-center ml-0 h-full">
      <div className="flex items-center mb-2 px-5">
        <img src={foto} alt="" className="rounded-full w-10 h-10 mr-2" />
        <h2 className="font-josefin text-xl font-medium text-[#3D3D43] truncate md:max-w-md " >{nome}</h2>
      </div>
      <div className="relative px-5">
        <p ref={descricaoRef} className={`text-sm font-normal text-justify text-[#3D3D43]`}>
          {lerMais ? descricao : truncatedDescription + '...'}
        </p>
        {!lerMais && (
          <div className="absolute left-0 w-full h-2 bg-gradient-to-b from-transparent via-white to-black blur-md pointer-events-none " />
        )}
        <div className="flex pt-6 justify-center">
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

        <div className="font-sans rounded-lg border-b-black border-0 shadow grid grid-cols-2 gap-4 pt-2 pb-6 mb-5" style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
          {comodidadesParaExibir.map((comodidade) => (
            <div key={comodidade.nome} className="flex items-center w-auto h-8 px-2 ">
              <img src={comodidade.icone} alt={comodidade.nome} className="w-6 h-6 mr-2" />
              <p className="text-[#3D3D43] text-sm sm:text-base">{comodidade.nome}</p>
            </div>
          ))}
          {comodidades.length > 4 && (
            <div className="col-span-2 flex justify-center items-center">
              <button onClick={() => setVerMaisComodidades(!verMaisComodidades)} className="bg-[#D9D9D9] mx-1 w-20 rounded-md text-[#051F38] text-sm items-center font-normal">
                {verMaisComodidades ? 'Ver Menos' : 'Ver Mais'}
              </button>
            </div>
          )}
        </div>
        < AnuncioDetalhes />
      </div>
    </div>
  )
};

export default AnfitriaoInfos;
