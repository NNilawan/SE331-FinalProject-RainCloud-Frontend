import apiClient from '@/services/AxiosClient.js'

export default {
    getPersons(perPage, page) {
        return apiClient.get('/datas?_limit=' + perPage + '&_page=' + page)
    },
    //Added new call
    getPerson(id) {
        return apiClient.get('/datas/' + id)
    }
}