 import apiClient from '@/services/AxiosClient.js'
 
 export default {
 /*     getPersons(perPage, page) {
         return apiClient.get('/datas?_limit=' + perPage + '&_page=' + page)
     }, */
     //Added new call
     getPersonInAdmin() {
         return apiClient.get('/admin')
     },
     saveVaccine (vaccine) {
         return apiClient.post('/admin/{id}', vaccine)
     }
 }
 