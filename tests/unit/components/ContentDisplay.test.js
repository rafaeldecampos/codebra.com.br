import { render, screen } from "@testing-library/react";
import ContentDisplay from "components/ContentDisplay";

describe("ContentDisplay Component", () => {
  const mockSuggestion = {
    id: "finance-brazil",
    title: "Estatísticas financeiras Brasil",
    description: "Dados financeiros e econômicos do Brasil",
    category: "Finanças",
    type: "financial-stats",
  };

  it("renders nothing when no suggestion is provided", () => {
    const { container } = render(<ContentDisplay suggestion={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("displays suggestion title", () => {
    render(<ContentDisplay suggestion={mockSuggestion} />);
    expect(
      screen.getByText("Estatísticas financeiras Brasil"),
    ).toBeInTheDocument();
  });

  it("displays suggestion description", () => {
    render(<ContentDisplay suggestion={mockSuggestion} />);
    expect(
      screen.getByText("Dados financeiros e econômicos do Brasil"),
    ).toBeInTheDocument();
  });

  it("displays suggestion category", () => {
    render(<ContentDisplay suggestion={mockSuggestion} />);
    expect(screen.getByText("Finanças")).toBeInTheDocument();
  });

  it("renders with all required suggestion properties", () => {
    render(<ContentDisplay suggestion={mockSuggestion} />);

    expect(
      screen.getByText("Estatísticas financeiras Brasil"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Dados financeiros e econômicos do Brasil"),
    ).toBeInTheDocument();
    expect(screen.getByText("Finanças")).toBeInTheDocument();
  });

  it("handles different suggestion types", () => {
    const cryptoSuggestion = {
      id: "crypto-chart",
      title: "Gráfico de criptomoedas",
      description: "Visualização de preços de criptomoedas",
      category: "Criptografia",
      type: "crypto-graph",
    };

    render(<ContentDisplay suggestion={cryptoSuggestion} />);

    expect(screen.getByText("Gráfico de criptomoedas")).toBeInTheDocument();
    expect(screen.getByText("Criptografia")).toBeInTheDocument();
  });
});
