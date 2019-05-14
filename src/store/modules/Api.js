import request from '@/utils/request'

const Api = {
  state: {
    dict: []
  },
  //   actions: {
  //     SET_BASE_URI (state, base_uri) {
  //       state.base_uri = base_uri
  //     }
  //   },
  actions: {
    FECTHDICT ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          method: 'get',
          url: '/NBLot/testApi/Directory/',
          params: params
        })
          .then(res => {
            resolve(res.response.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    FECTHAPIACTIONS ({ commit }, params) {
      return new Promise((resolve, reject) => {
        request({
          method: 'get',
          url: '/NBLot/testApi/Directory/actions',
          params: params
        })
          .then(res => {
            if (params.action) {
              for (const method of res.data.methods) {
                if (method.name === params.action) {
                  resolve(method)
                  break
                }
              }
            } else {
              resolve(res.data)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default Api
