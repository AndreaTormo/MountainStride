function decodeToken(token) {
    try {
        var decoded = atob(token);
        var dotPos = decoded.indexOf('.');
        if (dotPos <= 0) return null;
        return { username: decoded.substring(0, dotPos) };
    } catch (e) {
        return null;
    }
}

function getLoggedUsername() {
    var token = localStorage.getItem('token');
    if (!token) return null;
    var decoded = decodeToken(token);
    return decoded ? decoded.username : null;
}

function isLoggedIn() {
    return !!localStorage.getItem('token');
}

function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = 'index.php?page=controller_auth&op=login-register_view';
    }
}
