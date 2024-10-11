async function loadMain(){
    cargarCookiesSettings()
    await sleep(1)
    document.documentElement.style.setProperty('--CeroCincoSecs', '0.5s');
    
    //leer records
    document.getElementById("record4").innerHTML = "R: "+checkEmptyText(getCookie("record4"), 0)
    document.getElementById("record6").innerHTML = "R: "+checkEmptyText(getCookie("record6"), 0)
    document.getElementById("record9").innerHTML = "R: "+checkEmptyText(getCookie("record9"), 0)
    console.log("valsimon dice cargado")
}





// ------------------------------- variables
const pausa = 1000;//ms
const pausaCorta = 200;//ms
let nColores = 9;

let record = 0; //cambiar por cookies

let colores = [];
let indexPulsar = 0;

let juegoActivo = false;
let tocaPulsar = false;
let secuanciaActiva = false;

async function reiniciar() {
    tocaPulsar = false;
    desactivarPanel();
    juegoActivo = true;   
    secuanciaActiva = false;  
    colores = [];

    document.getElementById("blanco").innerHTML = 0
    document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--blanco')
    record = parseInt(checkEmptyText(getCookie("record"+nColores),0))
    
    anadirColor();
    await secuenciaBlanco();
    
    indexPulsar = 0;
    tocaPulsar=true;
    activarPanel();
}
function formatear() {
    tocaPulsar = false;
    juegoActivo = false;
    secuanciaActiva = false;
    document.getElementById("blanco").innerHTML = 0
    document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--blanco')
    activarPanel();
}

// ------------------------------------------------- MAIN
async function botonPulsado(cP) {
    if (juegoActivo == true) {
        if (tocaPulsar == true) {

            colorPulsado = parseInt(cP)

            if (colores[indexPulsar] == colorPulsado) {

                //acierta UN color
                flashPanel(colorPulsado)
                indexPulsar++


                //si acierta todos
                if (colores.length<=indexPulsar) {

                    //mostrar puntuacion actual en el boton blanco
                    document.getElementById("blanco").innerHTML = indexPulsar
                    
                    //mostrar record
                    if (record < indexPulsar) {
                        record = indexPulsar
                        setCookie("record"+nColores, record, 90)
                        document.getElementById("record"+nColores).innerHTML = "R: "+record
                    }

                    //añadir mas colores y repetir
                    desactivarPanel()
                    tocaPulsar = false

                    indexPulsar = 0
                    anadirColor()
                    await secuenciaBlanco()
                    
                    console.log("panel activado")
                    activarPanel()
                    tocaPulsar = true
                }


            }else{

                //falla
                juegoActivo = false;
                desactivarPanel()
                document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--gris')
            }
        }
    }
}
function anadirColor() {
    let checkColor = Math.floor(Math.random() * 9)
    let coloresDisponibles = [0]
    if (nColores == 4) {
        coloresDisponibles = [0,2,3,5]
    }
    if (nColores == 6) {
        coloresDisponibles = [0,1,2,3,5,7]
    }

    //si no esta al maximo de colores, comprobar 
    if (nColores < 9) {
        while (!coloresDisponibles.includes(checkColor)) {
            checkColor = Math.floor(Math.random() * nColores)
        }
    }
    colores[colores.length] = checkColor;
}







function confirmacionDificultad() {
    if (juegoActivo == false) {
        return true;
    }else{
        if (window.confirm("Se reiniciara la partida. ¿Desea continuar?")) {
            return true;
        } else {
            return false;
        }
    }
}
function cambiarDificultad(nBotones) {
    if (confirmacionDificultad()) {
            
        nColores = nBotones;
        record=getCookie("record"+nColores)
        
        document.documentElement.style.setProperty('--columnas', '1');
        document.getElementById("rojo"      ).style.display = "none"
        document.getElementById("naranja"   ).style.display = "none"
        document.getElementById("amarillo"  ).style.display = "none"
        document.getElementById("verde"     ).style.display = "none"
        document.getElementById("turquesa"  ).style.display = "none"
        document.getElementById("celeste"   ).style.display = "none"
        document.getElementById("azul"      ).style.display = "none"
        document.getElementById("morado"    ).style.display = "none"
        document.getElementById("rosa"      ).style.display = "none"
        
        if (4<=nBotones) {
            document.documentElement.style.setProperty('--columnas', '2');
            document.getElementById("rojo"      ).style.display = ""
            document.getElementById("amarillo"  ).style.display = ""
            document.getElementById("verde"     ).style.display = ""
            document.getElementById("celeste"   ).style.display = ""
        }
        if (6<=nBotones) {
            document.documentElement.style.setProperty('--columnas', '3');
            document.getElementById("naranja"   ).style.display = ""
            document.getElementById("morado"    ).style.display = ""
        }
        if (9<=nBotones) {
            document.getElementById("turquesa"  ).style.display = ""
            document.getElementById("azul"      ).style.display = ""
            document.getElementById("rosa"      ).style.display = ""
        }

        formatear()
    }
}

// ------------------------------ MUCHO SWITCH ---- AAAAAAAAAAAAAAAAAA

async function secuenciaBlanco() {
    secuanciaActiva = true
    for (let i = 0; i < colores.length; i++) {


        document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--gris')
        if (secuanciaActiva == false) {return ;}
        await sleep(pausaCorta)
        if (secuanciaActiva == false) {return ;}

        switch (colores[i]) {
            case 0:
                document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--rojo')
            break;
            case 1:
                document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--naranja')
            break;
            case 2:
                document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--amarillo')
            break;
            case 3:
                document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--verde')
            break;
            case 4:
                document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--turquesa')
            break;
            case 5:
                document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--celeste')
            break;
            case 6:
                document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--azul')
            break;
            case 7:
                document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--morado')
            break;
            case 8:
                document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--rosa')
            break;
        }
        if (secuanciaActiva == false) {return ;}
        await sleep(pausa)
        if (secuanciaActiva == false) {return ;}
    }
    document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--blanco')
}
async function flashPanel(color) {
    switch (color) {
        case 0:
            desactivarPanel();
            document.getElementById("rojo").style.background = getComputedStyle(document.documentElement).getPropertyValue('--rojo')
        break;
        case 1:
            desactivarPanel();
            document.getElementById("naranja").style.background = getComputedStyle(document.documentElement).getPropertyValue('--naranja')
        break;
        case 2:
            desactivarPanel();
            document.getElementById("amarillo").style.background = getComputedStyle(document.documentElement).getPropertyValue('--amarillo')
        break;
        case 3:
            desactivarPanel();
            document.getElementById("verde").style.background = getComputedStyle(document.documentElement).getPropertyValue('--verde')
        break;
        case 4:
            desactivarPanel();
            document.getElementById("turquesa").style.background = getComputedStyle(document.documentElement).getPropertyValue('--turquesa')
        break;
        case 5:
            desactivarPanel();
            document.getElementById("celeste").style.background = getComputedStyle(document.documentElement).getPropertyValue('--celeste')
        break;
        case 6:
            desactivarPanel();
            document.getElementById("azul").style.background = getComputedStyle(document.documentElement).getPropertyValue('--azul')
        break;
        case 7:
            desactivarPanel();
            document.getElementById("morado").style.background = getComputedStyle(document.documentElement).getPropertyValue('--morado')
        break;
        case 8:
            desactivarPanel();
            document.getElementById("rosa").style.background = getComputedStyle(document.documentElement).getPropertyValue('--rosa')
        break;
    }
    await sleep(pausaCorta)
    if (tocaPulsar==true) {
        activarPanel();
    }
}
function activarPanel() {
    document.getElementById("rojo").style.background = getComputedStyle(document.documentElement).getPropertyValue('--rojo')
    document.getElementById("naranja").style.background = getComputedStyle(document.documentElement).getPropertyValue('--naranja')
    document.getElementById("amarillo").style.background = getComputedStyle(document.documentElement).getPropertyValue('--amarillo')
    document.getElementById("verde").style.background = getComputedStyle(document.documentElement).getPropertyValue('--verde')
    document.getElementById("turquesa").style.background = getComputedStyle(document.documentElement).getPropertyValue('--turquesa')
    document.getElementById("celeste").style.background = getComputedStyle(document.documentElement).getPropertyValue('--celeste')
    document.getElementById("azul").style.background = getComputedStyle(document.documentElement).getPropertyValue('--azul')
    document.getElementById("morado").style.background = getComputedStyle(document.documentElement).getPropertyValue('--morado')
    document.getElementById("rosa").style.background = getComputedStyle(document.documentElement).getPropertyValue('--rosa')
}
function desactivarPanel() {
    document.getElementById("rojo").style.background = getComputedStyle(document.documentElement).getPropertyValue('--gris')
    document.getElementById("naranja").style.background = getComputedStyle(document.documentElement).getPropertyValue('--gris')
    document.getElementById("amarillo").style.background = getComputedStyle(document.documentElement).getPropertyValue('--gris')
    document.getElementById("verde").style.background = getComputedStyle(document.documentElement).getPropertyValue('--gris')
    document.getElementById("turquesa").style.background = getComputedStyle(document.documentElement).getPropertyValue('--gris')
    document.getElementById("celeste").style.background = getComputedStyle(document.documentElement).getPropertyValue('--gris')
    document.getElementById("azul").style.background = getComputedStyle(document.documentElement).getPropertyValue('--gris')
    document.getElementById("morado").style.background = getComputedStyle(document.documentElement).getPropertyValue('--gris')
    document.getElementById("rosa").style.background = getComputedStyle(document.documentElement).getPropertyValue('--gris')
}