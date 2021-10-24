import apiClient from '@/services/AxiosClient.js'
 
export default {
    getVaccine() {
        return apiClient.get('/vaccines')
    },
}
