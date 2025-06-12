let loginButton = document.getElementById('btn-login');

loginButton.addEventListener('click', function() {
    let password = document.getElementById('input-password');
    let email = document.getElementById('input-email');
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