import axios from 'axios';
const fetchApiData = (queryOne, queryTwo = 10) => axios.get(`/api/photos?page=${queryOne}&perPage=${queryTwo}`);

export default fetchApiData;