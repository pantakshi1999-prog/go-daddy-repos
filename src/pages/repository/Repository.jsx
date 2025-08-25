import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getRepositoryData } from "@go-daddy-repo/api/repositories";
import { useApi } from "@go-daddy-repo/hooks/useApi";

import PageLayout from "@go-daddy-repo/components/PageLayout";

import styles from "./repository.module.scss";
import { createStatsData } from "./utils";

function Repository() {
  const { slug } = useParams();
  const {
    data: repositoryData,
    isLoading,
    error,
    execute,
  } = useApi(getRepositoryData);
  const {
    watchers,
    language,
    name,
    forks,
    description,
    open_issues_count,
    svn_url,
  } = repositoryData || {};

  const statsData = createStatsData(watchers, forks, open_issues_count);

  useEffect(() => {
    if (slug) {
      execute(slug);
    }
  }, [execute, slug]);

  const handleViewRepository = useCallback(() => {
    window.open(svn_url);
  }, [svn_url]);

  return (
    <PageLayout error={error} isLoading={isLoading} onRefetch={execute}>
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <div>
            <div className={styles.name}>{name}</div>
            <div>{description}</div>
          </div>
          <button
            onClick={handleViewRepository}
            className={styles.viewRepositoryCta}
          >
            View Repository
          </button>
        </div>
        <div className={styles.stats}>
          {statsData.map(({ title, value }, index) => {
            return (
              <>
                {typeof value === "number" && (
                  <div className={styles.statCard} key={index}>
                    <div>{value}</div>
                    <div className={styles.statCardSubtext}>{title}</div>
                  </div>
                )}
              </>
            );
          })}
        </div>
        {language && (
          <div className={styles.languageCard}>Language: {language}</div>
        )}
      </div>
    </PageLayout>
  );
}

export default Repository;
