import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carrossel from './carrosselAnuncio';
import * as emblaCarouselReact from 'embla-carousel-react'; // Importação para mockar a API
import Modal from 'react-modal';

// Mock da API do Embla
jest.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue([jest.fn(), { scrollPrev: jest.fn(), scrollNext: jest.fn(), reInit: jest.fn(), scrollTo: jest.fn() }]),
}));

const imagens = [
  '/images/image1.webp',
  '/images/image2.webp',
  '/images/image3.webp',
  '/images/image4.webp',
  '/images/image5.webp',
];

describe('Carrossel Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Modal.setAppElement(document.body); 
  });

  it('Renderiza todas as imagens corretamente em desktop', () => {
    window.innerWidth = 1024;
    render(<Carrossel imagens={imagens} />);

    imagens.forEach((imagem, index) => {
      const imgElement = screen.getByAltText(`Imagem ${index + 1}`);
      expect(imgElement).toHaveAttribute('src', imagem);
    });
  });
  it('Abre o modal com a imagem correta ao clicar', () => {
    window.innerWidth = 1024;
    render(<Carrossel imagens={imagens} />);
  
    fireEvent.click(screen.getByAltText('Imagem 1'));
    const modalImgElement = screen.getAllByAltText('Imagem 1')[0]; 
    expect(modalImgElement).toBeInTheDocument();
  });
  

  it('Renderiza corretamente em mobile', () => {
    window.innerWidth = 375;
    render(<Carrossel imagens={imagens} />);

    expect(screen.getByAltText('Imagem 1')).toBeInTheDocument();
    expect(screen.getByAltText('Imagem 2')).toBeInTheDocument();
  });

  it('Passa para a próxima imagem com clique no botão de seta direita', () => {
    window.innerWidth = 375;
    render(<Carrossel imagens={imagens} />);

    fireEvent.click(screen.getByAltText('botão de navegação do carrossel, direita'));
    const emblaApi = emblaCarouselReact.default()[1];
    if (emblaApi) {
      expect(emblaApi.scrollNext).toHaveBeenCalled();
    }
  });

  it('Fecha o modal quando o botão de fechar é clicado', () => {
    window.innerWidth = 1024;
    render(<Carrossel imagens={imagens} />);

    fireEvent.click(screen.getByAltText('Imagem 1'));
    fireEvent.click(screen.getByText('Fechar'));
    expect(screen.queryByAltText('Imagem 1')).toBeVisible();
  });
});
