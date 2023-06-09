const express = require('express')
const mongoose = require('mongoose')
//con este const llamamos a nuestro controller
const user =require('./user.controller')
const app = express()
const port = 3000
//tomara todas la peticiones en json y las pasa a js
app.use(express.json())

mongoose.connect('mongodb+srv://jagurto2014:Dohxfcvq3zPk79Bg@cluster0.dg8dbjy.mongodb.net/miapp?retryWrites=true&w=majority')
//vamos a definir nuestro modelo de usuario nombre, apellido
//vamos a crear un nuevo archivo User.js




//(request,response) es una fact arrow function
//resquest es una peticion, trae
//response, enviar cosas al usuario

/*status
200 ok --exito y devolver datos al usuario:objetos arreglos string
201 ok -- creado
204 ok -- especifica que no devolvera nada, para endpointsput patch y delete
No content  
*/
//antes:
//vamos a modificar nuestros endpointers
/*app.get('/', (req,res) =>{
    res.status(200).send('Chanchito feliz')
})*/ 
//ahora
app.get('/users', user.list )
//crear un modulo customizado
//create es un post
app.post('/users',user.create)
app.get('/users/:id',user.get)
app.put('/users/:id',user.update)
app.patch('/users/:id',user.update)
app.delete('/users/:id',user.delete)

//buscar todos los archivos dentro de una carpeta
//pasar al metodo el nombre de la carpeta
app.use(express.static('app'))

//agregar al final, codigo para las rutas no definidas, solo para get
//se puede hacer lo mismo para post
app.get('/', (req,res) => {
    console.log(__dirname)
    res.sendFile(`${__dirname}/index.html`)
})
app.get('*',(req,res) =>{
    res.status(404).send('Esta pagina no existe')
})
app.post('*',(req,res) =>{
    res.status(404).send('Esta pagina no existe')
})

app.listen(port,() => {
    console.log('arrancandooo')
})