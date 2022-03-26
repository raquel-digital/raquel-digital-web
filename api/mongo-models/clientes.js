const mongoose = require('mongoose');

const schema = mongoose.Schema({
    nombre: {type: String},
    apellido: {type: String},
    usuario: {type: String}, 
    pass: {type: String},
    empresa: {type: String},
    carrito: [{pedidos: [{codigo: String, titulo: String, precio: Number, cantidad: Number}]}]
});

const clientes = mongoose.model("Clientes", schema);

module.exports = clientes;