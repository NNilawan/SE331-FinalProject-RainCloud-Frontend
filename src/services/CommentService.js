import apiClient from '@/services/AxiosClient.js'

export default {
    saveComment(comment, id) {
        return apiClient.post('/comments/' + id, {
            comment: comment.question
        })
    },
}