import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type CarrosselProps = {
  anuncios: {
    titulo: string;
    endereco: {
      uf: string;
      pais: string;
    };
    imagens: string[];
  }[];
};

const Carrossel: React.FC<CarrosselProps> = ({ anuncios }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [emblaRefModal, emblaApiModal] = useEmblaCarousel({ loop: true });

  const [isDesktop, setIsDesktop] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const titulo = anuncios[selectedIndex]?.titulo;
  const endereco = `${anuncios[selectedIndex]?.endereco.uf}, ${anuncios[selectedIndex]?.endereco.pais}`;
  const imagens = anuncios.flatMap(anuncio => anuncio.imagens);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  return (
    <div className="relative">
      <div
        className="overflow-hidden h-80 md:h-auto w-full rounded-3xl sm:min-w-96	"
        ref={emblaRef}
        style={{ aspectRatio: "16/9" }}
      >
        {/* Carrossel */}
        <div className="flex h-auto w-full justify-stretch items-stretch">
          {imagens.map((imagem, index) => (
            <div key={index} className="flex-[0_0_100%] relative">
              <img
                src={imagem}
                alt={`Imagem ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Título da casa e localização */}
              <div className="absolute top-10 left-14 sm:left-9 bg-white bg-opacity-75 text-black-100 px-3 py-1 hidden sm400:block rounded-md shadow-md z-20">
                <span className="text-sm font-semibold">{titulo} - {endereco}</span>
              </div>

              {/* Gradiente de fundo */}
              <div className="sticky z-10 bottom-0 left-0 w-full h-24 custom:h-64 rounded-b-lg h-14 bg-gradient-to-t from-[#021125]"></div>

            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de navegação do carrossel (dots) */}
      <div className="absolute bottom-[22px] left-0 right-0 flex justify-center items-center space-x-2 z-30">
        {imagens.map((_, index) => (
          <button
            title="Dot"
            key={index}
            className={`w-2 h-2 rounded-full ${selectedIndex === index ? "bg-blue-300" : "bg-gray-400"}`}
            onClick={() => {
              setSelectedIndex(index);
              emblaApi?.scrollTo(index);
            }}
          />
        ))}
      </div>
      {/* Texto "Melhores avaliados" */}
      <h2 className="absolute font-title z-20 bottom-[340px] left-[5px] text-[22px] text-black-100 font-bold sm:bottom-[36px] sm:left-[140px] sm:text-5xl sm:text-white">Melhores avaliados</h2>

      {/* Botão "Ver local" */}
      <div className="absolute bottom-12 right-0 transform -translate-x-1/2">
        <button className="bg-orange-300 text-white px-6 py-2 rounded-[50px] shadow hover:bg-orange-400 z-30 hidden custom:block"
        //onClick={() => navigate(`/anuncio/${anuncioId}`)}
        >
          Ver local
        </button>
      </div>

      {/* Botões de navegação */}
      <button
        className="absolute top-1/2 -left-[15px] transform -translate-y-1/2 bg-white text-white p-2 rounded-full z-30 hidden sm:block"
        onClick={scrollPrev}
      >
        <svg width="24" height="24" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 19.96L0 9.99991L10 0.0397949L11.775 1.80771L3.55 9.99991L11.775 18.1921L10 19.96Z" fill="#1E1E1E" />
        </svg>
      </button>
      <button
        className="absolute top-1/2 -right-[15px] transform -translate-y-1/2 bg-white text-white p-2 rounded-full z-30 hidden sm:block"
        onClick={scrollNext}
      >
        <svg width="24" height="24" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.025 19.9219L0.25 18.154L8.475 9.96182L0.25 1.76963L2.025 0.00170898L12.025 9.96182L2.025 19.9219Z" fill="#1E1E1E" />
        </svg>
      </button>
    </div>
  );

};

export default Carrossel;
