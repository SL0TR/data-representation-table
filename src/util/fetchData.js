import axios from 'axios';
const fetchData = query => axios.get(`/api/photos?page=${query}`);

export default fetchData;