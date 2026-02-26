// integraç~çao sistema de login

const email = document.querySelector('.email')
const senha = document.querySelector('.senha')
const btnEntrar = document.querySelector('.entrar')
let mensagens = document.querySelector('.mensagens')

async function chamaLogin(){

    try {
        const url = 'http://localhost:5000/users/login'

        const body = {
            email: email.value,
            senha: senha.value
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(body)
        })

        const data = await response.json()
        console.log(data)

        if (data.erro == 'Usuário e senha obrigatórios.'){
            mensagens.innerHTML = 'Usuário e senha obrigatórios.'
            mensagens.style.display = 'flex' 
            mensagens.style.color = 'red' 
        } else if (data.erro == 'Credenciais inválidas.') {
            mensagens.innerHTML = 'Credenciais inválidas.'
            mensagens.style.display = 'flex' 
            mensagens.style.color = 'red' 
        } else if (data.mensagem) {
            mensagens.innerHTML = 'Login realizado com sucesso!'
            mensagens.style.display = 'flex'
            mensagens.style.color = 'green'  
        } 

    } catch (err) {
        console.log(err)
    }
}

btnEntrar.addEventListener('click', chamaLogin)

