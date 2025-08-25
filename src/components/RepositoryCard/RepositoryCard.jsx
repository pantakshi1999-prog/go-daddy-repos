import { useNavigate } from "react-router-dom";

import styles from "./repositoryCard.module.scss";

function RepositoryCard({ forks, watchers, language, name }) {
  const navigate = useNavigate();

  const handleRepositoryClick = () => {
    navigate(`/repository/${name}`);
  };

  return (
    <div
      className={styles.card}
      onClick={handleRepositoryClick}
      data-testid="repository-card"
    >
      <div className={styles.cardSegment}>{name || "Not available"}</div>
      <div className={styles.cardSegment}>{language || "Not available"}</div>
      <div className={styles.cardSegment}>{forks || "Not available"}</div>
      <div className={styles.cardSegment}>{watchers || "Not available"}</div>
    </div>
  );
}

export default RepositoryCard;
