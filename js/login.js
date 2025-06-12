let loginButton = document.getElementById('btn-login');
let registerButton = document.getElementById('btn-register');

loginButton.addEventListener('click', function() {
    let password = document.getElementById('input-password');
    let email = document.getElementById('input-email');

    if(validarCampos(email, password) === false){
        return;
    }

    if (validarEmail(email.value) === false) {
        alert('Por favor, insira um email válido.');
        return;
    }

    let body = {
        email: email.value,
        password: password.value
    }
    fetch('http://localhost:8080/auth/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(
        result =>{
            if (result.status === 200) {
                result.json().then(data => {
                    localStorage.setItem('token', data.token);
                    alert('Bem vindo!');
                    window.location.href = 'pages/home.html';
                });
            } else {
                alert('Verifique suas credenciais e tente novamente.');
            }
        }
    ).catch(err =>{
        alert('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.');
        console.error('Erro ao fazer login:', err);
    });
});

function validarCampos(email, password){
    validarCampos = (email, password) => {
        if (email.value === '' || password.value === '') {
            alert('Preencha todos os campos!');
            return false;
        }
        return true;
    }
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

registerButton.addEventListener('click', function() {
    window.location.href = 'pages/register.html';
});