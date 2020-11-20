import axios from 'axios'; 

const instance = axios.create({
    baseURL : 'https://react-burger-bf5ff.firebaseio.com/'
});

export default instance; 