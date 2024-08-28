import { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const setaEsquerda = '/images/seta_esquerda.png';
const setaDireita = '/images/seta_direita.png'

type CarrosselProps = {
    imagens: string[];
  };
  
  const Carrossel: React.FC<CarrosselProps> = ({ imagens }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel();
    // Funções para controlar os botões
    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  
    useEffect(() => {
      if (emblaApi) {
        emblaApi.reInit(); 
      }
    }, [imagens, emblaApi]);
  
    return (
      <div className="relative flex items-center justify-center w-[95%] border border-gray-400 pb-[16px] md:w-[80%] rounded-lg  ">
        <div className="overflow-hidden max-h-[80vh] " ref={emblaRef} style={{ aspectRatio: '16/9' }}>
          <div className="flex " >
            {imagens.map((imagem, index) => (
              <div key={index} className="flex-[0_0_100%] ">
                <img
                  src={imagem}
                  alt={`Imagem ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg pl-[32px] pr-[32px] pt-[16px]"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* botões de navegação do carrossel */}
        <button 
          onClick={scrollPrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-opacity-0 text-white rounded-full w-[32px]">
        {<img src={setaEsquerda} alt="botão de navegação do carrossel, esquerda" /> }
        </button>
  
        <button 
          onClick={scrollNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-opacity-0 w-[32px]">
          {<img src={setaDireita} alt="botão de navegação do carrossel, direita"/> }
        </button>
      </div>
    );
  };

  export default Carrossel;