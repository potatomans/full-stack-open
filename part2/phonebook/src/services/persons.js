import axios from 'axios'
const baseurl = 'api/persons'

const getAll = () => {
    return axios.get(baseurl).then(response => response.data)
}

const create = (person) => {
    return axios.post(baseurl, person).then(response => response.data)
}

export default { getAll, create }