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