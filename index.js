

window.onload = function () {



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

        containerDiv.onclick = function () {

            // Example usage:
            const originalUrl = window.location.href;
            const updatedLastPart = "detail.html";
            const stateData = result.id;

            const updatedUrl = updateLastPartOfUrl(originalUrl, updatedLastPart, stateData);

            window.location.href = updatedUrl.href + updatedUrl.newUrl;
        };
        containerDiv.appendChild(node);
    });

    list.appendChild(containerDiv);
};


function updateLastPartOfUrl(baseUrl, updatedLastPart, state) {
    const url = new URL(baseUrl);
    const pathParts = url.pathname.split('/');
    pathParts[pathParts.length - 1] = updatedLastPart;
    url.pathname = pathParts.join('/');

    // history.pushState({ state }, "", url.href);
    // Get the current URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Set a parameter in the URL
    urlParams.set('id', state);

    // Update the URL with the new parameters
    const newUrl = `?${urlParams.toString()}`;

    return { href: url.href, newUrl };
}

