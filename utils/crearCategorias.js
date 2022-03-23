const articulos = require("../articulos/crudo-articulos.json");
const imagenes = require("../articulos/img/img-art.json");
const fs = require('fs');
let categorias = {};

function actuImg(articulos, imagenes, root){
  articulos.map( a => {
    for(let img of imagenes){
     if(a.codigo == img.codigo){
       a.imagendetalle = img.imagen;
       console.log("imagen agregada: " + a.codigo);
     } 
    }  
    let categ = a.categorias;
      if(Array.isArray(categorias[categ])){
        categorias[categ].push(a);
      }else{
        categorias[categ] = [];
        categorias[categ].push(a); 
      }
    })
    if(root){
      fs.writeFileSync("./articulos/Articulos-Web.json", JSON.stringify(categorias, null, 2));
      console.log("OPERACION FINALIZADA EN ROOT");
    }else{
      fs.writeFileSync("./articulos/Articulos-Web.json", JSON.stringify(categorias, null, 2));
      console.log("OPERACION FINALIZADA");
    }
    
}
//actuImg(articulos, imagenes)
module.exports = actuImg;

