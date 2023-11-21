import axios from "axios";
import { environment } from "@/environments/environment";

class EmployerService{
    
        async getAllEmployer() {
            return await axios.get(environment.baseUrl+"/employer");
        }
    
        async getEmployerById(id) {
            return await axios.get(environment.baseUrl+"/employer" + id);
        }
    
        async createEmployer(body) {
            return await axios.post(environment.baseUrl+"/employer", body);
        }
    
        async updateEmployer(id, body) {
            return await axios.put(environment.baseUrl+"/employer" + id, body);
        }
    
        async deleteEmployer(id) {
            return await axios.delete(environment.baseUrl+"/employer" + id);
        }

}
export default EmployerService;