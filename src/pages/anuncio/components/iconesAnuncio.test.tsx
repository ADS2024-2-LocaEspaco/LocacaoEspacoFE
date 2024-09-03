import React from "react";
import { render, screen, within } from "@testing-library/react";
import IconesAnuncio from "./iconesAnuncio";

describe("IconesAnuncio Component", () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query.includes('(min-width: 768px)'),
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("Renderiza os ícones e textos corretos no desktop", () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query.includes('(min-width: 768px)'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<IconesAnuncio qtd_hospedes={3} qtd_camas={2} qtd_banheiros={1} onOpenMapModal={()=>{}} onOpenFavoritosModal={()=>{}}  />);

    const iconContainer = screen.getByTestId("icones-comodidades");

    expect(within(iconContainer).getByText("2")).toBeVisible();
    expect(within(iconContainer).getByText("3")).toBeVisible();
    expect(within(iconContainer).getByText("1")).toBeVisible();

    expect(screen.getByAltText("ícone quantidade de camas")).toBeInTheDocument();
    expect(screen.getByAltText("ícone quantidade de hóspedes")).toBeInTheDocument();
    expect(screen.getByAltText("ícone quantidade de banheiros")).toBeInTheDocument();
    expect(screen.getByAltText("ícone mostrar mapa")).toBeInTheDocument();
    expect(screen.getByAltText("ícone compartilhar")).toBeInTheDocument();
    expect(screen.getByAltText("ícone favoritar")).toBeInTheDocument();
  });

  it("Renderiza apenas os ícones de mapa e compartilhar/favoritar no mobile", () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: !query.includes('(min-width: 768px)'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<IconesAnuncio qtd_hospedes={3} qtd_camas={2} qtd_banheiros={1} onOpenMapModal={()=>{}}  onOpenFavoritosModal={()=>{}} />);

    expect(screen.getByTestId("icone-mapa")).toBeInTheDocument();
    expect(screen.getByTestId("icones-favshare")).toBeInTheDocument();
  });
});
