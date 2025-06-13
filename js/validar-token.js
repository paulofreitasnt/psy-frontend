function isTokenValid(token) {
    if (!token) return false;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && (Date.now() / 1000) > payload.exp) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}

const token = localStorage.getItem('token');
if (!isTokenValid(token)) {
    window.location.href = '../index.html';
}
