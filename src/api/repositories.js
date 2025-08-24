export async function getRepositories() {
  const results = await fetch("https://api.github.com/orgs/godaddy/repos");
  return results.json();
}

export async function getRepositoryData(slug) {
  const results = await fetch(`https://api.github.com/repos/godaddy/${slug}`);
  return results.json();
}
