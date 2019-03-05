import axios from 'axios'

export default class Index {
  loginPost (data) {
    return axios.post('/api/login', data)
  }
}


