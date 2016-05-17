import {expect} from 'chai'
import Hapi from 'hapi'
import parallel from 'mocha.parallel'
import routes from '../src/routes'

/*
 * NOTE: you should use parallel here and not describe, otherwise the
 * injections will not work properly.
 *
 * See https://github.com/hapijs/hapi/issues/1299
 *
 */

const graph = process.env.MU_APPLICATION_GRAPH !== undefined
  ? process.env.MU_APPLICATION_GRAPH
  : 'http://mu.semte.ch/application'

parallel('mu-semtech-template', () => {
  const endpointUrl = 'http://mu.semte.ch/application'
  const request = (method, url, headers, content, callback) => {
    callback(null, {
      headers: {
        'content-type': 'application/json'
      },
      body: {method, url, headers, content},
      statusCode: 200
    })
  }
  const plugin = {
    register: require('hapi-sparql'),
    options: {
      request,
      endpointUrl
    }
  }

  it('constructs with example1', (done) => {
    const server = new Hapi.Server()
    server.connection({})
    server.register(plugin, (err) => {
      expect(err).to.be.not.ok
      server.route(routes)
      server.inject('/example1', (res) => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.result.method).to.be.equal('GET')
        expect(res.result.url).to.be.equal(endpointUrl + '?query=' +
          encodeURIComponent('CONSTRUCT {?s ?p ?o} WHERE {?s ?p ?o}'))
        done()
      })
    })
  })

  it('constructs with example2', (done) => {
    const server = new Hapi.Server()
    server.connection({})
    server.register(plugin, (err) => {
      expect(err).to.be.not.ok
      server.route(routes)
      server.inject('/example2', (res) => {
        expect(res.statusCode).to.be.equal(200)
        expect(res.result.method).to.be.equal('GET')
        expect(res.result.url).to.be.equal(endpointUrl + '?query=' +
          encodeURIComponent(`CONSTRUCT {?s ?p ?o} FROM <${graph}> WHERE {?s ?p ?o}`))
        done()
      })
    })
  })
})
