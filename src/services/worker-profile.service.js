import axios from "axios";
import {environment} from "@/environments/environment";

class WorkerProfileService{
    baseUrl = environment.baseUrl + '/worker/';

    async getAllWorker() {
        return await axios.get(this.baseUrl);
    }
    
    async postWorker(data) {
        return await axios.post(this.baseUrl, data);
    }

    async getWorkerById(id) {
        return await axios.get(this.baseUrl + id);
    }

    async putWorkerById(id, data) {
        return await axios.put(this.baseUrl + id, data);
    }

    async deleteWorkerById(id) {
        return await axios.delete(this.baseUrl + id);
    }
}

export default WorkerProfileService;