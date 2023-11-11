import axios from "axios";
import {environment} from "@/environments/environment";


class LoginService {
    // getAll() {
    //     return axios.get(environment.baseUrl+"/users");
    // }

    // getByid(id) {
    //     return axios.get(environment.baseUrl+"/users" + id);
    // }

    // create(body) {
    //     return axios.post(environment.baseUrl+"/users", body);
    // }

    // update(id, body) {
    //     return axios.put(environment.baseUrl+"/users" + id, body);
    // }
    async login(body) {
        return await axios.post("https://localhost:7209/account/login", body);
    }
}

export default LoginService;