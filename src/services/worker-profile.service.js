import axios from "axios";
import {environment} from "@/environments/environment";

class WorkerProfileService{
    baseUrl = environment.baseUrl + '/worker';

    async getAllWorker() {
        return await axios.get(this.baseUrl);
    }
    
    async postWorker(data) {
        try {
            const response = await axios.post(this.baseUrl, data);
            console.log('Solicitud POST exitosa:', response.data);
            return response.data;
          } catch (error) {
            if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.ProfilePic) {
              // Acceder al mensaje de error específico de ProfilePic
              const errorMessage = error.response.data.errors.ProfilePic[0];
              console.error('Error en la solicitud POST:', errorMessage);
              throw errorMessage; // Lanzar solo el mensaje de error específico de ProfilePic
            } else if (error.response && error.response.data && error.response.data.title) {
              // Si no hay error específico de ProfilePic, tomar el mensaje general
              const errorMessage = error.response.data.title;
              console.error('Error en la solicitud POST:', errorMessage);
              throw errorMessage;
            } else {
              console.error('Error al procesar la solicitud:', error.message);
              throw error.message;
            }
          }
          
      }
      

    async getWorkerById(id) {
        return await axios.get(this.baseUrl + '/' + id);
    }

    async putWorkerById(id, data) {
        return await axios.put(this.baseUrl+ '/' + id, data);
    }

    async deleteWorkerById(id) {
        return await axios.delete(this.baseUrl+ '/' + id);
    }
}

export default WorkerProfileService;