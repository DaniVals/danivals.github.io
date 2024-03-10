async function loadMain(){
    //paso 1 hacer cosas que no quieras con transicion
    if(getCookie('darkMode')=='true'){document.getElementById('darkMode').checked = true}
    else{document.getElementById('darkMode').checked = false}
    refreshDarkMode()

    await sleep(1) //esperar 1ms
    
    //añadir transiciones a dichas cosas
    document.documentElement.style.setProperty('--CeroCincoSecs', '0.5s');
    console.log("valsimon dice cargado")
}





// ------------------------------- variables
const pausa = 1000;//ms
const pausaCorta = 200;//ms
let nColores = 9;

let record=0; //cambiar por cookies

let colores = [];
let indexPulsar;

let juegoActivo;
let tocaPulsar;

async function reiniciar() {
    tocaPulsar = false;
    desactivarPanel();
    juegoActivo = true;     
    colores = [];
    
    document.getElementById("blanco").innerHTML = 0
    
    anadirColor();
    await secuenciaBlanco();

    indexPulsar = 0;
    tocaPulsar=true;
    activarPanel();
}


async function botonPulsado(cP) {
    if (juegoActivo == true) {
        if (tocaPulsar == true) {

            colorPulsado = parseInt(cP)

            if (colores[indexPulsar] == colorPulsado) {

                //acierta UN color
                await flashPanel(colorPulsado)
                indexPulsar++


                //si acierta todos
                if (colores.length<=indexPulsar) {

                    //mostrar puntuacion actual en el boton blanco
                    document.getElementById("blanco").innerHTML = indexPulsar
                    
                    //mostrar record
                    if (record < indexPulsar) {
                        record = indexPulsar
                        document.getElementById("record9").innerHTML = "R: "+record
                    }

                    //añadir mas colores y repetir
                    desactivarPanel()
                    tocaPulsar = false

                    indexPulsar = 0
                    anadirColor()
                    await secuenciaBlanco()
                    
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
    colores[colores.length] = Math.floor(Math.random() * nColores);
}
async function secuenciaBlanco() {
    for (let i = 0; i < colores.length; i++) {
        document.getElementById("blanco").style.background = getComputedStyle(document.documentElement).getPropertyValue('--gris')
        await sleep(pausaCorta)
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
        await sleep(pausa)
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
    activarPanel();
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