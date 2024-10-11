# ValsiJuegos
Un repositorio publico reservado a mis experimentos con paginas web (mayoritariamente juegos).

Al abrir te saldra una seccion con paginas abiertas al publico y otras que no, en verdad todas estan abiertas, solo que las cerradas seguramente esten sin acabar o no estan pensadas para usarse sino mas bien como pruebas.

Cada pagina y sus archivos (CSS, JS, subpaginas...) estaran en su propia carpeta menos CSS basicos y el JS de las cookies (para evitar codigo repetido), 
por lo que se consideran paginas y proyectos INDEPENDIENTES, unidos a traves de un [lobby](https://danivals.github.io/).

Si quieres usar estas paginas con cualquier proposito, puedes hacerlo, ya sea copiar codigo para aprender tu mismo, o para jugar a los diferentes minijuegos que voy creando, usar los diferentes experimentos (leyendo antes las precauciones), 
esto siempre y cuando no se intente la apoderacion de dichos recursos
(Basicamente que puedes ver y copiar lo que quieras mientras no digas que lo has hecho tu).

## [valsimon dice](https://danivals.github.io/Juegos/Valsimon_dice/)
Una version web de Simon Dice, se puede jugar de forma infinita usando un array que se genera de forma aleatoria.

Se permiten 3 dificultades y se comprueba en cual se esta para verificar el numero aleatorio.

Se guarda tu record usando cookies de tu navegador, individualmente para cada dificultad.

## [Bingo generator](https://danivals.github.io/Herramientas/Bingo/)
Un generador de Bingo que permite crear un tablero con filas y columnas a elejir, 
escribir en contenido de esas casillas a mano o colocarlas aleatoriamente y 
colorear las casillas con 6 colores por si se juega por equipos.

Tambien permite subir un archivo .txt para poder usar configuraciones consistentes entre varias personas (en la primera linea se pone el numero de filas, en la segunda las columnas y despues las opciones deseadas).

La opcion de dado coloca las casillas aleatoriamente en vez de en orden, y la de free space añade un hueco vacio en el medio SOLO si el tablero tiene una casilla intermedia clara (3x3, 5x5, 7x7, etc).

## [Trivia](https://danivals.github.io/Juegos/Trivia/)
Un trivia que utiliza archivos txt para almacenar las preguntas 

Usando arrays para las categorias y una etiqueta 'select' para seleccionarlas

Tambien hace de uso de sonidos .mp3 para indicar cuando aciertas y cuando no
