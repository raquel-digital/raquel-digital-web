const mongoose = require('mongoose');

const schema = mongoose.Schema({
    nombre: {type: String},
    apellido: {type: String},
    usuario: {type: String}, 
    pass: {type: String},
    empresa: {type: String}
});

const clientes = mongoose.model("Clientes", schema);

module.exports = clientes;