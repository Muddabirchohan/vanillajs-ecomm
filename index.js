window.onload = function() {

    fetch("https://rickandmortyapi.com/api/character")
        .then(res => res.json())
        .then(res => {
            setTimeout(() => {
                document.getElementById("loader").innerHTML = "";
             
                document.getElementsByClassName("loader-parent")[0].classList.remove("loader-parent");
                document.getElementById("loader").removeAttribute("id")


                for (let i = 0; i < res.results.length; i++) {
                    const result = res.results[i]
                    nodeCreate(["p", "img"], result);
                }
            }, 500);


        });
};

const nodeCreate = (nodeList, result) => {
    const list = document.getElementsByClassName("list-items")[0];
    let containerDiv = document.createElement("div");

    nodeList.map(item => {
        let node = document.createElement(item);

        if (item == "img") {
            node.src = result.image;
        }
        if (item == "p") {
            node.innerHTML = result.name;
        }

        containerDiv.appendChild(node);
    });

    list.appendChild(containerDiv);
};
