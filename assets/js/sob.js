const sobitya = 'https://api.39ortomekteb.info/api/blog';
const list2 = document.querySelector(".sucsses_list");
const searchInput = document.getElementById("searchInput");  

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDate = document.getElementById("modalDate");
const modalBody = document.getElementById("modalBody");

let Data = [];

fetch(sobitya)
  .then((res) => res.json())
  .then((sob) => {
    Data = sob.data;  
    renderBlogList(Data);  
  })
  .catch((error) => console.error("Error:", error));

function renderBlogList(data) {
  list2.innerHTML = "";  
  data.forEach((item) => {
    const li2 = document.createElement("li");
    li2.classList.add("sucsses_li");

    let doby = JSON.parse(`${item.body}`);

    li2.innerHTML = `
      <img class="sucsses_img" src="${doby.image}" alt="Изображение">
      <p class="sucsses_name">${item.title}</p>
      <div class="sucsses_position">${doby.date}</div>
    `;

    li2.addEventListener("click", () => {
      modalTitle.textContent = item.title;
      modalImage.src = doby.image;
      modalDate.textContent = doby.date;
      modalBody.textContent = doby.body;

      modal.style.display = "block";
    });

    list2.appendChild(li2);
  });
}

searchInput.addEventListener("input", (event) => {
  const searchQuery = event.target.value.toLowerCase();
  
  const filteredBlogs = blogData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery)
  );

  renderBlogList(filteredBlogs);
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
