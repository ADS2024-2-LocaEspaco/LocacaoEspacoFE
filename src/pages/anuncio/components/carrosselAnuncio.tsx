import React from "react";
import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Modal from "react-modal";

const setaEsquerda = "/images/seta_esquerda.png";
const setaDireita = "/images/seta_direita.png";

type CarrosselProps = {
  imagens: string[];
};

const Carrossel: React.FC<CarrosselProps> = ({ imagens }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isDesktop, setIsDesktop] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [imagens, emblaApi]);

  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalIsOpen(true);
    setTimeout(() => {
      if (emblaApi) emblaApi.scrollTo(index);
    }, 0);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="relative flex items-center justify-center min-w-[250px] border border-gray-400 pb-[16px] max-w-[95%] md:max-w-[1184px] md:h-[416px] rounded-lg shadow-[0_4px_24px_-1px_rgba(0,0,0,0.25)]">
      {isDesktop ? (
        <div className="grid grid-cols-3 gap-0 max-h-[400px] mt-5">
          <div className="grid grid-rows-2 gap-4 content-center p-2 m-0">
            <img
              src={imagens[0]}
              alt="Imagem 1"
              className="w-full h-full object-cover rounded-lg cursor-pointer max-h-[182px]"
              style={{ aspectRatio: "16/9" }}
              onClick={() => openModal(0)}
            />
            <img
              src={imagens[1]}
              alt="Imagem 2"
              className="w-full h-full object-cover rounded-lg cursor-pointer max-h-[182px]"
              style={{ aspectRatio: "16/9" }}
              onClick={() => openModal(1)}
            />
          </div>

          <div className="row-span-2">
            <img
              src={imagens[2]}
              alt="Imagem 3"
              className="w-full h-full object-cover rounded-lg cursor-pointer md:max-h-[380px] mt-2"
              style={{ aspectRatio: "1/1" }}
              onClick={() => openModal(2)}
            />
          </div>

          <div className="grid grid-rows-2 gap-4 content-center p-2 m-0">
            <img
              src={imagens[3]}
              alt="Imagem 4"
              className="w-full h-full object-cover rounded-lg cursor-pointer max-h-[182px]"
              style={{ aspectRatio: "16/9" }}
              onClick={() => openModal(3)}
            />
            <img
              src={imagens[4]}
              alt="Imagem 5"
              className="w-full h-full object-cover rounded-lg cursor-pointer max-h-[182px]"
              style={{ aspectRatio: "16/9" }}
              onClick={() => openModal(4)}
            />
          </div>
        </div>
      ) : (
        <div className="overflow-hidden max-h-[80vh]" ref={emblaRef} style={{ aspectRatio: "16/9" }}>
          {/* Carrossel para mobile */}
          <div className="flex justify-stretch items-stretch">
            {imagens.map((imagem, index) => (
              <div key={index} className="flex-[0_0_100%]">
                <img
                  src={imagem}
                  alt={`Imagem ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg pl-[32px] pr-[32px] pt-[16px] min-w-[331px]"
                  onClick={() => openModal(index)} // Corrigido para passar o índice correto
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* botões de navegação do carrossel */}
      {!isDesktop && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-opacity-0 text-white rounded-full w-[32px]"
          >
            <img src={setaEsquerda} alt="botão de navegação do carrossel, esquerda" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-opacity-0 w-[32px]"
          >
            <img src={setaDireita} alt="botão de navegação do carrossel, direita" />
          </button>
        </>
      )}

      {/* Modal com o carrossel */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 z-50 flex items-center justify-center"
        shouldCloseOnOverlayClick={true}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        /* ariaHideApp={true} */ 
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="overflow-hidden max-h-[80vh] w-full" ref={emblaRef}>
            <div className="flex">
              {imagens.map((imagem, index) => (
                <div key={index} className="flex-[0_0_100%]">
                  <img
                    src={imagem}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-auto object-cover rounded-lg pl-2 md:pl-[32px] pr-2 md:pr-[32px] md:pt-[16px] min-w-[331px] max-h-[80vh] mx-auto"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-6 md:left-12 transform -translate-y-1/2 p-2 bg-opacity-[.2] bg-white rounded-full w-[32px]"
          >
            <img src={setaEsquerda} alt="botão de navegação do carrossel, esquerda" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-6 md:right-12 transform -translate-y-1/2 p-2 bg-opacity-[.2] bg-white rounded-full w-[32px]"
          >
            <img src={setaDireita} alt="botão de navegação do carrossel, direita" />
          </button>

          <button onClick={closeModal} className="absolute top-12 md:top-[42px] right-4 p-2 text-black">
            Fechar
          </button>
        </div>
      </Modal>

    </div>
  );
};

export default Carrossel;
