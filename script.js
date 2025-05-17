let searchBtn = document.querySelector(".search");
let usernameinp = document.querySelector(".usernameinp");
let card = document.querySelector(".card");

function getProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((res) => {
    if (!res.ok) throw new Error("User not found");
    return res.json();
  });
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos?sort=created`
  ).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch repositories");
    return res.json();
  });
}

function decorateProfileData(details) {
  let data = `<img
          src="${details.avatar_url}"
          alt="GitHub Avatar"
          class="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 class="text-xl font-semibold text-gray-800">${details.name}</h2>
        <p class="text-gray-500 mb-2">${details.login}</p>
        <p class="text-sm text-gray-600 mb-4">${
          details.bio ? details.bio : ""
        }</p>
  
        <div class="grid grid-cols-3 gap-4 text-sm text-gray-700 mb-4">
          <div>
            <span class="font-bold block text-lg">${details.public_repos}</span>
            Repos
          </div>
          <div>
            <span class="font-bold block text-lg">${details.followers}</span>
            Followers
          </div>
          <div>
            <span class="font-bold block text-lg">${details.following}</span>
            Following
          </div>
        </div>
  
        <div class="text-sm text-gray-600 space-y-1">
          <p><strong>Company:</strong> ${
            details.company ? details.company : "N/A"
          }</p>
          <p><strong>Location:</strong>${
            details.location ? details.location : "N/A"
          }</p>
          <p><strong>GitHub:</strong>
            <a href="#" target="_blank" class="text-blue-600 hover:underline">
                ${details.blog ? details.blog : "N/A"}
            </a>
          </p>
        </div>`;

  card.innerHTML = data;
}

searchBtn.addEventListener("click", function () {
  username = usernameinp.value.trim();
  if (username.length > 0) {
    getProfileData(username).then((data) => {
      decorateProfileData(data);
    });
  } else {
    alert("Please enter a username");
  }
});
