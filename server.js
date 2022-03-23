const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { mongo } = require('mongoose');
require('./api/mongo-conecction/mongoCompas');
const mongoCrud = require("./api/mongo");
//mercadopago
const mercadopago =  require("mercadopago")
mercadopago.configure({
    access_token: "APP_USR-4968513686371282-031419-25c7ceefdb018cef0d1b1f31da3032c3-99173741",
  });
  app.post("/checkout", (req, res) => {
    let preference = {
      items: [
        {
          title:req.body.titulo,
          unit_price: parseInt(req.body.precio),
          quantity: 1,
        }
      ],
      // ...
  "back_urls": {
    "success": "http://localhost:8080/success",
    "failure": "http://localhost:8080/failure",
    "pending": "http://localhost:8080/pending"
      },
      "auto_return": "approved",
// ...
    };
    mercadopago.preferences.create(preference)
    .then(function(response){
      console.log(response)
      res.redirect(response.body.init_point);
    }).catch(function(error){
      console.log(error);
    });
  });

//router
const router = require("./router/main");
const dotenv = require('dotenv');

//Iniciamos Web Socket
 const http = require('http').Server(app);
 const io = require('socket.io')(http);

//HandleBars
const handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
    extname: '.hbs',//extension
    defaultLayout: 'index.hbs',//pagina por defecto
    layoutsDir: __dirname + '/views/layouts',//dir layouts
    partialsDir: __dirname + '/views/partials/'//dir partials
}));

// seteo el motor de plantilla
app.set('view engine', 'hbs') ;
app.set('views', './views');
app.use(express.static(__dirname + '/public'));
dotenv.config();
//crear articulos
const crearCategorias = require("./utils/crearCategorias");
const console = require('console');
const req = require('express/lib/request');
const { connectableObservableDescriptor } = require('rxjs/internal/observable/ConnectableObservable');
// protejo el servidor ante cualquier excepcion no atrapada
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('ERROR EN APP');
});
io.on('connect', socket => {
    console.log("usuario conectado")
    socket.emit("allData", require("./articulos/Articulos-Web.json"));
    if(errorRegistro != undefined){
      socket.emit("error en registro", errorRegistro);
      errorRegistro = undefined;
    }    
    socket.on("imagen-subida", data =>{
        let imagen = data.split("/");
        code = imagen[4].split(".");
        let base = fs.readFileSync("./articulos/img/img-art.json");
        base = JSON.parse(base);
        base.push({codigo: code[0].toUpperCase() , imagen: data})
        let articulos = require("./articulos/crudo-articulos.json");
        const imagenes = require("./articulos/img/img-art.json");
        // if(articulos = undefined){
        //     const write = {}
        //     articulos = fs.writeFileSync("./articulos/crudo-articulos.json", JSON.stringify(write, null, 2));
        // }        
        fs.writeFileSync("./articulos/img/img-art.json", JSON.stringify(base, null, 2));
        crearCategorias(articulos, imagenes)
    })
    socket.on("test", () => {
        socket.emit("ok")
    })
});
app.use(router);

//Rutas POST
var errorRegistro = undefined;
  app.post("/nuevo-usuario", async (req, res) => {
    const usuario = req.body;
    let singup = await mongoCrud.create(usuario);
    if(singup != undefined){
      errorRegistro = singup;
      res.redirect("/registrarse");
    }else{
      res.redirect("/");
    }
})


//obtenemos el puerto desde el config.json
const PORT = process.env.PORT || 8080;
http.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});
// en caso de error, avisar
http.on('error', error => {
    console.log('error en el servidor:', error);
});

