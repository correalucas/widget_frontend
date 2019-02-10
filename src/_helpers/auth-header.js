
export function authHeader() {
    let auth = JSON.parse(localStorage.getItem('auth'));

    if (auth && auth.access_token) {
        return auth.token_type + ' ' + auth.access_token ;
    } else {
        return {};
    }
}