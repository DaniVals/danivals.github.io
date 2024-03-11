async function loadMain(){
    //paso 1 hacer cosas que no quieras con transicion
    if(getCookie('darkMode')=='true'){document.getElementById('darkMode').checked = true}
    else{document.getElementById('darkMode').checked = false}
    refreshDarkMode()

    await sleep(1) //esperar 1ms
    
    //añadir transiciones a dichas cosas
    document.documentElement.style.setProperty('--CeroCincoSecs', '0.5s');

    cargarPregunta()

    console.log("trivia cargado")
}

const lector = new FileReader();
const folderPath = './Preguntas/';
const archivos = [
    "Personal femboy.txt",

    "BasesDeDatos no es SGBD.txt",

    "Historia descartes.txt",

    "Minecraft nombre vegeta.txt",
    "Minecraft crafteo espada.txt"
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
            "1"
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
            console.error("Error al cargar el archivo:", error);
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

function clickRespuesta(num) {
    if (parseInt(pregunta[5]) == parseInt(num)) {

        ponerIcono("1")
    }else{

        ponerIcono("2")
    }
    cargarPregunta()
}
function clickSkip() {
    ponerIcono("0")
    cargarPregunta()
}
function ponerIcono(tipo) {
    //0 skip
    //1 acierto
    //2 fallo

    //crear imagen
    let img = document.createElement("img")
    switch (tipo) {
        case "0":
            img.src = 'icono skip.png';
            img.alt = 's';
        break;
        case "1":
            img.src = 'icono acierto.png';
            img.alt = 'a';
        break;
        default:
            img.src = 'icono fallo.png';
            img.alt = 'f';
        break;
    }

    //crear subdiv .icono
    let subDiv = document.createElement("div")
    subDiv.classList.add("icono")
    subDiv.appendChild(img)

    
    document.getElementById("respuestas").appendChild(subDiv);
}