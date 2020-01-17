import axios from 'axios';

const api = axios.create( {
    baseURL: 'http://192.168.1.213:3333'
});
// 'http://localhost:3333' if using the emulator
// 'http://192.168.1.213:3333' if using your cell phone locally (IP got from Expo)
// 'http://10.0.2.2:3333' if using Android emulator


export default api;