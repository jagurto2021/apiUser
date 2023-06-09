const loadInitialTemplate = () =>{
    const template = `
        <h1>Usuarios</h1>
        <form id="user-form">
            <div>
                <label>Nombre</label>
                <input name="name"/>
            </div>
            <div>
                <label>Apellido</label>
                <input name="lastname"/>
            </div>
            <button type="submit">Enviar</button>
        </form>

        <ul id="user-list"></ul>
    `
    //devuelve un listado
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template

}
//usaremos la lista ordenada ul, para mostrar los usuarios almacenados en la 
//bd
const getUsers = async () => {
    const response = await fetch('/users')
    const users = await response.json()
    //console.log(users)
    //plantilla para imprmir los usuarios
    const template = user => `
            <li>
                ${user.name} ${user.lastname} <button data-id="${user._id}">Eliminar</button>
            </li>
        `
    const userList = document.getElementById('user-list')
    userList.innerHTML = users.map(user => template(user)).join('')
    //para elminiar un usuario.
    users.forEach(user => {
        const userNode = document.querySelector(`[data-id="${user._id}"]`)
        userNode.onclick = async e => {
            await fetch(`/users/${user._id}`,{
                method: 'DELETE',
            })
            userNode.parentNode.remove()
            alert('Eliminado con exito')
        }
    });
}
const addFormListener = () => {
    const userForm = document.getElementById('user-form')
    userForm.onsubmit = async (e) => {
        e.preventDefault()
        //formData es un objeto con todos los atributos de userForm
        const formData = new FormData(userForm)
        //console.log(formData.get('name'))
        const data = Object.fromEntries(formData.entries()) 
        console.log(data)
        //anadiendo users a nuesta bd mongo
        await fetch('/users',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        userForm.reset()
        //buscar nuestros usuarios en la BD y mostrarlos en la interfaz
        getUsers()
        }   
}

window.onload = () => {
    loadInitialTemplate()
    addFormListener()
    getUsers()
}
