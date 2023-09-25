import axios from "axios";

class EmployerPostService{
    baseUrl= "https://65110b963ce5d181df5da5df.mockapi.io/api/chambeape"
    getAll() {
        return axios.get(this.baseUrl+"/post");
    }

    getByid(id) {
        return axios.get(this.baseUrl+"/post/" + id);
    }

    create(body) {
        return axios.post(this.baseUrl+"/post", body);
    }

    update(id, body) {
        return axios.put(this.baseUrl+"/post/" + id, body);
    }
}

export default EmployerPostService;