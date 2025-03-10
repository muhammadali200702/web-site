let input = document.querySelector('.search_input');
        const API = "https://api.39ortomekteb.info/api/teachers";
        const list = document.querySelector('.tech_api');
        let data = [];
        fetch(API)
            .then((res) => res.json())
            .then((teachers) => {
                data = teachers.data;
                renderList(data);
            })
            .catch((err) => console.log("Error:", err));

        function renderList(items) {
            list.innerHTML = "";
            items.forEach((item) => {
                const li = document.createElement("li");
                li.classList.add('tech_li');
                li.innerHTML = `
                    <img class="tech_img" src="${item.image}" alt="">
                    <p class="tech_name">${item.full_name}</p> 
                    <p class="tech_name">${item.subject}</p> 
                `;
                list.appendChild(li);
            });
        }

        input.addEventListener("input", (e) => {
            const searchText = e.target.value.toLowerCase();
            const filteredData = data.filter(item =>
                item.full_name.toLowerCase().includes(searchText) ||
                item.subject.toLowerCase().includes(searchText)
            );
            renderList(filteredData);
        }); 