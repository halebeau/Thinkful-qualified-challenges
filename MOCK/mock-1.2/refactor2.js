const axios = require("axios");

const contributorCount = (repositories, contributorsList) => {
return repositories.map((repository, position) => {
   return {
   name: repository.name,
   numberOfContributors: contributorsList[position].length,
   };
});
};

const getRepositoryContributors = async (repository) => {
const contributorsResponse = await axios.get(repository.contributors_url);
return await contributorsResponse.data;
};

const getRepositories = (repositories, upToIndex) => {
const repositoriesCopy = repositories.slice(0, upToIndex);
return Promise.all(repositoriesCopy.map(getRepositoryContributors)).then(
   (contributors) => {
   return contributorCount(repositoriesCopy, contributors);
   }
);
};

const getOrganizationInfo = async (organizations) => {
const organizationRepositories = await axios.get(organizations[2].repos_url);
return organizationRepositories.data;
};

function findOrganizationInfo() {
axios
   .get("https://api.github.com/organizations")
   .then((response) => response.data)
   .then(getOrganizationInfo)
   .then((repositories) => getRepositories(repositories, 5))
   .then((repositoryContributorCounts) => {
   console.log(repositoryContributorCounts);
   })
   .catch((error) => {
   console.log(error);
   });
}
