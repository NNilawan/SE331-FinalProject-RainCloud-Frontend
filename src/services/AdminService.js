 import apiClient from '@/services/AxiosClient.js'
 
 export default {
     getPersonInAdmin() {
         return apiClient.get('/admin')
     },
     getUserDetails(id) {
        return apiClient.get('/admin/'+ id)
    },
    getRoleUser(id) {
        return apiClient.patch('/changes/'+ id)
    }
 }
 