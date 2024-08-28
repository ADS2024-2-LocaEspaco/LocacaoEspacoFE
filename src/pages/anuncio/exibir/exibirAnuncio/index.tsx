import AnfitriaoInfos, { anfitriaoData } from '../../components/anfitriaoProps';
import { TituloAnuncioProps } from '../../components/anuncioProps';
import { useState } from 'react';
import Avaliacao from '../../components/avaliacao'
import Carrossel from '../../components/carrosselAnuncio';
import IconesAnuncio from '../../components/iconesAnuncio';


// Imagens de exemplo
const image1 = '/images/image1.webp';
const image2 = '/images/image2.webp';
const image3 = '/images/image3.webp';

const ExibirAnuncio = () => {

  const [titulo] = useState('Lindo Apartamento no Centro');
  const [nota] = useState(3.5);
  const [imagens] = useState([image1, image2, image3]);
  return (
    <div className='bg-[#fff7f4] h-screen font-josefin'>

      {/* Section 1 */}
      <section className="flex flex-col mb-4">
      <div className="bg-[#faf8f8] flex flex-row justify-between pt-4 flex-wrap mr-[10%] ml-[10%] sm:mr-2 sm:ml-2">
        <h1 className="text-tituloa text-black p-0 font-bold mb-0 mt-2 md:pl-[10%]">{titulo}</h1>
        <Avaliacao nota={nota} qtd_avaliacoes={20} />
      </div >
      <div className='flex flex-col items-center mb-4'>
      <Carrossel imagens={imagens} />
      <IconesAnuncio />
      </div>
    </section>


      {/* Section 2 */}
      <section>
        <AnfitriaoInfos {...anfitriaoData} />
      </section>

    </div>

  );



};

export default ExibirAnuncio;