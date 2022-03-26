// inicializamos la conexion
const socket = io.connect();
var arrayDeArticulos = [];
var arrayDeCategorias = [];
var arrayTemp = []
var paginador = document.querySelector(".paginador");
var arrayGenerarMostrador = [];
var codigosArray = [];
var botonera = document.querySelector(".botonera");
var botonDeCompra = document.querySelector(".botonComprar");
let clientID = {}

socket.emit("nueva-sesion", () => {
  socket.on("sesion-ok", data => {
    clientID = {
      
    }
  })
})

socket.on("allData", data => {
    arrayDeArticulos = data;
    if(arrayDeArticulos.length==0){
      alert('no se cargaron los productos')
    }
})
socket.on("error en registro", errorRegistro => {
  alert(errorRegistro);
})
 
function borrarMostrador(){
    mostrador.innerHTML = "";
    botonera.innerHTML = "";
    paginador.innerHTML = ""

    arrayGenerarMostrador = [];
    arrayIndiceMap = [];   
    codigosArray = [];
}

function loadCategoria(...codigo){    
    arrayGenerarMostrador = [];
    codigosArray = Array.from(codigo)    
    for(let categ of codigosArray){         
      for(prod of arrayDeArticulos[categ]){
        arrayGenerarMostrador.push(prod);    
      }
        if(arrayGenerarMostrador.length >= 50){           
            crearPaginador();
            asignadorPaginador(1);              
        }
        else{
            generarMostrador(arrayGenerarMostrador);
            console.log(arrayGenerarMostrador.length)        
        }
    }    
        tags();
}

 
function generarMostrador(arrayDeCategoria){

    let mostrador = document.querySelector("#mostrador");    

    if(arrayDeCategoria == null){   
      mostrador.innerHTML = `<p>No se cargaron los productos intente nuevamente.</p>`;      
    }
    
    
    for(let p of arrayDeCategoria){

        dibujarTarjetaDeArticulos(p);

    }
}
//HACER BOTONES DE CATEGORIA
function tags(){
    let tt = "";
    for(let t of arrayGenerarMostrador){
        if(t.tags.includes(",")){
          tt = t.tags.split(",")
          console.log(tt)
        }        
        if(tt === t.tags){
            //console.log("rep")
        }        
        if(tt != t.tags && t.tags != "")
        {
            tt = t.tags
            botonera.innerHTML += `<button class="hashtag">${tt}</button>`              
        }
             
    }
}
function dibujarTarjetaDeArticulos(p){
        //console.log(p.imagendetalle);    
        
        mostrador.innerHTML += `
        <div class="col-4"><hr><div class="card border-success">
        <img src="${p.imagendetalle}">
        <div class="card-body">
        <h5 class="card-title">${p.nombre}</h5>
        <h6 class="card-subtitle text-muted mb-2">${p.nombre2}</h6><label class="col-4">Cantidad</label>
        <input id="${p.codigo}" size="1" value="1" class="col-2"><span>        
        <i class=" fas fa-plus-circle" aria-hidden="true"></i><i class=" fas fa-minus-circle" aria-hidden="true"></i>        
        </span>
        <a href="#${p.codigo+"colapse"}" data-toggle="collapse" class="float-left dropdown-toggle btn-outline-info btn-sm bg-light">Descripcion</a>
        <div class="collapse" id="${p.codigo}colapse">
        <hr><p>Cantidad de venta: x rollo de 10 mts</p>
        <p>${p.descripcion}</p><p>Codigo: ${p.codigo}</p>
        </div></div><div class="card-footer row">
        <p class="col-8 text-center">Precio: $ ${parseInt(p.precio)}</p>                
        <button class="botonComprar col-4 btn btn-primary">COMPRAR</button> 
        </div></div></div>
        `       
}

function crearPaginador(){    
    intPaginador = 50;   

    i = arrayGenerarMostrador.length / intPaginador;
    
    restoi = arrayGenerarMostrador.length % intPaginador;
        paginador.innerHTML =  `
        <div class="row">
        <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1">Previous</a>
        </li>
              
      <div class="numPag row"></div>
      
      <li class="page-item">
        <a class="page-link" href="#">Next</a>
      </li>
      </div>
        `
        j = 1;

        while(i > 0){
            paginadorNum = document.querySelector(".numPag")
            paginadorNum.innerHTML +=  `
            <li class="page-item"><a onclick="asignadorPaginador(${j})" class="page-link" href="#">${j}</a></li>
            `
            j++
            
            i--;
        }
}

arrayIndiceMap = [];

function asignadorPaginador(indice){
    mostrador.innerHTML = "";

    arrayIndiceMap = [];

    int50 = (indice * 50) - 50;
    indice50 = indice * 50;

   arrayIndiceMap = arrayGenerarMostrador.slice(int50, indice50);   
   generarMostrador(arrayIndiceMap);
   
}

//-----------BUSCADOR-----------------
const filtrar = ()=>{
  borrarMostrador();
  
  resultado.innerHTML = "";
  const string = formulario.value.toLowerCase();
  if(string == "") return;
  let arrSearch = Object.keys(arrayDeArticulos)
  for(let i of arrSearch){
    for(let p of arrayDeArticulos[i]){
        let nombre = p.nombre.toLowerCase();
        let codigo = p.codigo.toLowerCase();
      if(codigo.indexOf(string)  !== -1 || nombre.indexOf(string)  !== -1){
        console.log(p.codigo)
        dibujarTarjetaDeArticulos(p);
      }
    }
      //asignarBotones();        
  }


 if(resultado.innerHTML === ""){
  resultado.innerHTML = `
      <p>0 resultados</p>
      `
 }
}
//----------------BUSCADOR-----------
const formulario = document.querySelector("#buscador");
const boton = document.querySelector("#boton");
var resultado = document.querySelector("#mostrador");
formulario.addEventListener("keydown", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {                
     filtrar();            
  }
})
boton.addEventListener('click', filtrar);
//--------------BOTON DE COMPRA-----------------
mostrador.addEventListener('click', event=>{
  let mouse = event.target;
  if(mouse.classList.contains('botonComprar')){
    
    let titulo = mouse.parentElement.parentElement.childNodes[3].childNodes[1].textContent;     
    let precio = mouse.previousElementSibling.textContent;
    precio = precio.slice(10, );
    precio = parseFloat(precio);
    let codigo = mouse.parentElement.parentElement.childNodes[3].childNodes[11].childNodes[5].textContent;
    codigo = codigo.slice(8, );
    let cantidad = mouse.parentElement.parentElement.childNodes[3].childNodes[6].value;
    cantidad = parseInt(cantidad);          
    //acciones(codigo, titulo, precio, cantidad) 
    const articulo = {codigo: codigo, titulo: titulo, precio: precio, cantidad: cantidad}
    console.log(articulo)
    //carrito
    carrito(articulo);
    //emite compra TODO hacer login de usuario
    socket.emit("compra-art", articulo, clientID);    
  }  
  if(mouse.classList.contains('fa-plus-circle')){
    let cantidad = mouse.parentElement.previousElementSibling.value++;
  }  
  if(mouse.classList.contains('fa-minus-circle')){    
    let cantidad = mouse.parentElement.previousElementSibling.value;
    if(cantidad > 1){
      cantidad = mouse.parentElement.previousElementSibling.value--;
    }
  }           
})

function carrito(articulo){

}


 