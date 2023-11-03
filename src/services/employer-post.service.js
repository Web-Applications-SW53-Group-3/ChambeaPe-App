import axios from "axios";
import {environment} from "@/environments/environment";

class EmployerPostService{
    baseUrl = environment.baseUrl + '/employer/';

    async getAllEmployer() {
        return await axios.get(this.baseUrl);
    }

    async postEmployer(data) {
        return await axios.post(this.baseUrl, data);
    }

    async getEmployerById(id) {
        return await axios.get(this.baseUrl + id);
    }

    async putEmployerById(id, data) {
        return await axios.put(this.baseUrl + id, data);
    }

    async deleteEmployerById(id) {
        return await axios.delete(this.baseUrl + id);
    }
}

export default EmployerPostService;