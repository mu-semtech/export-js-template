import constructEndpoints from './construct'

function register (server, options, next) {
  const routes = constructEndpoints.map((item) => {
    const {query, ...options} = item
    return {
      method: 'GET',
      handler: {
        'sparql': {
          type: 'construct',
          query
        }
      },
      ...options
    }
  })

  server.route(routes)

  next()
}

register.attributes = {
  name: 'export'
}

export default register
