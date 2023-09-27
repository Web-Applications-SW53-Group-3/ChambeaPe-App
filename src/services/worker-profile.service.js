import axios from "axios";
import {environment} from "@/environments/environment";

class WorkerProfileService{
    getAll(postId) {
        return axios.get(environment.baseUrl + '/post/' + postId + '/workers/');
    }

    getByid(workerId, postId) {
        return axios.get(environment.baseUrl + '/post/' + postId + '/workers/'+workerId);
    }

    create(worker, postId) {
        return axios.post(environment.baseUrl + '/post/' + postId + '/workers/', worker);
    }

    update(worker) {
        return axios.put(environment.baseUrl + '/post/' + worker.postId + '/workers/'+worker.id, worker);
    }

    delete(workerId, postId) {
        return axios.delete(environment.baseUrl + '/post/' + postId + '/workers/'+workerId);
    }
}

export default WorkerProfileService;