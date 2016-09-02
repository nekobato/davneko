import axios from 'axios'

export const fetchPath = function(path) {
  return new Promise(function(resolve, reject) {
    axios.get('/api/path', {
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
