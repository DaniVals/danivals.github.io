async function loadMain(){
    //paso 1 hacer cosas que no quieras con transicion

    //cargar modo oscuro, sonido...
    cargarCookiesSettings()

    //dar la vuelta al svg de info
    flipSvg('infoSvg',-90);
    
    //poner records
    document.getElementById("RecordValsimonDice").innerHTML = (""
        + " R4: "+checkEmptyText(getCookie("record4"), 0)
        + " R6: "+checkEmptyText(getCookie("record6"), 0)
        + " R9: "+checkEmptyText(getCookie("record9"), 0));
    
    await sleep(1) //esperar 1ms
    

    //añadir transiciones a dichas cosas
    document.documentElement.style.setProperty('--CeroCincoSecs', '0.5s');
    console.log("index cargado")
}
function añadirEase(cambiado,tiempo){
    //atributo css-> transition: 0.5s ease;
    cambiado.style.transition = (tiempo+"s ease")
}





function expandirDiv(selected,svg) {

    let div = document.getElementById(selected);
    let divHeight = div.style.height;

    if(divHeight==0||divHeight=="0px"){

        div.style.height=div.scrollHeight +'px'
        if(svg != null){
            flipSvg(svg,0);
        }
    }else{
        
        div.style.height='0px'
        if(svg != null){
            flipSvg(svg,-90);
        }
    }
}
function flipSvg(svg, giro) {
    let flipp = document.getElementById(svg);
    flipp.setAttribute("transform", "rotate(" + giro + ")");
}





function copyText(copiar, indicar) {
    navigator.clipboard.writeText(copiar)
    .then(() => {
        console.log('Texto copiado al portapapeles: ' + copiar);
        cambiarTextoTemporal(indicar, 'Copiado!', 1000)
    })
    .catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
        cambiarTextoTemporal(indicar, 'Error copiando el texto', 1000)
    });
}
async function cambiarTextoTemporal(indicar, textoIndicado, tiempoms){

    let textoOG = document.getElementById(indicar).innerHTML;
    console.log(textoOG)
    document.getElementById(indicar).innerHTML = textoIndicado;
    await sleep(tiempoms)
    document.getElementById(indicar).innerHTML = textoOG;
}