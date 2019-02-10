
export function authHeader() {
    let auth = JSON.parse(localStorage.getItem('auth'));

    if (auth && auth.token) {
        return auth.token.token_type + ' ' + auth.token.access_token ;
    } else {
        return {};
    }
}