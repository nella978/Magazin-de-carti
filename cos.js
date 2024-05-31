let paginaDeCos = document.querySelector("#cos");
let totalText = document.querySelector("#cos .total .suma");

window.addEventListener("load", function () {
    if (localStorage.getItem("cos") == null) {
        this.localStorage.setItem("cos", "[]");
    }

    actualizeaza_nr_cos();

    if (paginaDeCos) {
        let produse = listeaza_produse_cos();
        afiseaza_produse_cos(produse);

        let total = produse.reduce(
            (total, produs) => total + produs.pret * produs.cantitate,
            0
        );
        totalText.innerHTML = `${total}<sub>mdl</sub>`;

        paginaDeCos.addEventListener("click", function (e) {
            if (e.target.classList.contains("minus")) {
                let id_produs = e.target.closest(".cos-item").dataset.id;
                sterge_din_cos(id_produs);

                let produse = listeaza_produse_cos();
                afiseaza_produse_cos(produse);

                let total = produse.reduce(
                    (total, produs) => total + produs.pret * produs.cantitate,
                    0
                );
                totalText.innerHTML = `${total}<sub>mdl</sub>`;
            } else if (e.target.classList.contains("plus")) {
                let id_produs = e.target.closest(".cos-item").dataset.id;
                adauga_in_cos(id_produs);

                let produse = listeaza_produse_cos();
                afiseaza_produse_cos(produse);

                let total = produse.reduce(
                    (total, produs) => total + produs.pret * produs.cantitate,
                    0
                );
                totalText.innerHTML = `${total}<sub>mdl</sub>`;
            }
        });
    }
});

function actualizeaza_nr_cos() {
    let cos = JSON.parse(localStorage.getItem("cos"));

    let nr_produse = cos.reduce((total, produs) => total + produs.cantitate, 0);

    document.documentElement.style.setProperty(
        "--cantitate-cos",
        `"${nr_produse}"`
    );
}

function adauga_in_cos(id_produs) {
    let cos = JSON.parse(localStorage.getItem("cos"));
    let produs = cos.find((produs) => produs.id == id_produs);

    if (produs) {
        produs.cantitate++;
    } else {
        cos.push({ id: id_produs, cantitate: 1 });
    }

    localStorage.setItem("cos", JSON.stringify(cos));

    actualizeaza_nr_cos();
}

function sterge_din_cos(id_produs) {
    let cos = JSON.parse(localStorage.getItem("cos"));
    let produs = cos.find((produs) => produs.id == id_produs);

    if (produs) {
        produs.cantitate--;

        if (produs.cantitate == 0) {
            cos = cos.filter((produs) => produs.id != id_produs);
        }

        localStorage.setItem("cos", JSON.stringify(cos));
    }

    actualizeaza_nr_cos();
}

function listeaza_produse_cos() {
    let cos = JSON.parse(localStorage.getItem("cos"));
    let produse = [];

    for (let produs of cos) {
        let produs_din_db = listaCarti.find((carte) => carte.id == produs.id);
        produse.push({ ...produs_din_db, cantitate: produs.cantitate });
    }

    return produse;
}

function afiseaza_produse_cos(produse) {
    let container = document.querySelector("#cos .cos-list");
    container.innerHTML = "";

    for (let produs of produse) {
        let element = `
        <div class='cos-item' data-id='${produs.id}'>
            <img src='${produs.imagine}' alt='' />
            <div class='info'>
                <h3 class='nume'>${produs.nume}</h3>
                <p class='autor'>${produs.autor}</p>
                <p class='pret'>
                    ${produs.pret}<sub>mdl</sub>
                </p>
            </div>
            <div class='cos-item-actions'>
                <button type='button' class='minus'>
                    -
                </button>
                <span class=''>${produs.cantitate}</span>
                <button type='button' class='plus'>
                    +
                </button>
            </div>
        `;

        container.innerHTML += element;
    }

    if (produse.length == 0) {
        container.innerHTML = "<p>Cosul este gol</p>";
    }
}
