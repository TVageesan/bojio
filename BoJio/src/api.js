import axios from 'axios'


const url = "http://127.0.0.1:3000"

const  getEvents = (id) => {
  return axios.get(url + '/event/' + id)
}

export default getEvents
