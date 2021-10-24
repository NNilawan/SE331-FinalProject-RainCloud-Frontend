import { reactive } from 'vue';

export default reactive({
    comment: {},
    person: null,
    flashMessage: '',
    vaccine: null,
    currentUser: JSON.parse(localStorage.getItem('user'))
});