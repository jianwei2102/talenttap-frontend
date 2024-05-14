import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/generalInterviewQuestions'

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const getSpecific = (id) =>{
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

export const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}