import axios from "axios";
import {environment} from "@/environments/environment";

class EmployerPostService{
    getAll() {
        return axios.get(environment.baseUrl+"/post");
    }

    getByid(id) {
        return axios.get(environment.baseUrl+"/post/" + id);
    }

    create(body) {
        return axios.post(environment.baseUrl+"/post", body);
    }

    update(id, body) {
        return axios.put(environment.baseUrl+"/post/" + id, body);
    }
}

export default EmployerPostService;