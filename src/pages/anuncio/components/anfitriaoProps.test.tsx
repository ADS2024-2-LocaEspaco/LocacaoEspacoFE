/* eslint-disable react-hooks/rules-of-hooks */
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import AnfitriaoInfos, { anfitriaoData, imovelData } from './anfitriaoProps';
import '@testing-library/jest-dom';
import { ReservaProvider } from '@/hooks/ReservaContext'; // Certifique-se de ajustar o caminho conforme necessário
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

// Configurar o mock do roteador
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    prefetch: jest.fn(),
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <RouterContext.Provider value={mockRouter}>
      <ReservaProvider>{ui}</ReservaProvider>
    </RouterContext.Provider>
  );
};

describe('AnfitriaoInfos Component', () => {
  it('deve renderizar as informações básicas do anfitrião', () => {
    renderWithProvider(
      <AnfitriaoInfos
        foto={anfitriaoData.foto}
        nome={anfitriaoData.nome}
        descricao={anfitriaoData.descricao}
        quartos={imovelData.quartos}
        banheiros={imovelData.banheiros}
        vagas={imovelData.vagas}
      />
    );

    expect(screen.getByText(anfitriaoData.nome)).toBeInTheDocument();
    expect(screen.getByAltText('')).toBeInTheDocument();
    expect(screen.getByText(`${anfitriaoData.descricao.substring(0, 300)}...`)).toBeInTheDocument();
  });

  it('deve permitir alternar entre "Ler Mais" e "Ler Menos"', async () => {
    renderWithProvider(
      <AnfitriaoInfos
        foto={anfitriaoData.foto}
        nome={anfitriaoData.nome}
        descricao={anfitriaoData.descricao}
        quartos={imovelData.quartos}
        banheiros={imovelData.banheiros}
        vagas={imovelData.vagas}
      />
    );

    const lerMaisButton = screen.getByText('Ler Mais');

    // Envolvendo com act para garantir a atualização do estado
    await act(async () => {
      fireEvent.click(lerMaisButton);
    });

    await waitFor(() => {
      // Usando uma função no matcher para lidar com o texto longo dividido em múltiplos elementos
      expect(screen.getByText((content) => content.startsWith('Ler Menos'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('Lorem ipsum dolor sit amet'))).toBeInTheDocument();
    }, { timeout: 2500 });
  });

  it('deve carregar, exibir comodidades e testar botões de Ver Mais e Ver Menos', async () => {
    renderWithProvider(
      <AnfitriaoInfos
        foto={anfitriaoData.foto}
        nome={anfitriaoData.nome}
        descricao={anfitriaoData.descricao}
        quartos={imovelData.quartos}
        banheiros={imovelData.banheiros}
        vagas={imovelData.vagas}
      />
    );

    // Verifica a renderização inicial das comodidades
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Jardim amplo'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('Wi-Fi'))).toBeInTheDocument();
    }, { timeout: 5000 });

    // Aguarda o botão "Ver Mais" ser renderizado na tela
    const verMaisButton = await screen.findByText('Ver Mais');

    // Simula o clique no botão "Ver Mais"
    await act(async () => {
      fireEvent.click(verMaisButton);
    });

    // Verifica se o botão muda para "Ver Menos" após o clique
    const verMenosButton = await screen.findByText('Ver Menos');
    expect(verMenosButton).toBeInTheDocument();

    // Aguarda a renderização das comodidades adicionais após o clique
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Jardim amplo'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('Área para churrasco'))).toBeInTheDocument();
      expect(screen.queryByText((content) => content.includes('Garagem para quatro carros'))).toBeInTheDocument();
    }, { timeout: 2500 });

    // Simula o clique no botão "Ver Menos" para reverter a visualização
    await act(async () => {
      fireEvent.click(verMenosButton);
    });

    // Verifica se o botão volta para "Ver Mais" e as comodidades adicionais não estão mais visíveis
    const verMaisButtonAfterClick = await screen.findByText('Ver Mais');
    expect(verMaisButtonAfterClick).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText((content) => content.includes('Área para churrasco'))).not.toBeInTheDocument();
      expect(screen.queryByText((content) => content.includes('Garagem para quatro carros'))).not.toBeInTheDocument();
    });
  });
});