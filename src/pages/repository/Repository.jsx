import { useCallback, useEffect } from "react";

import { getRepositoryData } from "../../api/repositories";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";

import PageLayout from "../../components/PageLayout";

import styles from "./repository.module.scss";

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
                { 
                      watchers && (
                        <div className={styles.statCard}>
                          <div>{watchers}</div>
                          <div className={styles.statCardSubtext}>Watchers</div>
                        </div>
                      )
                  }
                  { 
                      forks && (
                          <div className={styles.statCard}>
            <div>{forks}</div>
            <div className={styles.statCardSubtext}>Forks</div>
          </div>
                      )
                  }
                  { 
                      open_issues_count && (
                           <div className={styles.statCard}>
            <div>{open_issues_count}</div>
            <div className={styles.statCardSubtext}>Open Issues</div>
          </div>
                      )
                  }
              </div>
              { 
                  language && (
                      <div className={styles.languageCard}>Language: {language}</div>
                  )
              }
        
      </div>
    </PageLayout>
  );
}

export default Repository;
