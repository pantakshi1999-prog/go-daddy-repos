import styles from "./PageLayout.module.scss";

function PageLayout({ error, isLoading, children, onRefetch }) {
  if (error) {
    return (
      <div className={styles.container}>
        <div>Sorry something went wrong !</div>
        <button className={styles.cta} onClick={onRefetch}>
          Please Try Again
        </button>
      </div>
    );
  } else if (isLoading) {
    return (
      <div className={styles.container} data-testid="loader">
        <div className={styles.loader} />
      </div>
    );
  } else {
    return <>{children}</>;
  }
}

export default PageLayout;
