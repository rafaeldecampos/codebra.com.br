import styles from "./CountryDataDisplay.module.css";

export default function CountryDataDisplay({ data = null, source = null }) {
  if (!data || !data.data) return null;

  const country = data.data;

  const formatNumber = (num) => {
    if (!num) return "N/A";
    return new Intl.NumberFormat("pt-BR").format(num);
  };

  const DataRow = ({ label, value }) => (
    <div className={styles.dataRow}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          {country.flag && (
            <img
              src={country.flag}
              alt={country.name}
              className={styles.flag}
            />
          )}
          <h2 className={styles.title}>{country.name}</h2>
        </div>
        {source && <p className={styles.source}>Fonte: {source}</p>}
      </div>

      <div className={styles.dataGrid}>
        <DataRow label="População" value={formatNumber(country.population)} />
        <DataRow label="Área (km²)" value={formatNumber(country.area)} />
        {country.capital && <DataRow label="Capital" value={country.capital} />}
        {country.region && <DataRow label="Região" value={country.region} />}
        {country.subregion && (
          <DataRow label="Sub-região" value={country.subregion} />
        )}
        {country.languages && (
          <DataRow label="Idiomas" value={country.languages} />
        )}
        {country.currency && <DataRow label="Moeda" value={country.currency} />}
      </div>
    </div>
  );
}
