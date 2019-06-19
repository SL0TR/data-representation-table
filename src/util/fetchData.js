import axios from 'axios';
const fetchApiData = query => axios.get(`/api/photos?page=${query}`);

export default fetchApiData;