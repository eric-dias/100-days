const container = document.querySelector(".container");
const gridButton = document.getElementById("submit-grid");
const clearGridButton = document.getElementById("clear-grid");
const gridWidth = document.getElementById("width-range");
const gridHeight = document.getElementById("height-range");
const colorButton = document.getElementById("color-input");
const eraseBtn = document.getElementById("erase-btn");
const paintBtn = document.getElementById("paint-btn");
const widthValue = document.getElementById("width-value");
const heightValue = document.getElementById("height-value");

let events = {                           // ???
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend"
    }
};

let deviceType = "";

let draw = false;
let erase = false;

const isTouchDevice = () => { //verificar se o dispositivo é touch
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

gridButton.addEventListener("click", () => {
    container.innerHTML = "";
    let count = 0;
    for (let i = 0; i < gridHeight.value; i++) {
        //altura
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow"); // gridrow é a div da linha horizontal inteira

        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol"); //gridcol é cada pixel que forma a linha horizonal
            col.setAttribute("id", `gridCol${count}`);
            col.addEventListener(events[deviceType].down, () => { // down?
                draw = true;
                if (erase) {
                    col.style.background = "transparent";
                } else {
                    col.style.background = colorButton.value;
                }
            });

            col.addEventListener(events[deviceType].move, (e) => { // ??? para pintar
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, () => {
                draw = false;
            });

            div.appendChild(col); //adicionar a div.col a div.row (pixel na linha inteira)
        }

        container.appendChild(div); // adicionar a div.row no container total
    }
});

function checker(elementId) { // é a funcao que apaga e desenha
    let gridColumns = document.querySelectorAll(".gridCol"); //qual pixel selecionar ???
    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

clearGridButton.addEventListener("click", () => {
    container.innerHTML = "";
    gridHeight.value = 0;
    gridWidth.value = 0;
    heightValue.innerText = 0;
    widthValue.innerText = 0;
});

eraseBtn.addEventListener("click", () => {
    erase = true;
});

paintBtn.addEventListener("click", () => {
    erase = false;
});

gridWidth.addEventListener("input", () => {
    widthValue.innerHTML =
        gridWidth.value <= 9 ? `0${gridWidth.value}` : gridWidth.value; //se for menor que 9 adicionar 0 na frente para ficar com 2 dígitos
});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML =
        gridHeight.value <= 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};
