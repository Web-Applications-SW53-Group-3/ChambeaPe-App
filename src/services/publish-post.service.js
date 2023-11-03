import axios from "axios";
import {environment} from "@/environments/environment";

class PublishPostService{
    baseUrl = environment.baseUrl + '/post/';

    getAllPublish() {
        return axios.get(this.baseUrl);
    }

    getPublishById(id) {
        return axios.get(this.baseUrl + id);
    }

    putPublishById(id, data) {
        return axios.put(this.baseUrl + id, data);
    }

    deletePublishById(id) {
        return axios.delete(this.baseUrl + id);
    }

    getPublishByEmployerId(id) {
        return axios.get(environment.baseUrl + '/employer/' + id + '/post');
    }

    postPublishByEmployerId(id, data) {
        return axios.post(environment.baseUrl + '/employer/' + id + '/post' , data);
    }
}

export default PublishPostService;