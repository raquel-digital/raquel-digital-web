const { async } = require("rxjs");
const clientesModel = require("./mongo-models/clientes")
const mongo = {

    create: async function (data) {
        //console.log(data)
        const find = await clientesModel.find();
        let exist = false
        const check = find.forEach( e => {
            if(data.usuario == e.usuario){
                console.log("ya existe ese usuario")  
                return exist = true; 
            }
        });
        if(exist){
            return "el usuario ya figura ingresado, por favor intente nuevamente" 
        }else{
          clientesModel.create(data);
          return undefined;      
        }
    },
    checkLogin: async function (data) {
        const find = await clientesModel.find();
        let exist = false
        find.forEach( e => {
            if(data.usuario == e.usuario && data.contraseña == e.pass){
                exist = true;
            }
        })
        if(exist){
          return true; 
        }else{ 
          return false;
        }
    }
}

module.exports = mongo;