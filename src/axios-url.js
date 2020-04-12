import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/movie/' 
})

instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance