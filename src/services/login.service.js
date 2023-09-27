import axios from "axios";
import {environment} from "@/environments/environment";

class LoginService {
    baseUrl= "http://localhost:3000"
    getAll() {
        return axios.get(environment.baseUrl+"/users");
    }

    getByid(id) {
        return axios.get(environment.baseUrl+"/users" + id);
    }

    create(body) {
        return axios.post(environment.baseUrl+"/users", body);
    }

    update(id, body) {
        return axios.put(environment.baseUrl+"/users" + id, body);
    }
}

export default LoginService;