async function loadMain(){
    
    cargarCookiesSettings()
    await sleep(1)
    document.documentElement.style.setProperty('--CeroCincoSecs', '0.5s');

    console.log("trivia cargado")
}

const pausa = 500;//ms
const folderPath = './Preguntas/';
const archivos = [
    ["BasesDeDatos no es SGBD.txt",""],
    


    // -------------------------------------------------------- CULTURILLA
    ["C Historia descartes.txt","culturilla historia"],
    ["C Historia que se invento antes.txt","culturilla historia"],
    
    ["C Biologia hamsters domesticos.txt","culturilla"],

    ["C Cocina ingredientes cosmopolitan.txt","culturilla"],
    
    ["C Internet primer meme.txt","culturilla historia"],



    // -------------------------------------------------------- VIDEOJUEGOS
    //Undertale
    ["V Undertale color amarillo.txt","videojuegos"],
    
    //Isaac
    ["V Isaac personajes muertos.txt","videojuegos"],
    
    //FNAF
    ["V FNAF duracion noche 1.txt","videojuegos"],
    ["V FNAF creador.txt","videojuegos"],
    
    //Minecraft
    ["V Minecraft crafteo espada.txt","videojuegos"],
    ["V Minecraft mob explota.txt","videojuegos"],
    ["V Minecraft dimensiones.txt","videojuegos"],
    
    ["V Minecraft nombre vegeta.txt","videojuegos"],
];

let archivosYaUsados = [];
let archivosParaUsar = [];
let pregunta = []; // se tiene que dejar fuera para poder guardar cual es la opcion correcta

/* ------- Esquema del archivo de pregunta -------
    Titulo pregunta
    Opcion a
    Opcion b
    Opcion c
    Opcion d
    numero de la opcion correcta (del 1 al 4)
    autor
*/

let posibleClick = false;

// ------------------------------------------- crear array de preguntas
function reiniciar() {

    
    let opciones = document.getElementById("categorySelect").selectedOptions
    if (opciones.length < 1) {
        return; //gestionar aviso de que no se ha seleccionado ninguna
    }
    
    if (0 < archivosParaUsar.length) {
        if (!window.confirm("Se reiniciara la partida. ¿Desea continuar?")) {
            return;
        }
    }
    document.getElementById("respuestas").innerHTML = ""

    
    //generar nuevo array
    let contador = 0;
    archivosParaUsar = [];
    archivosYaUsados = [];

    if (opciones[0].value.indexOf('all') != -1) {
        for (let j = 0; j < archivos.length; j++) {
            archivosParaUsar[j] = archivos[j][0];
        }

    }else{
        for (let i = 0; i < archivos.length; i++) {
            for (let j = 0; j < opciones.length; j++) {
                if (archivos[i][1].indexOf(opciones[j].value) != -1) {
                    archivosParaUsar[contador] = archivos[i][0];
                    contador++;
                    break;
                }
            }
        }
    }
    
    shuffle(archivosParaUsar);
    cargarPregunta();
}









// ------------------------------------------- mostrar preguntas por pantalla
function ponerPregunta() {
    document.getElementById("pregunta").innerHTML = pregunta[0]
    document.getElementById("opcionA").innerHTML = pregunta[1]
    document.getElementById("opcionB").innerHTML = pregunta[2]
    document.getElementById("opcionC").innerHTML = pregunta[3]
    document.getElementById("opcionD").innerHTML = pregunta[4]
    document.getElementById("autor").innerHTML = "Pregunta hecha por: "+pregunta[6]
}
function cargarPregunta() {
    
    let pos = generarNumero()

    if (pos < 0) {
        //si no quedan preguntas en la categoria
        pregunta = [
            "No quedan mas preguntas XC",
            "Diseñado y programado por Daniel Vals Simon (videosboy)",
            "Muchas gracias a Alex Mayo por ayudarme con el CSS, mi maravilloso novio",
            "...",
            "ʸ ᵘⁿ ᵖᵒᶜᵒ ᵃ ᶜʰᵃᵗᴳᴾᵀ ʸ ᵃ ᵗᵘᵗᵒʳᶦᵃˡᵉˢ ᵈᵉ ʸᵗ ᵖᵃʳᵃ ᵉˡ ʲˢ",
            "3",
            "Gracias por jugar"
        ]
        ponerPregunta()

        
    }else{
        //si da una pregunta valida
        fetch(folderPath+archivosParaUsar[pos])
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener el archivo');
            }
            return response.text(); 
        })
        .then(data => {
            //si el archivo carga
            
            //guardar pregunta
            pregunta = data.split('\n');

            //añadir la pregunta a preguntas usadas
            archivosYaUsados[archivosYaUsados.length] = archivosParaUsar[pos]

            //mostrar opciones tras cargar pregunta y activar el click
            ponerPregunta()
            posibleClick = true
        })
        .catch(error => {
            console.error("Error al cargar el archivo: "+archivosParaUsar[pos]+" de posicion: "+pos, error);
        });
    }
}
function generarNumero() {

    console.log(archivosParaUsar.length )
    console.log(archivosYaUsados.length )
    //si ya no quedan preguntas, devolver -1
    if (archivosParaUsar.length == archivosYaUsados.length) {
        return -1;
    }

    for (let i = 0; i < archivosParaUsar.length; i++) {
        if (archivosYaUsados.includes(archivosParaUsar[i]) == false) {
            return i;
        }
    }

}











// ------------------------------------------- RESPONDER
async function clickRespuesta(num) {
    if (posibleClick == true) {
        posibleClick = false
        if (parseInt(pregunta[5]) == parseInt(num)) {

            //acertar
            reproducirAudioAcierto()

            document.documentElement.style.setProperty('--TiempoTransicionBotones', '0s');
            colorVerde()
            await sleep(1)
            document.documentElement.style.setProperty('--TiempoTransicionBotones', '1s');
            colorDefault()
            
            ponerIcono("1")
        }else{
            
            //fallar
            reproducirAudioFallo()

            document.documentElement.style.setProperty('--TiempoTransicionBotones', '0s');
            colorRojo(num)        
            colorVerde()
            await sleep(1)
            document.documentElement.style.setProperty('--TiempoTransicionBotones', '1s');
            colorDefault()

            ponerIcono("2")
        }
        await sleep(pausa)
        cargarPregunta()
    }
}
async function clickSkip() {
    if (posibleClick == true) {
        posibleClick = false
        document.documentElement.style.setProperty('--TiempoTransicionBotones', '0s');
        colorVerde()
        
        await sleep(1)
        
        document.documentElement.style.setProperty('--TiempoTransicionBotones', '1s');
        colorDefault()
        
        ponerIcono("0")
        await sleep(pausa)
        cargarPregunta()
    }
}
function colorRojo(num) {
    switch (num) {
        case "1":document.getElementById("opcionA").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--BGred');break;
        case "2":document.getElementById("opcionB").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--BGred');break;
        case "3":document.getElementById("opcionC").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--BGred');break;
        case "4":document.getElementById("opcionD").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--BGred');break;
    }
}
function colorVerde() {
    switch (parseInt(pregunta[5])) {
        case 1:document.getElementById("opcionA").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--BGgreen');break;
        case 2:document.getElementById("opcionB").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--BGgreen');break;
        case 3:document.getElementById("opcionC").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--BGgreen');break;
        case 4:document.getElementById("opcionD").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--BGgreen');break;
    }
}
function colorDefault() {
    document.getElementById("opcionA").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--BG3')
    document.getElementById("opcionB").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--BG3')
    document.getElementById("opcionC").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--BG3')
    document.getElementById("opcionD").style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--BG3')
}

function ponerIcono(tipo) {
    //0 skip
    //1 acierto
    //2 fallo

    //crear imagen
    let img = document.createElement("img")
    switch (tipo) {
        case "0":
            img.src = '/Global/icono skip.png';
            img.alt = 's';
        break;
        case "1":
            img.src = '/Global/icono acierto.png';
            img.alt = 'a';
        break;
        default:
            img.src = '/Global/icono fallo.png';
            img.alt = 'f';
        break;
    }

    //crear subdiv .icono
    let subDiv = document.createElement("div")
    subDiv.classList.add("icono")
    subDiv.appendChild(img)

    
    document.getElementById("respuestas").appendChild(subDiv);
}


function reproducirAudioAcierto() {
    if (document.getElementById('audio').checked == true) {
        let audioPlayer = document.getElementById('audioAcierto');
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    }
}
function reproducirAudioFallo() {
    if (document.getElementById('audio').checked == true) {
        let audioPlayer = document.getElementById('audioFallo');
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    }
}