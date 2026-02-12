import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import styles from "./ChartDisplay.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: { size: 12, weight: "bold" },
        padding: 15,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: 12,
      titleFont: { size: 13, weight: "bold" },
      bodyFont: { size: 12 },
      callbacks: {
        afterLabel: (context) => {
          return context.parsed.y?.toFixed(2) || "";
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 11 } },
    },
    y: {
      grid: { color: "rgba(0, 0, 0, 0.05)" },
      ticks: { font: { size: 11 } },
      beginAtZero: true,
    },
  },
};

export default function ChartDisplay({ data = null, source = null }) {
  if (!data) return null;

  const { chartType = "line", title, subtitle } = data;

  // Defensive defaults to avoid runtime errors when datasets or labels are missing
  const labels = Array.isArray(data.labels) ? data.labels : [];

  let datasets = Array.isArray(data.datasets) ? data.datasets : null;

  // If datasets are missing but we have a simple values array, construct one dataset
  if (!datasets && Array.isArray(data.values)) {
    datasets = [
      {
        label: data.datasetLabel || title || "Dados",
        data: data.values,
        borderColor: "#000000",
        backgroundColor: "rgba(0,0,0,0.08)",
        fill: false,
      },
    ];
  }

  // Ensure datasets is at least an empty array to keep Chart.js happy
  if (!datasets) datasets = [];

  const ChartComponent =
    {
      line: Line,
      bar: Bar,
      doughnut: Doughnut,
    }[chartType] || Line;

  const chartData = { labels, datasets };

  return (
    <div className={styles.container}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

      <div className={styles.chartWrapper}>
        <ChartComponent data={chartData} options={chartOptions} />
      </div>

      {source && <div className={styles.dataSource}>Fonte: {source}</div>}
    </div>
  );
}
