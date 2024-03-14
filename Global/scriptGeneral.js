/* 
=========================================== COOKIES ===========================================
*/
function setCookie(cname,cvalue,exdays) { //crear y establecer cookies
    const d = new Date();
    d.setTime(d.getTime() + (exdays*365*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) { //leer cookies
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkEmptyText(valorComprobar,valorDefault) {
    if (valorComprobar == "" || valorComprobar == null) {
        return valorDefault;
    }
    return valorComprobar
}
/*
=========================================== SLEEP ===========================================
*/
var sleep = function(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
/*
=========================================== HELPERS ===========================================
*/
function flipSvg(svg, giro) {
    let flipp = document.getElementById(svg);
    flipp.setAttribute("transform", "rotate(" + giro + ")");
}
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
/*
=========================================== START ===========================================
*/
function cargarCookiesSettings(){
    if(getCookie('darkMode')=='true'){document.getElementById('darkMode').checked = true}
    else{document.getElementById('darkMode').checked = false}
    if(getCookie('audioActivo')=='false'){document.getElementById('audio').checked = false}
    else{document.getElementById('audio').checked = true}
    refreshDarkMode()
}
/*
=========================================== SETTINGS ===========================================
*/
function bajarDivSettings() {
    If= document.documentElement.style.getPropertyValue('--alturaSettings')
    if(If != '0px'||If==''){
        document.documentElement.style.setProperty('--alturaSettings', '0px');
        flipSvg('settingSvg',180);
    }else{
        document.documentElement.style.setProperty('--alturaSettings', '-145px');
        flipSvg('settingSvg',0);
    }
}
function clickDarkMode(){
    setCookie('darkMode', document.getElementById('darkMode').checked, 9999)
    refreshDarkMode()
}
function refreshDarkMode(){
    if(getCookie('darkMode')=='true'){
        document.documentElement.style.setProperty('--TXT', 'var(--LightMode-TXT)');
        document.documentElement.style.setProperty('--DESC', 'var(--LightMode-DESC)');
        document.documentElement.style.setProperty('--BG1', 'var(--LightMode-BG1)');
        document.documentElement.style.setProperty('--BG2', 'var(--LightMode-BG2)');
        document.documentElement.style.setProperty('--BG3', 'var(--LightMode-BG3)');
        document.documentElement.style.setProperty('--BG4', 'var(--LightMode-BG4)');
        document.documentElement.style.setProperty('--BGgreen', 'var(--LightMode-BGgreen)');
        document.documentElement.style.setProperty('--BGred', 'var(--LightMode-BGred)');
        document.body.style.backgroundImage = "url('/Global/fondo gameboy claro.png')"
        document.getElementById('darkModeIcon').src = '/Global/pixel luna.png'
    }else{
        document.documentElement.style.setProperty('--TXT', 'var(--DarkMode-TXT)');
        document.documentElement.style.setProperty('--DESC', 'var(--DarkMode-DESC)');
        document.documentElement.style.setProperty('--BG1', 'var(--DarkMode-BG1)');
        document.documentElement.style.setProperty('--BG2', 'var(--DarkMode-BG2)');
        document.documentElement.style.setProperty('--BG3', 'var(--DarkMode-BG3)');
        document.documentElement.style.setProperty('--BG4', 'var(--DarkMode-BG4)');
        document.documentElement.style.setProperty('--BGgreen', 'var(--DarkMode-BGgreen)');
        document.documentElement.style.setProperty('--BGred', 'var(--DarkMode-BGred)');
        document.body.style.backgroundImage = "url('/Global/fondo gameboy oscuro.png')"
        document.getElementById('darkModeIcon').src = '/Global/pixel sol.png'
    }
}
function guardarCookieSonido() {
    setCookie('audioActivo', document.getElementById('audio').checked, 9999)
}