const getters = {
  base_uri: state => state.gConfig.base_uri,

  sidebar: state => state.app.sidebar,
  device: state => state.app.device
}

export default getters
