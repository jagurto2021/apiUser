//con esto importamos mongosse
const mongoose = require('mongoose')

//definir nuestro modelo de usuario
const Users=mongoose.model('User',{
    //required, para que sea requerido
    name: {type: String, required: true, minLength :3},
    lastname: {type: String, required: true, minLength :3},
})

//exportamos para que puedan ser utilizamos en nuestros endPoints
module.exports = Users