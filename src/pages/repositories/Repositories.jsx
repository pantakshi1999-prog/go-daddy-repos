import { useEffect } from "react";

import { getRepositories } from "@go-daddy-repo/api/repositories";
import { useApi } from "@go-daddy-repo/hooks/useApi";

import PageLayout from "@go-daddy-repo/components/PageLayout";
import RepositoryCard from "@go-daddy-repo/components/RepositoryCard";

import styles from "./repositories.module.scss";

function Repositories() {
  const {
    data: repositories,
    isLoading,
    error,
    execute,
  } = useApi(getRepositories);
  const tableHeaders = ["Name", "Language", "Forks", "Watchers"];
  useEffect(() => {
    execute({});
  }, [execute]);

  return (
    <PageLayout error={error} isLoading={isLoading} onRefetch={execute}>
      <div className={styles.banner}>
        <div className={styles.title}>Repo - List</div>
        <div className={styles.description}>
          All your repositories listed at a place !
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          {tableHeaders.map((tableHeader, index) => (
            <div className={styles.headerRowTopic} key={index}>{tableHeader}</div>
          ))}
        </div>
        <div className={styles.tableDataContainer}>
          {repositories?.map((data, index) => (
            <RepositoryCard {...data} key={index}/>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default Repositories;
