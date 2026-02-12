import axios from "axios";

// CoinGecko API - Criptomoedas (gratuito, sem chave)
export const cryptoService = {
  async getHistoricalData(coinId = "bitcoin", days = 30) {
    try {
      const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;
      const response = await axios.get(url, { timeout: 10000 });
      return {
        chartType: "line",
        labels: response.data.prices.map((p) =>
          new Date(p[0]).toLocaleDateString(),
        ),
        datasets: [
          {
            label: `${coinId.charAt(0).toUpperCase() + coinId.slice(1)} (USD)`,
            data: response.data.prices.map((p) => p[1]),
            borderColor: "#0070f3",
            backgroundColor: "rgba(0, 112, 243, 0.1)",
            tension: 0.4,
          },
        ],
      };
    } catch (error) {
      console.error("Erro ao buscar dados de criptomoedas:", error);
      return null;
    }
  },
};

// REST Countries API - Dados de países
export const countryService = {
  async getCountryData(countryName) {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}`,
        {
          timeout: 10000,
        },
      );
      if (!response.data || response.data.length === 0) return null;

      const country = response.data[0];
      return {
        name: country.name.common,
        population: country.population,
        area: country.area,
        region: country.region,
        subregion: country.subregion,
        capital: country.capital?.[0],
        languages: country.languages
          ? Object.values(country.languages).join(", ")
          : "N/A",
        currency: country.currencies
          ? Object.values(country.currencies)
              .map((c) => `${c.name} (${c.symbol})`)
              .join(", ")
          : "N/A",
        flag: country.flags?.svg,
      };
    } catch (error) {
      console.error("Erro ao buscar dados do país:", error);
      return null;
    }
  },

  async getCountriesComparison(countries = ["Brazil", "Argentina", "Chile"]) {
    try {
      const allCountries = await Promise.all(
        countries.map((name) => this.getCountryData(name)),
      );

      const validCountries = allCountries.filter((c) => c !== null);

      return {
        chartType: "bar",
        labels: validCountries.map((c) => c.name),
        datasets: [
          {
            label: "População",
            data: validCountries.map((c) => c.population / 1000000), // em milhões
            backgroundColor: "rgba(0, 112, 243, 0.7)",
          },
          {
            label: "Área (km²)",
            data: validCountries.map((c) => c.area / 1000), // em milhares de km²
            backgroundColor: "rgba(118, 75, 162, 0.7)",
          },
        ],
      };
    } catch (error) {
      console.error("Erro ao comparar países:", error);
      return null;
    }
  },
};

// Open-Meteo API - Clima e dados geográficos (sem chave)
export const climateService = {
  async getWeatherData(latitude, longitude) {
    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`,
        { timeout: 10000 },
      );

      return {
        current: response.data.current,
        daily: response.data.daily,
      };
    } catch (error) {
      console.error("Erro ao buscar dados climáticos:", error);
      return null;
    }
  },
};

// World Bank API - Dados econômicos (sem chave)
export const worldBankService = {
  async getIndicatorData(countryCode, indicatorCode) {
    try {
      const response = await axios.get(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicatorCode}?format=json&date=1990:2023`,
        { timeout: 10000 },
      );

      if (!response.data[1]) return null;

      const data = response.data[1]
        .filter((d) => d.value !== null)
        .reverse()
        .slice(0, 20);

      return {
        chartType: "line",
        labels: data.map((d) => d.date),
        datasets: [
          {
            label: indicatorCode,
            data: data.map((d) => d.value),
            borderColor: "#0070f3",
            backgroundColor: "rgba(0, 112, 243, 0.1)",
            tension: 0.4,
          },
        ],
      };
    } catch (error) {
      console.error("Erro ao buscar dados do World Bank:", error);
      return null;
    }
  },
};

// Simulador de dados financeiros
export const financialSimulator = {
  generateRandomTimeSeries(label, days = 30) {
    const data = [];
    let value = 100;
    const labels = [];

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      labels.push(
        date.toLocaleDateString("pt-BR", { month: "short", day: "numeric" }),
      );

      const change = (Math.random() - 0.48) * 5;
      value = Math.max(50, value + change);
      data.push(Number(value.toFixed(2)));
    }

    return {
      chartType: "line",
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: "#0070f3",
          backgroundColor: "rgba(0, 112, 243, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    };
  },

  generateBarChart(title, categories, values) {
    return {
      chartType: "bar",
      labels: categories,
      datasets: [
        {
          label: title,
          data: values,
          backgroundColor: [
            "rgba(0, 112, 243, 0.7)",
            "rgba(118, 75, 162, 0.7)",
            "rgba(255, 99, 132, 0.7)",
            "rgba(255, 193, 7, 0.7)",
            "rgba(76, 175, 80, 0.7)",
          ],
        },
      ],
    };
  },

  generatePieChart(title, labels, data) {
    return {
      chartType: "doughnut",
      labels,
      datasets: [
        {
          label: title,
          data,
          backgroundColor: [
            "rgba(0, 112, 243, 0.8)",
            "rgba(118, 75, 162, 0.8)",
            "rgba(255, 99, 132, 0.8)",
            "rgba(255, 193, 7, 0.8)",
            "rgba(76, 175, 80, 0.8)",
            "rgba(255, 152, 0, 0.8)",
          ],
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    };
  },
};
