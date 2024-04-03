console.log("Before");
getUser(1, function (user) {
  // Get the repository

  getRepo(user.userName, function (repos) {
    console.log("Repose", repos);

    getCommits(repos, function (commits) {
      // callback Hell
    });
  });
});
console.log("After");

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
