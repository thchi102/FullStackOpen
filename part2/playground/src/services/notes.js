import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
  const promise = axios.get(baseUrl)

  const nonExist = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }
  return promise.then(response => response.data.concat(nonExist))
  //return promise.then(p => p.data)
}

const create = newObject => {
    const promise = axios.post(baseUrl, newObject)
    return promise.then(p => p.data)
}

const update = (id, newObject) => {
    const promise = axios.put(`${baseUrl}/${id}`, newObject)
    return promise.then(p => p.data)
}

export default { 
  getAll, 
  create, 
  update 
}