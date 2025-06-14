const botaoLogin = document.getElementById('btn-login');
const botaoCadastrar = document.getElementById('btn-register');
const container = document.querySelector('.container');

botaoLogin.addEventListener('click',()=>{
    window.location.href = '../index.html';
});

botaoCadastrar.addEventListener('click',()=>{
    const nome = document.getElementById('input-name').value;
    const email = document.getElementById('input-email').value;
    const senha = document.getElementById('input-password').value;
    const confirmSenha = document.getElementById('confirm-password').value;

    if(validarcampos(nome, email, senha, confirmSenha)){
        const usuario = {
            name: nome,
            email: email,
            password: senha
        }
        fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        }).then(response => {
            if(response.ok){
                alert('Usuário cadastrado com sucesso!');
                window.location.href = '../index.html';
            }

            if(response.status === 409){
                alert('E-mail já cadastrado, faça seu login');
            }
            
        }).catch(error => {
            console.error('Erro:', error);
            console.log('aqui');
            alert('Erro ao cadastrar usuário. Tente novamente.');
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