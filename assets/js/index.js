let aside = document.querySelector(".aside");
let content = document.querySelector(".content");

const fetcher = async (url, errorMessage) => {
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`${errorMessage} ,status code is : ${res.status}`);
  return await res.json();
};

const renderPosts = (data) => {
  data.length = 5;
  content.innerHTML = data
    .map(
      ({ title, body }) => `
        <div class="post">
          <div class="post-title">${title}</div>
          <div class="post-body">
           ${body}
          </div>
        </div>`
    )
    .join("");
};
const renderUsers = (data) => {
  data.length = 5;
  aside.innerHTML = data
    .map(
      ({ id, name, email, address: { city, street } }) =>
        `<div class="${id === 1 ? "active" : ""} user" data-id=${id}>
          <h1 class="name">${name}</h1>
          <h4 class="email">${email}</h4>
          <h2 class="city">${city}</h2>
          <h3 class="street">${street} </h3>
        </div>`
    )
    .join("");
};

const fetchPosts = async (id) => {
  try {
    const data = await fetcher(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`,
      "error getting user id from the server"
    );
    renderPosts(data);
  } catch (error) {
    console.log(error);
  }
};

aside.addEventListener("click", function (e) {
  const target = e.target.closest(".user");
  if (target) {
    // Remove "active" class from the previous active element
    const active = aside.querySelector(".active");
    if (active) {
      active.classList.remove("active");
    }

    // Add "active" class to the clicked user
    target.classList.add("active");

    // Fetch and render posts
    fetchPosts(target.dataset.id);
    content.classList.add("animate");
    setTimeout(() => content.classList.remove("animate"), 500);
  }
});

const fetchingUsers = async () => {
  try {
    const data = await fetcher("https://jsonplaceholder.typicode.com/users");
    renderUsers(data);
  } catch (error) {
    console.log("error fetching users", error.message);
  }
};

fetchPosts(1);
fetchingUsers();
