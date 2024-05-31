const formularFiltre = document.querySelector("#carti form.filtre");
const formularCautare = document.querySelector("#header-form input");

window.addEventListener("load", function () {
    let urlParams = new URLSearchParams(window.location.search);
    let cautare = urlParams.get("cauta");

    if (cautare) {
        formularCautare.value = cautare;
    }

    window.history.replaceState({}, document.title, window.location.pathname);

    formularFiltre.addEventListener("change", actualizeazaListaCarti);
    formularCautare.addEventListener("input", actualizeazaListaCarti);
    actualizeazaListaCarti();
});

function actualizeazaListaCarti() {
    let dateFormular = new FormData(formularFiltre);
    let eticheteSelectate = Array.from(dateFormular.keys());

    let cartiFiltrate = listaCarti.filter((carte) => {
        for (let eticheta of eticheteSelectate) {
            if (!carte.etichete.includes(eticheta)) {
                return false;
            }
        }

        return true;
    });

    let cautare = formularCautare.value.toLowerCase();
    cartiFiltrate = cartiFiltrate.filter((carte) => {
        return carte.nume.toLowerCase().includes(cautare);
    });

    afiseaza_carti(cartiFiltrate);
}

function afiseaza_carti(carti) {
    let container = document.querySelector("#carti .carti-list");
    container.innerHTML = "";

    for (let carte of carti) {
        let element = `
        <a href="carte.html?id=${carte.id}" class="carti-item">
            <img src="${carte.imagine}" alt="" />
            <div class="info">
                <h3 class="nume">${carte.nume}</h3>
                <p class="autor">${carte.autor}</p>
                <p class="pret">${carte.pret}<sub>mdl</sub></p>
            </div>
        </a>
        `;

        container.innerHTML += element;
    }

    if (carti.length == 0) {
        container.innerHTML = "<p>Nu există cărți disponibile.</p>";
    }
}
