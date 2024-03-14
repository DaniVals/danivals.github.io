async function loadMain(){
    cargarCookiesSettings()

    //reiniciar el color de los botones
    ponerBlancoTodos()

    await sleep(1)
    document.documentElement.style.setProperty('--CeroCincoSecs', '0.5s');
    
    console.log("bingo cargado")
}






//  ----------------------------------------    generador de tamaño
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
            if (document.getElementById("colorChange").checked) {
                textarea.setAttribute("readonly", true)
            }
            boton.appendChild(textarea);
            lineas[i].appendChild(boton)
        }
    }
    ponerBlancoTodos()
    verificarFreeSpace()
}







//  ---------------------------------------- aplicar colores y texto a mano

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
                document.documentElement.style.setProperty('--colorSelected', 'var(--orange)');
            break;
            case 4:
                document.documentElement.style.setProperty('--colorSelected', 'var(--yellow)');
            break;
            case 5:
                document.documentElement.style.setProperty('--colorSelected', 'var(--green)');
            break;
            case 6:
                document.documentElement.style.setProperty('--colorSelected', 'var(--blue)');
            break;
            case 7:
                document.documentElement.style.setProperty('--colorSelected', 'var(--purple)');
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
//desactivar escritura 
function escritura(){
    if (document.getElementById("colorChange").checked) {

        var lineas = document.getElementsByClassName("linea")
        for (var i = 0; i < lineas.length; i++) {

            var botones= lineas[i].querySelectorAll("button")
            for (var j = 0; j < botones.length; j++) {
                botones[j].querySelector("textarea").setAttribute("readonly", true)
            }
        }
        document.documentElement.style.setProperty('--colorFocus', '#0000');
    }else{

        var lineas = document.getElementsByClassName("linea")
        for (var i = 0; i < lineas.length; i++) {

            var botones= lineas[i].querySelectorAll("button")
            for (var j = 0; j < botones.length; j++) {
                botones[j].querySelector("textarea").removeAttribute("readonly")
            }
        }
        document.documentElement.style.setProperty('--colorFocus', '#0002');
    }
}







//  ---------------------------------------- generar texto aleatoriamente
function generarTextoDesdeTextarea() {
    // Acceder al elemento textarea por su ID
    var textarea = document.getElementById("textareaOpciones");
    var lineas = textarea.value.split('\n');
    ponerTexto(lineas)
}
async function verificarFreeSpace() {
    //sacar datos
    var lineas = document.getElementsByClassName("linea")
    var botones = lineas[0].querySelectorAll("button")
    var length2 =  lineas.length * botones.length
    
    if (length2%2==0) {
        document.getElementById("freeSpaceCheckbox").checked = false
    }
}
function ponerTexto(arrayString){
    
    //sacar datos
    var lineas = document.getElementsByClassName("linea")
    var botones = lineas[0].querySelectorAll("button")
    var length2 =  lineas.length * botones.length

    //rellenar array con espacion en blanco
    if (document.getElementById("freeSpaceCheckbox").checked) {
        for (let i = arrayString.length; i < length2-1; i++) {
            arrayString[i] = ""
        }
    }else{
        for (let i = arrayString.length; i < length2; i++) {
            arrayString[i] = ""
        }
    }

    //mezclar array
    if (document.getElementById("randomCheckbox").checked) {
        shuffle(arrayString)
    }

    //colocar en los botones
    for (var i = 0; i < lineas.length; i++) {
        botones = lineas[i].querySelectorAll("button")
        for (var j = 0; j < botones.length; j++) {

            //con freespace
            if (document.getElementById("freeSpaceCheckbox").checked) {
                if (i*botones.length+j == (length2/2)-0.5 ) {
                    botones[j].querySelector("textarea").innerText = "FREE SPACE"
                } else {
                    if (i*botones.length+j < length2/2 ) {
                        botones[j].querySelector("textarea").innerText = arrayString[i*botones.length + j]
                        
                    } else {
                        botones[j].querySelector("textarea").innerText = arrayString[i*botones.length + j-1]
                        
                    }
                }
                
            //sin freespace
            } else {
                botones[j].querySelector("textarea").innerText = arrayString[i*botones.length + j]
            }
        }
    }
}




//  ---------------------------------------- leer archivo
function leerArchivo() {
    
    var file = document.getElementById("fileInput").files[0]; // Obtener el primer archivo seleccionado
    if (file) {

        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) {
        
            // Detectar primeras dos lineas
            var lineas = e.target.result.split('\n');
            var primeraLinea = lineas[0].trim();
            var segundaLinea = lineas[1].trim();

            // Eliminar las dos primeras líneas
            lineas.splice(0, 2);
            let texto = lineas.join('\n');
            
            document.getElementById("numeroFilas").value = parseInt(primeraLinea)
            document.getElementById("numeroBotones").value = parseInt(segundaLinea)
            document.getElementById("textareaOpciones").value = texto
        };
        
    }
}
