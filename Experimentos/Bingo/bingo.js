async function loadMain(){
    //paso 1 hacer cosas que no quieras con transicion
    if(getCookie('darkMode')=='true'){document.getElementById('darkMode').checked = true}
    else{document.getElementById('darkMode').checked = false}
    refreshDarkMode()

    //reiniciar el color de los botones
    ponerBlancoTodos()

    await sleep(1) //esperar 1ms
    
    //añadir transiciones a dichas cosas
    document.documentElement.style.setProperty('--CeroCincoSecs', '0.5s');
    console.log("bingo cargado")
}









// detectar clicks hechos en los botones
document.addEventListener("DOMContentLoaded", function() {

    //mostrar el color del slider
    document.getElementById('colorSelect').addEventListener('input', function() {
        switch (parseInt(this.value)) {
            default:
                document.documentElement.style.setProperty('--colorSelected', 'var(--white)');
            break;
            case 2:
                document.documentElement.style.setProperty('--colorSelected', 'var(--red)');
            break;
            case 3:
                document.documentElement.style.setProperty('--colorSelected', 'var(--yellow)');
            break;
            case 4:
                document.documentElement.style.setProperty('--colorSelected', 'var(--green)');
            break;
            case 5:
                document.documentElement.style.setProperty('--colorSelected', 'var(--blue)');
            break;
        }
    });


    //detectar click
    document.getElementById("tablero").addEventListener("click", function(event) {
        if (event.target.tagName === "BUTTON") {
            if (document.getElementById("colorChange").checked) {
                ponerColor(event.target, getComputedStyle(document.documentElement).getPropertyValue('--colorSelected'))
            }
        }
        if (event.target.tagName === "TEXTAREA") {
            var buttonParent = event.target.closest("button");
            if (buttonParent) {
                if (document.getElementById("colorChange").checked) {
                    ponerColor(buttonParent, getComputedStyle(document.documentElement).getPropertyValue('--colorSelected'));
                }
            }
        }
    });
});

//boton de reiniciar colores
function ponerBlancoTodos() {
    var lineas = document.getElementsByClassName("linea");
    for (var i = 0; i < lineas.length; i++) {
        var children = lineas[i].children;
        for (var j = 0; j < children.length; j++) {
            ponerColor(children[j], getComputedStyle(document.documentElement).getPropertyValue('--white'))
        }
    }
}

function ponerColor(boton, color){
    if (color != null&&color != "") {
        boton.style.background = color
    }
}
//desactivar escritura   readonly 
function escritura(){
    if (document.getElementById("colorChange").checked) {

        var lineas = document.getElementsByClassName("linea")
        for (var i = 0; i < lineas.length; i++) {

            var botones= lineas[i].querySelectorAll("button")
            for (var j = 0; j < botones.length; j++) {
                botones[j].querySelector("textarea").setAttribute("readonly", true)
            }
        }
    }else{

        var lineas = document.getElementsByClassName("linea")
        for (var i = 0; i < lineas.length; i++) {

            var botones= lineas[i].querySelectorAll("button")
            for (var j = 0; j < botones.length; j++) {
                botones[j].querySelector("textarea").removeAttribute("readonly")
            }
        }
    }
}






//generador de tamaño
function crearDesdePagina() {
    crearBotones(
        parseInt(document.getElementById("numeroFilas").value),
        parseInt(document.getElementById("numeroBotones").value)
    )
}

function crearBotones(nFilas, nBotones) {

    // contenedor en el que se generan los botones
    var contenedor = document.getElementById("tablero")
    // reiniciar contenedor
    contenedor.innerHTML = ''


    //----  generar divs de las lineas ----
    
    //añadir lineas
    for (var i = 0; i < nFilas; i++) {
        var linea = document.createElement("div")
        linea.classList.add("linea")
        contenedor.appendChild(linea)
    }
    
    //----  generar botones en cada linea ----
    
    //array de lineas
    var lineas = document.getElementsByClassName("linea")

    //por cada linea
    for (var i = 0; i < lineas.length; i++) {
        //crear tantos botones como el numero de botones
        for (var j = 0; j < nBotones; j++) {
            var boton = document.createElement("button")
            var textarea = document.createElement("textarea")
            textarea.setAttribute("placeholder", (i+1)+"-"+(j + 1))
            boton.appendChild(textarea);
            lineas[i].appendChild(boton)
        }
    }
    ponerBlancoTodos()
}