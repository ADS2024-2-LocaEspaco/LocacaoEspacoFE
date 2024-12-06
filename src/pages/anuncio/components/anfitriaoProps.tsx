/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react"
import ReservaAnuncio from "./reservaAnuncio"
import useWindowWidth from "@/hooks/useWindowWidth"
import { Comodidades } from '@/types/types2';
import { AnfitriaoProps } from "@/types/types2";
import { getUsuarioAnfitriao } from "@/utils/api";


interface AnfitriaoSectionProps {
  anuncioId: string;
}

const mockFetchComodidades = (): Promise<Comodidades[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, comodidade: 'Jardim amplo', icone: '/icons/outdoor_garden_icon.svg', anuncioComodidades: [] },
        { id: 2, comodidade: 'Wi-Fi', icone: '/icons/wifi_icon.svg', anuncioComodidades: [] },
        { id: 3, comodidade: 'Ar Condicionado', icone: '/icons/ice_icon.svg', anuncioComodidades: [] },
        { id: 4, comodidade: 'Acessibilidade', icone: '/icons/accessibility_icon.svg', anuncioComodidades: [] },
        { id: 5, comodidade: 'Piscina', icone: '/icons/pool_icon.svg', anuncioComodidades: [] },
        { id: 6, comodidade: 'Cozinha', icone: '/icons/restaurant_icon.svg', anuncioComodidades: [] },
        { id: 7, comodidade: 'Máquina de Lavar', icone: '/icons/laundry_icon.svg', anuncioComodidades: [] },
        { id: 8, comodidade: 'Permitido animais', icone: '/icons/pets_icon.svg', anuncioComodidades: [] },
        { id: 9, comodidade: 'Área para churrasco', icone: '/icons/outdoor_grill_icon.svg', anuncioComodidades: [] },
        { id: 10, comodidade: 'Garagem para quatro carros', icone: '/icons/car_icon.svg', anuncioComodidades: [] }
      ])
    }, 2000)
  })
}

const AnfitriaoInfos = ({ anuncioId }: AnfitriaoSectionProps) => {
  const [anfitriao, setAnfitriao] = useState<AnfitriaoProps | undefined>()
  const [lerMais, setLerMais] = useState(false);
  const [mockComodidades, setMockComodidades] = useState<Comodidades[]>([]);
  const [verMaisComodidades, setVerMaisComodidades] = useState(false);
  const descricaoRef = useRef<HTMLParagraphElement>(null);
  const windowsWidth = useWindowWidth();
  
  useEffect(() => {
    const fetchAnfitriaoData = async () => {
      const data = await getUsuarioAnfitriao(anuncioId);
      console.log('Anfitrião Data: ', data)
      setAnfitriao(data);
    };
    fetchAnfitriaoData();

    const fetchComodidades = async () => {
      const data = await mockFetchComodidades();
      setMockComodidades(data);
    };
    fetchComodidades();
  }, [anuncioId]);
  
  if (!anfitriao || !anfitriao.anuncio.length) {
    return null;
  }

  const anuncio = anfitriao.anuncio[0];
  const descricao = anuncio.descricao || '';
  const comodidades = anuncio.anuncioComodidades || [];
  const shouldTruncate = descricao.length > 300;
  const truncatedDescription = shouldTruncate ? descricao.substring(0, 300) : descricao;
  const comodidadesParaExibir = verMaisComodidades ? mockComodidades : windowsWidth >= 768 ? mockComodidades.slice(0, 8) : mockComodidades.slice(0, 4);


  const amenities = [
    { type: 'Quartos', count: anuncio.quartos || 0, icon: '/icons/bed.svg' },
    { type: 'Banheiros', count: anuncio.banheiros, icon: '/icons/shower.svg' },
    // { type: 'Vagas', count: anfitriao.anuncio?.vagas, icon: '/icons/car_icon.svg' },
    { type: 'Hospedes', count: anuncio.hospedes || 0, icon: '/icons/group_icon.svg' }
  ];

  // const [dataEscolhida, setDataEscolhida] = useState('');

  // const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDataEscolhida(event.target.value);
  // };
  
  return (
    <div className="flex flex-col lg:flex-row lg:ml-0 h-full max-w-7xl">
      <div className="flex flex-col justify-items-center lg:w-2/3">
        <div className="flex items-center mb-2 px-3">
          <img src={anfitriao.foto || "/icons/account_circle_icon.svg"} alt="" className="rounded-full w-10 h-10 mr-2" />
          <h2 className="font-josefin text-xl font-medium text-[#3D3D43] truncate lg:max-w-md " >{anfitriao.nome_completo}</h2>
        </div>
        {/* Descrição */}
        <div className="relative px-5 max-w-[672px] font-opensans">
          <p ref={descricaoRef} className={`text-sm font-normal text-justify text-[#3D3D43] font-opensans`}>
            {lerMais ? descricao : shouldTruncate ? truncatedDescription : descricao }
          </p>
          {shouldTruncate && !lerMais && (
            <div className="absolute left-0 w-full h-2 bg-gradient-to-b from-transparent via-white to-black blur-md pointer-events-none " />
          )}
          <div className="flex pt-6 justify-center md:pb-6 font-opensans">
            {anuncio?.descricao && anuncio.descricao.length > 350 && (
              <button onClick={() => setLerMais(!lerMais)} className="text-[#051F38] text-sm items-center font-normal underline ">
                {lerMais ? 'Ler Menos' : 'Ler Mais'}
              </button>
            )}
          </div>

          <div className="pt-5 pb-10 flex justify-center space-x-4 md:hidden font-opensans">
            {amenities.map((amenity) => (
              <button key={amenity.type} className="flex bg-[#FFD7B8] w-[60px] h-8 rounded-2xl justify-around items-center">
                <img src={amenity.icon} alt={amenity.type} />
                <p className="text-black-300 text-base">{amenity.count}</p>
              </button>
            ))}
          </div>

          <div className="font-opensans rounded-lg border-b-black border-0 shadow grid grid-cols-2 gap-4 pt-2 pb-6 mb-5" style={{ boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }}>
            {comodidadesParaExibir.map((comodidade) => (
              <div key={comodidade.id} className="flex items-center w-auto h-8 px-2 ">
                <img src={comodidade.icone} alt={comodidade.comodidade} className="w-4 h-4 mr-2" />
                <p className="text-[#3D3D43] text-sm sm:text-base font-opensans">{comodidade.comodidade}</p>
              </div>
            ))}
            {mockComodidades.length > 4 && (
              <div className="col-span-2 flex justify-center items-center">
                <button onClick={() => setVerMaisComodidades(!verMaisComodidades)} className="bg-[#D9D9D9] mx-1 w-20 rounded-md text-[#051F38] text-sm items-center font-normal font-opensans">
                  {verMaisComodidades ? 'Ver Menos' : 'Ver Mais'}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
      <div className="flex justify-center items-center lg:w-1/3 w-full h-full">
        <ReservaAnuncio />
      </div>
    </div>
  )
};

export default AnfitriaoInfos;
