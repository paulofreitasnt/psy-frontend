const botaoSair = document.getElementById('btn-logout');
const botaoAtualizar = document.getElementById('edit-profile-btn');
const botaoAdicionarPaciente = document.getElementById('btn-add-paciente');

botaoAdicionarPaciente.addEventListener('click', () => {
    window.location.href = 'add-paciente.html';
});

botaoAtualizar.addEventListener('click',()=>{
    window.location.href = 'update.html';
});

botaoSair.addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
});

window.addEventListener('load', function() {
    fetch('http://localhost:8080/api/patients', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(response =>{
        if (response.status === 200) {
            response.json().then(data => {
                const pacientesList = document.getElementById('patients-list');
                pacientesList.innerHTML = '';

                if (data.length === 0) {
                    const noPatientsItem = document.createElement('li');
                    noPatientsItem.textContent = 'Nenhum paciente encontrado.';
                    pacientesList.appendChild(noPatientsItem);
                    return;
                }

                data.forEach(paciente => {
                    const pacienteItem = document.createElement('li');
                    pacienteItem.textContent = `${paciente.name} - ${paciente.email}`;
                    pacientesList.appendChild(pacienteItem);
                });
            });
        } else {
            throw new Error('Erro ao buscar pacientes: ' + response.statusText);
        }
    }).catch(error => {
        console.error('Erro ao buscar pacientes:', error);
        alert('Ocorreu um erro ao carregar os pacientes. Por favor, tente novamente mais tarde.');
    });
});