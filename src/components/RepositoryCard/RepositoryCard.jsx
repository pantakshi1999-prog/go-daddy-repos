import styles from "./repositoryCard.module.scss";
import { useNavigate } from "react-router-dom";

function RepositoryCard({ forks, watchers, language, name }) {
  const navigate = useNavigate();

  const handleRepositoryClick = () => {
    navigate(`/repository/${name}`);
  };

  return (
    <div className={styles.card} onClick={handleRepositoryClick}>
      <div className={styles.cardSegment}>{name}</div>
      <div className={styles.cardSegment}>{language}</div>
      <div className={styles.cardSegment}>{forks}</div>
      <div className={styles.cardSegment}>{watchers}</div>
    </div>
  );
}

export default RepositoryCard;
