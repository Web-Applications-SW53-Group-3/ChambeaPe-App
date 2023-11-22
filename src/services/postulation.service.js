import axios from "axios";
import { environment } from "@/environments/environment";
import JwtService from "@/services/jwt.service.js";


class PostulationService {
    baseUrl = environment.baseUrl + '/postulation/';

    constructor() {
        const jwtService = new JwtService();
        const token = jwtService.getToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    async getPostsPostulations(id) {
        return  await axios.get(environment.baseUrl + '/posts/' + id + '/postulation');
    }

    async getWorkerPostulations(id) {
        return  await axios.get(environment.baseUrl + '/workers/' + id + '/postulation');
    }

    async deletePostulationById(id) {
        return  await axios.delete(this.baseUrl + id);
    }


    async postPostulation(data) {
        return  await axios.post(environment.baseUrl + '/postulation', data);
    }

}

export default PostulationService;