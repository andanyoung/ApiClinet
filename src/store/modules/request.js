import request from '@/utils/request'

const requestStroe = {
  state: {},

  actions: {
    REQUEST ({ commit }, { url, method, params, data = {} }) {
      return new Promise((resolve, reject) => {
        request({
          method: method,
          url: url,
          params: params,
          data: data
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default requestStroe
