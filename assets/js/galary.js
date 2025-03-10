let API3 = "https://api.39ortomekteb.info/api/gallery";
const wrap = document.querySelector(".galariy_list"); 

// Get modal elements
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");

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

                // Add click event to each image
                lielement.querySelector("img").addEventListener("click", () => {
                    modal.style.display = "block"; // Show the modal
                    modalImage.src = imageUrl; // Set the image in modal
                });

                wrap.appendChild(lielement);
            });
        })
        .catch((error) => console.error("Error fetching gallery:", error));
} else {
    console.error("Gallery container not found!");
}

// Close the modal when user clicks the close button
closeModal.addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal
});

// Close the modal when user clicks outside the image
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none"; // Hide the modal if clicked outside
    }
});
