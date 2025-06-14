const botaoLogin = document.getElementById('btn-login');
const botaoCadastrar = document.getElementById('btn-register');
const container = document.querySelector('.container');

window.addEventListener('load',(evt)=>{
    fetch('http://localhost:8080/api/users/me',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response =>{
        if(response.ok){
            response.json().then(data=>{
                document.getElementById('input-name').value = data.name;
                document.getElementById('input-email').value = data.email;
                document.getElementById('input-email').disabled = true;
            });
        } else {
            throw new Error('Erro ao buscar usuário');
        }
    })
});

botaoLogin.addEventListener('click',()=>{
    window.location.href = 'home.html';
});

botaoCadastrar.addEventListener('click',()=>{
    const nome = document.getElementById('input-name').value;
    const email = document.getElementById('input-email').value;
    const senha = document.getElementById('input-password').value;
    const confirmSenha = document.getElementById('confirm-password').value;

    if(validarcampos(nome, email, senha, confirmSenha)){
        const usuario = {
            name: nome,
            password: senha
        }
        fetch('http://localhost:8080/api/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(usuario)
        }).then(response => {
            if(response.ok){
                alert('Usuário atualizado com sucesso! Faça login novamente.');
                localStorage.removeItem('token');
                window.location.href = '../index.html';
            }
        }).catch(error => {
            console.error('Erro:', error);
            alert('Erro ao atualizar usuário. Tente novamente.');
        });
    }
    
});

function validarcampos(nome, email, senha, confirmSenha){
    if(nome === '' || email === '' || senha === ''){
        alert('Preencha todos os campos!');
        return false;
    }

    if(email.indexOf('@') === -1 || email.indexOf('.') === -1){
        alert('Email inválido!');
        return false;
    }

    if(senha !== confirmSenha){
        alert('As senhas precisam ser iguais!');
        return false;
    }
    return true;
}

window.addEventListener('keydown',(event)=>{
    if (event.key === 'Enter') {
        botaoCadastrar.click();
    }
});