import styles from "./scholar-details.module.css";

export default function ScholarDetails({ scholar, scholarData }) {
  return (
    <div className={styles.listItem}>
      <div>
        <p>{scholar.scholar_name}</p>
        <small>{scholarData.name}</small>
      </div>

      <p>{scholarData.mmr}</p>
      <p>
        {scholarData.total_slp * (scholar.manager_percentage / 100).toFixed(2)}
      </p>
      <p>
        {scholarData.total_slp *
          ((100 - scholar.manager_percentage) / 100).toFixed(2)}
      </p>
      <p>{scholarData.total_slp}</p>
    </div>
  );
}
