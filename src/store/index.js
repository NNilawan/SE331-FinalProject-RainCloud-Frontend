import { reactive } from 'vue';

export default reactive({
    comment: {},
    person: null,
    flashMessage: '',
    vaccine: null,
    doctor: null,
    currentUser: JSON.parse(localStorage.getItem('user'))
});