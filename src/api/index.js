import axios from 'axios'

const api = axios.create({
  baseURL: process.env === 'production' ? '/' : 'http://localhost:3000/'
})

export function fetchStatus () {
  return api.get('/api/status')
}

export function postAuth (formData) {
  return api.post('/auth', formData)
    .then((res) => {
      console.log(res)
      api.defaults.headers.common['Cookie'] = res.headers['set-cookie']
    })
}

export const fetchDir = (path) => {
  return new Promise((resolve, reject) => {
    api.get('/api/path', {
      params: { path: path },
      responseType: 'json'
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const fetchDirRecursive = (file) => {
  return new Promise((resolve, reject) => {
    api.get('/api/pathr', {
      params: { path: file.path },
      responseType: 'json'
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
