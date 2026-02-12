import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "components/SearchBar";

describe("SearchBar Component", () => {
  it("renders search input in the top right corner", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Pesquisar...");
    expect(input).toBeInTheDocument();
  });

  it("displays suggestions when user types", async () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Pesquisar...");

    fireEvent.change(input, { target: { value: "bras" } });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("bras");
    });
  });

  it("calls onSelect when a suggestion is clicked", async () => {
    const mockOnSelect = jest.fn();
    render(
      <SearchBar
        suggestions={[
          { id: 1, title: "Estatísticas financeiras Brasil" },
          { id: 2, title: "Brasília dados" },
        ]}
        onSelect={mockOnSelect}
      />,
    );

    const input = screen.getByPlaceholderText("Pesquisar...");
    fireEvent.change(input, { target: { value: "bras" } });

    await waitFor(() => {
      const suggestion = screen.getByText("Estatísticas financeiras Brasil");
      fireEvent.click(suggestion);
    });

    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          title: "Estatísticas financeiras Brasil",
        }),
      );
    });
  });

  it("hides suggestions when input is empty", () => {
    render(<SearchBar suggestions={[{ id: 1, title: "Test suggestion" }]} />);

    const input = screen.getByPlaceholderText("Pesquisar...");
    expect(screen.queryByText("Test suggestion")).not.toBeInTheDocument();
  });

  it("filters suggestions based on input value", async () => {
    render(
      <SearchBar
        suggestions={[
          { id: 1, title: "Estatísticas financeiras Brasil" },
          { id: 2, title: "Gráfico de criptomoedas" },
        ]}
      />,
    );

    const input = screen.getByPlaceholderText("Pesquisar...");
    fireEvent.change(input, { target: { value: "cripto" } });

    await waitFor(() => {
      expect(screen.getByText("Gráfico de criptomoedas")).toBeInTheDocument();
      expect(
        screen.queryByText("Estatísticas financeiras Brasil"),
      ).not.toBeInTheDocument();
    });
  });
});
