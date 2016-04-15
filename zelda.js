/*********************************************
* Objetos y variables globales
*********************************************/

var tablero, direccion;

var fondo = {
    x : 0,
    y : 0,
    imgURL : "img/background.png",
    imgOk : false,
    obstaculos : [
      {x1 : 200, y1 : 0,
       x2 : 250, y2 : 250},
      
      {x1 : 0, y1 : 200,
       x2 : 150, y2 : 250},
      
      {x1 : 150, y1 : 350,
       x2 : 500, y2 : 400}
    ]
};

var zelda = {
    x : -10,
    y : 0,

    velocidad : 10,
    
    frenteURL : "img/zelda-f.png",
    frenteOk : false,

    atrasURL : "img/zelda-a.png",
    atrasOk : false,
    
    derURL : "img/zelda-d.png",
    derOk : false,
    
    izqURL : "img/zelda-i.png",
    izqOk : false,
};

var liz = {
    x : 450,
    y : 450,
    lizURL : "img/liz.png",
    lizOK : false
};

var teclas = {
    left:  37,
    up:    38,
    rigth: 39,
    down:  40
};

/*********************************************
* Funcion init
*********************************************/

function init () {
  var canvas = document.getElementById("campo");
  tablero = canvas.getContext("2d");
  
  // Agregar la imagen del fondo
  fondo.imagen = new Image();
  fondo.imagen.src = fondo.imgURL;

  // Evento on load para cargar la imagen cuando ya este lista
  // cuando no se pasan los parentesis, la funcion no se llama
  // automaticamente cuando empiece la ejecucion
  fondo.imagen.onload = confirmarFondo;

  // Zelda de frente
  zelda.frente = new Image();
  zelda.frente.src = zelda.frenteURL;
  zelda.frente.onload = confirmarFrente;

  // Zelda atras
  zelda.atras = new Image();
  zelda.atras.src = zelda.atrasURL;
  zelda.atras.onload = confirmarAtras;

  // Zelda derecha
  zelda.derecha = new Image();
  zelda.derecha.src = zelda.derURL;
  zelda.derecha.onload = confirmarDer;

  // Zelda izquierda
  zelda.izquierda = new Image();
  zelda.izquierda.src = zelda.izqURL;
  zelda.izquierda.onload = confirmarIzq;

  // Liz - La enemiga
  liz.liz = new Image();
  liz.liz.src = liz.lizURL;
  liz.liz.onload = confirmarLiz;

  // Capturar evento del teclado
  document.addEventListener("keydown",teclado);

}

/*********************************************
* Funciones de confirmar la carga de las diferentes imagenes
*********************************************/
function confirmarFondo () {
  fondo.imgOk = true;
  dibujar();
}

function confirmarFrente () {
  zelda.frenteOk = true;
  dibujar();
}

function confirmarAtras () {
  zelda.atrasOk = true;
  dibujar();
}

function confirmarDer () {
  zelda.derOk = true;
  dibujar();
}

function confirmarIzq () {
  zelda.izqOk = true;
  dibujar();
}

function confirmarLiz () {
  liz.lizOK = true;
  dibujar();
}

/*********************************************
* Guardar la coleccion de todo y dibujar
*********************************************/

function dibujar () {
  // Capa 1: Fondo
  if(fondo.imgOk){
    tablero.drawImage(fondo.imagen,fondo.x,fondo.y);
  }
  // Capa 2: Zelda
  var zeldaDibujo = zelda.frente;
  if (zelda.frenteOk && zelda.atrasOk && zelda.izqOk && zelda.derOk) {
    if(direccion == teclas.up){
      zeldaDibujo = zelda.atras;
    }
    if(direccion == teclas.down){
      zeldaDibujo = zelda.frente;
    }
    if(direccion == teclas.left){
      zeldaDibujo = zelda.izquierda;
    }
    if(direccion == teclas.rigth){
      zeldaDibujo = zelda.derecha;
    }
    tablero.drawImage(zeldaDibujo, zelda.x, zelda.y);
  }
  // Capa 3: Liz
  if (liz.lizOK) {
    tablero.drawImage(liz.liz, liz.x, liz.y);
  }
}

function validarPosicion (x,y) {
  var val = true;
  // Validar que no se salga del tablero de juego
  if(x<-10 || x>=470 || y<0 || y>=460){
    val = false;
  } else {
    for (var i = 0; i < fondo.obstaculos.length; i++) {
      if(x+35>=fondo.obstaculos[i].x1 && x+20<=fondo.obstaculos[i].x2 && 
        y+40>=fondo.obstaculos[i].y1 && y+10<=fondo.obstaculos[i].y2){
        val = false;
      }
    }
  }
  return val;
}

/*********************************************
* Eventos animacion
*********************************************/

// Evento de tecla presionada
function teclado (datos) {
  var codigo = datos.keyCode;
  var x = zelda.x;
  var y = zelda.y;
  if(codigo == teclas.up){
    if(validarPosicion(x,y-zelda.velocidad)){
      zelda.y -= zelda.velocidad;
    }
  }
  if(codigo == teclas.rigth){
    if(validarPosicion(x+zelda.velocidad,y)){
      zelda.x += zelda.velocidad;
    }
  }
  if(codigo == teclas.down){
    if(validarPosicion(x,y+zelda.velocidad)){
      zelda.y += zelda.velocidad;
    }
  }
  if(codigo == teclas.left){
    if(validarPosicion(x-zelda.velocidad,y)){
      zelda.x -= zelda.velocidad;
    }
  }
  direccion = codigo;
  dibujar();
}