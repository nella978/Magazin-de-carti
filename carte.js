window.addEventListener("load", function () {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");

    let carte = listaCarti.find((carte) => carte.id == id);

    if (!carte) {
        window.location.href = "carti.html";
    }

    let container = document.querySelector("#carte .carte-info");
    container.innerHTML = "";
    let element = `
    <img src="${carte.imagine}" alt="" />
    <div class="info">
        <h3 class="nume">${carte.nume}</h3>
        <p class="autor">Autor: ${carte.autor}</p>
        <div class="rezumat">
            <h4>Rezumat</h4>
            <p>${carte.rezumat}</p>
        </div>
        <div class="filtre">
            <h4>Etichete</h4>
            <ul class="filtre-list">
                ${carte.etichete
                    .map((eticheta) => `<li>${eticheta}</li>`)
                    .join("")}
            </ul>
        </div>
    </div>
    `;
    container.innerHTML = element;

    let butonAdauga = document.querySelector(".carte-cumpara button");
    butonAdauga.addEventListener("click", () => {
        adauga_in_cos(carte.id);
    });
});
