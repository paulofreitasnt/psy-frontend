let botaoSair = document.getElementById('logout-button');

botaoSair.addEventListener('click', function() {
    // Limpa o token do localStorage
    localStorage.removeItem('token');
    
    // Redireciona para a página de login
    window.location.href = '../index.html';
});