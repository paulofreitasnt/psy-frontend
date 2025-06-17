let botaoCadastrar = document.getElementById('btn-register');
let botaoVoltar = document.getElementById('btn-login');

botaoVoltar.addEventListener('click', function (event) {
    window.location.href = 'home.html';
});

botaoCadastrar.addEventListener('click', function (event) {
    let nome = document.getElementById('input-name').value;
    let email = document.getElementById('input-email').value;
    let phone = document.getElementById('input-phone').value;
    if(validarCampos(nome, email, phone)){
        let paciente = {
            name: nome,
            email: email,
            phone: phone
        }
        fetch('http://localhost:8080/api/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(paciente)
        }).then(response => {
            if (response.ok) {
                alert('Paciente cadastrado com sucesso!');
                window.location.href = 'home.html';
            } else {
                response.json().then(data => {
                    alert('Erro ao cadastrar paciente: ' + data.message);
                });
            }
        }).catch(error => {
            console.error('Erro ao cadastrar paciente:', error);
            alert('Erro ao cadastrar paciente. Por favor, tente novamente mais tarde.');
        });
    }
});

document.getElementById('input-phone').addEventListener('input', function (event) {
    let value = event.target.value.replace(/\D/g, '');

        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else {
            value = value.replace(/^(\d*)/, '($1');
        }

        event.target.value = value;      
});


function validarCampos(nome, email, phone) {
    if (nome === '' || email === '' || phone === '') {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(nome)) {
        alert('O nome deve conter apenas letras e espaços.');
        return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Por favor, insira um email válido.');
        return false;
    }

    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(phone)) {
        alert('Por favor, insira um número de telefone válido no formato (XX) XXXXX-XXXX.');
        return false;
    }

    return true;
}