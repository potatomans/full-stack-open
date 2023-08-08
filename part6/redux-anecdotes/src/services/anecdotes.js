import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const obj = { content, votes: 0 } // there's no need to generate the Id since the backend JSON server generates the Id
    const response = await axios.post(baseUrl, obj)
    return response.data
}

const addVote = async (obj) => {
    const newObj = { ...obj, votes: obj.votes + 1 }
    const response = await axios.put(`${baseUrl}/${obj.id}`, newObj)
    return response.data
}

export default { getAll, createNew, addVote }
