import axios from 'axios'

const instance = axios.create({
  baseURL: ' https://checkdc-movies.herokuapp.com/movie/' 

})

instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance