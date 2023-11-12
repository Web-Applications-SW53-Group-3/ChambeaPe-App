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
        return await axios.post('https://chambeape.azurewebsites.net'+"/account/login", body);
    }

    async logout() {
        return await axios.get('https://chambeape.azurewebsites.net'+"/account/logout");
    }
}

export default LoginService;