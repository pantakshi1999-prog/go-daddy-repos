export function createStatsData(watchers, forks, open_issues_count) {
  return [
    { title: "Watchers", value: watchers },
    { title: "Forks", value: forks },
    { title: "Open Issues", value: open_issues_count },
  ];
}
