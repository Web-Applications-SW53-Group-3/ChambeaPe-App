import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

class JwtService {
  saveToken(token) {
    Cookies.set('jwt', token);
  }

  getToken() {
    return Cookies.get('jwt');
  }

  decodeToken() {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return jwtDecode(token);
  }

  getSub() {
    const decodedToken = this.decodeToken();
    if (!decodedToken) {
      return null;
    }
    return decodedToken.sub;
  }

  getRole() {
    const role = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    const decodedToken = this.decodeToken();
    if (!decodedToken) {
      return null;
    }
    return decodedToken[role];
  }

  logout() {
    Cookies.remove('jwt');
  }
}

export default JwtService;