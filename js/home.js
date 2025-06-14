const botaoSair = document.getElementById('btn-logout');
const botaoAtualizar = document.getElementById('edit-profile-btn');

botaoAtualizar.addEventListener('click',()=>{
    window.location.href = 'update.html';
});

botaoSair.addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
});

