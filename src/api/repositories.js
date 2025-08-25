export async function getRepositories() {
  const results = await fetch("https://api.github.com/orgs/godaddy/repos", {
    method: "GET",
  });
  return results.json();
}

export async function getRepositoryData(slug) {
  const results = await fetch(`https://api.github.com/repos/godaddy/${slug}`, {
    method: "GET",
  });
  return results.json();
}
