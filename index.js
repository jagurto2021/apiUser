//con funcion require importamos la libreria mongoose
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://jagurto2014:Dohxfcvq3zPk79Bg@cluster0.dg8dbjy.mongodb.net/miapp?retryWrites=true&w=majority')

//diseñar nuestros modelos de BD
const User = mongoose.model('User',{
    username : String,
    edad: Number,
})

//este es un script que permite crear usuarios
/*user1 chanchito feliz
  user2 chanhito triste*/ 
const crear = async () => {
    const user = new User({username: 'chanchito triste', edad :25})
    const savedUser = await user.save()
    console.log(savedUser)
}
//ejecutamos la funcion crear()
crear()

/*funcion asincrona para buscar todos los usuarios */
const buscarTodo = async ()=>{
    const users = await User.find()
    console.log(users)
}

//buscarTodo()

/*funcion para buscar por usuario pasandole el nombre del usuario*/

const buscar = async () =>{
    /*buscamos un usuario en especifico, pasamos como parametro el
    nombre del usuario*/
    const users = await User.find({username: 'chanchito feliz'})
    console.log(users)
}

//buscar()
//arroja una arreglo [] con el usuario; busca todos los elementos
//que cumplan con esa condicion

/*
    find devuelve un arreglo con todos los que cumplan la condicion
    findOne devuelve un objeto si encuentra, sino devuelve NULL*/

/*en esta funcion buscarUno usaremos findOne, para tener como salida
solo un usuario  */

const buscarUno = async () =>{
    const user = await User.find({username: 'chanchito feliz'})
    console.log(user)
}

//buscarUno()
/*Funcion de actualizar un recurso en nuestra bd */

const actualizar = async() => {
    const user = await User.findOne({username: 'chanchito feliz'})
    //imprimira al user con su antigua edad
    console.log(user)
    //actualizamos su edad
    user.edad = 30
    await user.save()
}

//actualizar()

/*eliminar un recurso con funcion eliminar, primero la buscamos
con findOne (deacuerdo a la condicion),
luego await con el metodo remove para eliminar el recurso de la bd
siempre y cuando el recurso exista, para esto tenemos que validar
que el registro exista en nuestra funcion*/

const eliminar = async() => {
    const user = await User.findOne({username : 'chanchito triste'})
    console.log(user)
    //metodo remove o deleteOne para eliminar el recurso
    //una condicion para valiadar que el usuario exista
    if(user){
        await user.deleteOne()
    }
}

//eliminar()