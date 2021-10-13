import { reactive } from 'vue';

export default reactive({
    comment: {},
    person: null,
    flashMessage: '',
    currentUser: JSON.parse(localStorage.getItem('user'))
});