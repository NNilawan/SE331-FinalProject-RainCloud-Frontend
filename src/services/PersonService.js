import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getPersons(perPage, page) {
        return apiClient.get('/datas?_limit=' + perPage + '&_page=' + page)
    },
    //Added new call
    getPerson(id) {
        return apiClient.get('/datas/' + id)
    }
}