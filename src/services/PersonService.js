import apiClient from '@/services/AxiosClient.js'

export default {
    getPerson(id) {
        return apiClient.get('/datas/' + id)
    },
/*     uploadFile(file) {
        let formData = new FormData()
        formData.append('file', file)
        return apiClient.post('/uploadFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } */
}