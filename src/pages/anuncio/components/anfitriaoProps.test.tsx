import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnfitriaoInfos, { anfitriaoData } from './anfitriaoProps';
import { describe } from 'node:test';

describe('AnfitriaoInfos Component', () => {
  it('renders the component with the provided data', () => {
    render(<AnfitriaoInfos {...anfitriaoData} />);

    // Verifica se o nome do anfitrião foi renderizado
    expect(screen.getByText(anfitriaoData.nome)).toBeInTheDocument();

    // Verifica se a imagem do anfitrião foi renderizada
    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', anfitriaoData.foto);
  });

  it('displays truncated description and "Ler Mais" button initially on larger screens', () => {
    render(<AnfitriaoInfos {...anfitriaoData} />);

    // Verifica se a descrição truncada é exibida
    const truncatedText = anfitriaoData.descricao.substring(0, 350) + '...';
    expect(screen.getByText(truncatedText)).toBeInTheDocument();

    // Verifica se o botão "Ler Mais" está presente
    expect(screen.getByText('Ler Mais')).toBeInTheDocument();
  });

  it('expands the description when "Ler Mais" button is clicked', () => {
    render(<AnfitriaoInfos {...anfitriaoData} />);

    // Simula o clique no botão "Ler Mais"
    fireEvent.click(screen.getByText('Ler Mais'));

    // Verifica se a descrição completa é exibida
    expect(screen.getByText(anfitriaoData.descricao)).toBeInTheDocument();

    // Verifica se o botão "Ler Menos" está presente
    expect(screen.getByText('Ler Menos')).toBeInTheDocument();
  });

  it('hides the "Ler Mais" button when description is less than 350 characters', () => {
    const shortDescription = 'This is a short description';
    const shortAnfitriaoData = { ...anfitriaoData, descricao: shortDescription };

    render(<AnfitriaoInfos {...shortAnfitriaoData} />);

    // Verifica se a descrição curta é exibida
    expect(screen.getByText(shortDescription)).toBeInTheDocument();

    // Verifica se o botão "Ler Mais" não está presente
    expect(screen.queryByText('Ler Mais')).not.toBeInTheDocument();
  });
});
