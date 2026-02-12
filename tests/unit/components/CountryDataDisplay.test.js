import { render, screen } from "@testing-library/react";
import CountryDataDisplay from "components/CountryDataDisplay";

describe("CountryDataDisplay", () => {
  const mockData = {
    data: {
      name: "Brazil",
      population: 215000000,
      area: 8514877,
      capital: "Brasília",
      region: "South America",
      subregion: "South America",
      languages: "Portuguese",
      currency: "Brazilian Real (R$)",
      flag: "https://flagcdn.com/br.svg",
    },
  };

  it("should not render if data is null", () => {
    const { container } = render(<CountryDataDisplay data={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render country data", () => {
    const { container } = render(
      <CountryDataDisplay data={mockData} source="REST Countries API" />,
    );

    expect(container.textContent).toContain("Brazil");
    expect(container.textContent).toContain("Brasília");
  });

  it("should display source information", () => {
    const { container } = render(
      <CountryDataDisplay data={mockData} source="REST Countries API" />,
    );

    expect(container.textContent).toContain("REST Countries API");
  });

  it("should display country information", () => {
    const { container } = render(<CountryDataDisplay data={mockData} />);

    expect(container.textContent).toContain("Brazil");
    expect(container.textContent).toContain("Brasília");
    expect(container.textContent).toContain("215");
  });
});
