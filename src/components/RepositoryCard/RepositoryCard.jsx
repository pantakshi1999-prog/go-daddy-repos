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
      {[name, language, forks, watchers].map((fieldValue, index) => {
        return (
          <div className={styles.cardSegment} key={index}>
            {fieldValue || "Not available"}
          </div>
        );
      })}
    </div>
  );
}

export default RepositoryCard;
