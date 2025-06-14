let botaoSair = document.getElementById('btn-logout');

botaoSair.addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
});