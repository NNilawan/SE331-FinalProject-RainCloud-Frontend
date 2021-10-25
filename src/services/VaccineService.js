import apiClient from '@/services/AxiosClient.js'
 
export default {
    getVaccine() {
        return apiClient.get('/vaccines')
    },

    saveVaccine(id,vaccine) {
        return apiClient.post('/admin/'+ id , vaccine)
    }
}
