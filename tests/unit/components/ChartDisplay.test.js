import { render, screen } from "@testing-library/react";
import ChartDisplay from "components/ChartDisplay";

// Mock Chart.js
jest.mock("react-chartjs-2", () => ({
  Line: () => <div>Line Chart</div>,
  Bar: () => <div>Bar Chart</div>,
  Doughnut: () => <div>Doughnut Chart</div>,
}));

describe("ChartDisplay Component", () => {
  const mockChartData = {
    chartType: "line",
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Test Data",
        data: [10, 20, 30],
        borderColor: "#0070f3",
      },
    ],
  };

  it("renders nothing when no data is provided", () => {
    const { container } = render(<ChartDisplay data={null} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders line chart", () => {
    render(<ChartDisplay data={mockChartData} />);
    expect(screen.getByText("Line Chart")).toBeInTheDocument();
  });

  it("renders bar chart", () => {
    const barData = { ...mockChartData, chartType: "bar" };
    render(<ChartDisplay data={barData} />);
    expect(screen.getByText("Bar Chart")).toBeInTheDocument();
  });

  it("renders doughnut chart", () => {
    const doughnutData = { ...mockChartData, chartType: "doughnut" };
    render(<ChartDisplay data={doughnutData} />);
    expect(screen.getByText("Doughnut Chart")).toBeInTheDocument();
  });

  it("displays chart title", () => {
    const dataWithTitle = { ...mockChartData, title: "Sales Chart" };
    render(<ChartDisplay data={dataWithTitle} />);
    expect(screen.getByText("Sales Chart")).toBeInTheDocument();
  });

  it("displays chart subtitle", () => {
    const dataWithSubtitle = { ...mockChartData, subtitle: "Monthly data" };
    render(<ChartDisplay data={dataWithSubtitle} />);
    expect(screen.getByText("Monthly data")).toBeInTheDocument();
  });

  it("renders container with correct CSS class", () => {
    const { container } = render(<ChartDisplay data={mockChartData} />);
    const element = container.querySelector('[class*="container"]');
    expect(element).toBeTruthy();
  });
});
