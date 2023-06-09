//gestionara nuestros usuarios
// /. es para modulos que nosotrso creamos
const Users = require ('./User')
const User = {
    //este es para solo un elemento
    get: async(req,res)=>{
        const { id } = req.params
        const user = await Users.findOne({_id: id })
        res.status(200).send(user)
        //vamos a buscar por id 647d7b5bff7f1b8a5a93182c en postman
    },
    //listara nuestros usuarios
    list: async(req,res) =>{
        const users= await Users.find()
        res.status(200).send(users)
    },
    //crear chanchitos
    create: async(req,res)=>{
        //console.log(req.body)
        const user = new Users(req.body)
        const savedUser = await user.save()
        //devuelve el id del recurso recien creado, el user JohanAgurto
        //su id es 647d7b5bff7f1b8a5a93182c
        res.status(201).send(savedUser._id)
    },
    update:async(req,res)=>{
        const { id } = req.params
        const user = await Users.findOne({_id: id })
        Object.assign(user, req.body)
        await user.save()
        res.sendStatus(204) 
    },
    delete:async(req,res)=>{
        const { id } = req.params
        const user = await Users.findOne({_id: id })
        if(user){
            user.deleteOne()
        }
        res.sendStatus(204)
    }
}

//para exportar nuestro modulo
//vamos a recibir este objeto usuario con todo lo descrito arriba
module.exports = User