import axios from "axios";
import { environment } from "@/environments/environment";

class UserService{

    async getAll() {
        return await axios.get(environment.baseUrl+"/users");
    }

    async getByid(id) {
        return await axios.get(environment.baseUrl+"/users" + id);
    }

    async create(body) {
        return await axios.post(environment.baseUrl+"/users", body);
    }

    async update(id, body) {
        return await axios.put(environment.baseUrl+"/users" + id, body);
    }

    async delete(id) {
        return await axios.delete(environment.baseUrl+"/users" + id);
    }

}
export default UserService;