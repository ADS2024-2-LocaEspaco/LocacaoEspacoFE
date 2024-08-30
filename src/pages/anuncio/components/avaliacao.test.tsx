import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Avaliacao from "./avaliacao";

describe("Componente Avaliacao", () => {
  it("Renderiza corretamente o número de estrelas quando a nota é um número decimal não terminado em .5", () => {
    render(<Avaliacao nota={2.3} qtd_avaliacoes={10} />);

    expect(screen.getAllByTestId("estrela-ativa")).toHaveLength(2);
    expect(screen.getAllByTestId("estrela-inativa")).toHaveLength(3);
  });

  it("Renderiza o número correto de estrelas ativas, inativas e meias estrelas", () => {
    render(<Avaliacao nota={3.5} qtd_avaliacoes={20} />);

    expect(screen.getAllByTestId("estrela-ativa")).toHaveLength(3);
    expect(screen.getByTestId("meia-estrela")).toBeInTheDocument();
    expect(screen.getAllByTestId("estrela-inativa")).toHaveLength(1);
    expect(screen.getByText("(20)")).toBeInTheDocument();
  });

  it("Renderiza o número correto de estrelas quando a nota é 0", () => {
    render(<Avaliacao nota={0} qtd_avaliacoes={10} />);

    expect(screen.getAllByTestId("estrela-inativa")).toHaveLength(5);
  });

  it("Renderiza o número correto de estrelas quando a nota é 5", () => {
    render(<Avaliacao nota={5} qtd_avaliacoes={10} />);

    expect(screen.getAllByTestId("estrela-ativa")).toHaveLength(5);
  });

  it("Renderiza o número correto de estrelas e avaliações quando a quantidade de avaliações é 0", () => {
    render(<Avaliacao nota={4} qtd_avaliacoes={0} />);

    expect(screen.getAllByTestId("estrela-ativa")).toHaveLength(4);
    expect(screen.getAllByTestId("estrela-inativa")).toHaveLength(1);
    expect(screen.getByTestId("qtd-avaliacoes")).toHaveTextContent("(0)");
  });

  it("Renderiza corretamente quando há mais de 1000 avaliações", () => {
    render(<Avaliacao nota={1.5} qtd_avaliacoes={1700} />);

    expect(screen.getAllByTestId("estrela-ativa")).toHaveLength(1);
    expect(screen.getByTestId("meia-estrela")).toBeInTheDocument();
    expect(screen.getAllByTestId("estrela-inativa")).toHaveLength(3);
    expect(screen.getByTestId("qtd-avaliacoes")).toHaveTextContent("(1700)");
  });
});
