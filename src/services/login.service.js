import axios from "axios";

class LoginService {
    baseUrl= "http://localhost:3000"
    getAll() {
        return axios.get(this.baseUrl+"/users");
    }

    getByid(id) {
        return axios.get(this.baseUrl+"/users" + id);
    }

    create(body) {
        return axios.post(this.baseUrl+"/users", body);
    }

    update(id, body) {
        return axios.put(this.baseUrl+"/users" + id, body);
    }
}

export default LoginService;