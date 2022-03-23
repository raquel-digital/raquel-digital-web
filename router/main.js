const express = require('express');
const router = express.Router();//iniciamos router
const mongoCrud = require("../api/mongo");
const middlewares = require("../utils/midleware");
const catchPass = require("../utils/catchPass")
let check = true;
let user = undefined;

router.get("/", async (req, res) => {
    const user = catchPass.passData();
    console.log(user)
    res.render("main", {checkNOT: check, user: user});
    check = true;
})

router.get("/admin", async (req, res) => {
    res.render("admin")
})
//cargar imagen
router.get("/recargar-productos", async (req, res) => {
    const recarga = require("../utils/crearCategorias");
    const articulos = require("../articulos/crudo-articulos.json");
    const imagenes = require("../articulos/img/img-art.json");
    recarga(articulos, imagenes, "root");
    res.render("main");
})
//usuario y registro
router.get("/registrarse", (req, res) => {
    res.render("registrarse");
})
router.post("/singup", middlewares.isLogin, (req, res) => {
    check = false;
    res.redirect('/');
})
//carrito
router.get("/carrito", (req, res) => {
    res.render("carrito");
})
//Respuestas de mercadopago TODO
router.get("/success", (req, res) => {
    res.send("success")
  })
router.get("/failure", (req, res) => {
    res.send("failure")
  })
router.get("/pending", (req, res) => {
    res.send("pending")
})
module.exports = router;