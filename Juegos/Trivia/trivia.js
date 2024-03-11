async function loadMain(){
    //paso 1 hacer cosas que no quieras con transicion
    if(getCookie('darkMode')=='true'){document.getElementById('darkMode').checked = true}
    else{document.getElementById('darkMode').checked = false}
    if(getCookie('audioActivo')=='false'){document.getElementById('audio').checked = false}
    else{document.getElementById('audio').checked = true}
    refreshDarkMode()

    await sleep(1) //esperar 1ms
    
    //añadir transiciones a dichas cosas
    document.documentElement.style.setProperty('--CeroCincoSecs', '0.5s');

    cargarPregunta()

    console.log("trivia cargado")
}

const pausa = 500;//ms
const folderPath = './Preguntas/';
const archivos = [    
    "BasesDeDatos no es SGBD.txt",
    
    // -------------------------------------------------------- CULTURILLA
    "C Historia descartes.txt",
    "C Historia que se invento antes.txt",

    "C Biologia hamsters domesticos.txt",
    
    "C Cocina ingredientes cosmopolitan.txt",

    "C Internet primer meme.txt",
    // -------------------------------------------------------- VIDEOJUEGOS
    //Undertale
    "V Undertale color amarillo.txt",
    
    //Isaac
    "V Isaac personajes muertos.txt",

    //FNAF
    "V FNAF duracion noche 1.txt",
    "V FNAF creador.txt",

    //Minecraft
    "V Minecraft crafteo espada.txt",
    "V Minecraft mob explota.txt",

    "V Minecraft dimensiones.txt",
    
    "V Minecraft nombre vegeta.txt"
];

let archivosYaUsados = [];
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

let posibleClick = true;

// ------------------------------------------- mostrar preguntas por pantalla
function ponerPregunta() {
    document.getElementById("pregunta").innerHTML = pregunta[0]
    document.getElementById("opcionA").innerHTML = pregunta[1]
    document.getElementById("opcionB").innerHTML = pregunta[2]
    document.getElementById("opcionC").innerHTML = pregunta[3]
    document.getElementById("opcionD").innerHTML = pregunta[4]
    document.getElementById("autor").innerHTML = pregunta[6]
}
function cargarPregunta() {
    
    let pos = generarNumero()

    if (pos < 0) {
        
        pregunta = [
            "No quedan mas preguntas XC",
            "A) correcta",
            "B) incorrecta",
            "C) incorrecta",
            "D) incorrecta",
            "1",
            "Gracias por jugar"
        ]
        ponerPregunta()
    }else{

        //si da una pregunta valida
        fetch(folderPath+archivos[pos])
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
            archivosYaUsados[archivosYaUsados.length] = archivos[pos]

            //mostrar opciones tras cargar pregunta
            ponerPregunta()
        })
        .catch(error => {
            console.error("Error al cargar el archivo: "+archivos[pos]+" de posicion: "+pos, error);
        });
    }


}
function generarNumero() {
    
    //posible setting para preguntas repetidas
    if (false) {
        return Math.floor(Math.random() * archivos.length)
    } else {
        
        //si ya no quedan preguntas, devolver -1
        if (archivos.length == archivosYaUsados.length) {
            return -1;
        }
    
        let num = Math.floor(Math.random() * archivos.length)
        while (archivosYaUsados.includes(archivos[num])) {
            num = Math.floor(Math.random() * archivos.length)
        }
    
        return num;
    }
}

// ------------------------------------------- mostrar preguntas por pantalla

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
        posibleClick = true
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
        posibleClick = true
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