import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-bfd7a.firebaseio.com/'
})

export default instance;