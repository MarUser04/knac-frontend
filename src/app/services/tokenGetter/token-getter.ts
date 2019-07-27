export class TokenGetter {
  static getTokenGetter() {
    return localStorage.getItem('token');
  }
}
