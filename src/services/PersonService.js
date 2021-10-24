import apiClient from '@/services/AxiosClient.js'

export default {
    getPerson(id) {
        return apiClient.get('/datas/' + id)
    },
}