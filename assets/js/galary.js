let API3 = "https://api.39ortomekteb.info/api/gallery";
const wrap = document.querySelector(".galariy_list"); 
if (wrap) {
    fetch(API3)
        .then((res) => res.json())
        .then((gl) => {
            if (!gl.data || !Array.isArray(gl.data)) {
                console.error("Invalid gallery data:", gl);
                return;
            }

            gl.data.forEach((item) => {
                console.log(item);

                const lielement = document.createElement("li");
                lielement.classList.add("galariy_li"); 

                const imageUrl = item.image ? item.image : "../images/placeholder.jpg";

                lielement.innerHTML = `
                    <img class="galariy_img" src="${imageUrl}" alt="Gallery Image">
                `;

                lielement.querySelector("img").addEventListener("click", () => {
                    modal.style.display = "block"; 
                    modalImage.src = imageUrl; 
                });

                wrap.appendChild(lielement);
            });
        })
        .catch((error) => console.error("Error fetching gallery:", error));
} else {
    console.error("Gallery container not found!");
}

closeModal.addEventListener("click", () => {
    modal.style.display = "none"; 
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none"; 
    }
});
