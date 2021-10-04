const axios = require("axios");

const contributorCount = (repositories, contributorsList) => {
let repositoryContributorCount = [];
for (let i = 0; i < repositories.length; i++) {
   repositoryContributorCount.push({
      name: repositories[i].name,
      numberOfContributors: contributorsList[i].length,
   });
}
return repositoryContributorCount;
};

const getRepoContributors = async (repo) => {
const contributorsResponse = await axios.get(repo.contributors_url);
return await contributorsResponse.data;
};

const getAllRepos = (repos) => {
const newRepos = repos.slice(0, 5);
return Promise.all(newRepos.map(getRepoContributors)).then((contributors) => {
   return contributorCount(newRepos, contributors);
});
};

function listRepoContributorCounts() {
axios
   .get("https://api.github.com/orgs/wesabe/repos")
   .then((response) => response.data)
   .then(getAllRepos)
   .then((repositoryContributorCounts) => {
      return repositoryContributorCounts;
   })
   .catch((error) => {
      return error;
   });
}
module.exports = { listRepoContributorCounts };