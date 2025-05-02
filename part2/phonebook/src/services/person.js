import axios from 'axios'

const baseURL = "http://localhost:3001/api/persons"

const get = () => {
    const promise = axios.get(baseURL)
    return promise.then(response => response.data)
}

const create = (newPerson) => {
    const promise = axios.post(`${baseURL}`, newPerson)
    return promise.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const update = (id, updatedPerson) => {
    const promise = axios.put(`${baseURL}/${id}`, updatedPerson)
    return promise.then(response => response.data)
}



export default {create, get, remove, update}