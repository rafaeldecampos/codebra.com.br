import {
  cryptoService,
  countryService,
  worldBankService,
  financialSimulator,
} from "models/dataServices";
import { getSuggestionById } from "models/suggestions";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: 'Path parameter "id" is required' });
  }

  const suggestion = getSuggestionById(id);

  if (!suggestion) {
    return res.status(404).json({ error: "Content not found" });
  }

  try {
    let chartData = null;

    // Buscar dados baseado na fonte de dados
    switch (suggestion.dataSource) {
      case "coingecko":
        chartData = await cryptoService.getHistoricalData(
          suggestion.params.coinId,
          suggestion.params.days,
        );
        break;

      case "restcountries":
        if (suggestion.type === "country-data") {
          const countryData = await countryService.getCountryData(
            suggestion.params.country,
          );
          if (countryData) {
            chartData = {
              chartType: "table",
              data: countryData,
            };
          }
        } else if (suggestion.type === "countries-comparison") {
          chartData = await countryService.getCountriesComparison(
            suggestion.params.countries,
          );
        }
        break;

      case "worldbank":
        chartData = await worldBankService.getIndicatorData(
          suggestion.params.countryCode,
          suggestion.params.indicatorCode,
        );
        break;

      case "simulator":
        if (suggestion.type === "stock-simulation") {
          chartData = financialSimulator.generateRandomTimeSeries(
            suggestion.params.label,
            suggestion.params.days,
          );
        } else if (suggestion.type === "market-distribution") {
          chartData = financialSimulator.generatePieChart(
            suggestion.params.title,
            suggestion.params.labels,
            suggestion.params.data,
          );
        } else if (suggestion.type === "revenue-comparison") {
          chartData = financialSimulator.generateBarChart(
            suggestion.params.title,
            suggestion.params.categories,
            suggestion.params.values,
          );
        }
        break;

      default:
        chartData = financialSimulator.generateRandomTimeSeries(
          suggestion.title,
        );
    }

    return res.status(200).json({
      ...suggestion,
      chartData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return res
      .status(500)
      .json({
        error: "Erro ao buscar dados da fonte externa",
        details: error.message,
      });
  }
}
