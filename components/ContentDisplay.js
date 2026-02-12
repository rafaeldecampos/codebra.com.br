import styles from "./ContentDisplay.module.css";

export default function ContentDisplay({ suggestion = null }) {
  if (!suggestion) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{suggestion.title}</h2>
        <span className={styles.category}>{suggestion.category}</span>
      </div>
      <p className={styles.description}>{suggestion.description}</p>
      <div className={styles.meta}>
        <span className={styles.type}>{suggestion.type}</span>
      </div>
    </div>
  );
}
