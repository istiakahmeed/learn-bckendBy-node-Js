console.log("Before");
getUser(1, getRepository);
console.log("After");
function getRepository(user) {
  getRepository(user.userName, getCommits);
}
function getCommits(repos) {
  getCommits(repos, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a repo from database");
    callback({ id: id, userName: "Mosh" });
  }, 2000);
}

function getRepo(username, callback) {
  setTimeout(() => {
    console.log("Calling Github API");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
