const graph = process.env.MU_APPLICATION_GRAPH !== undefined
  ? process.env.MU_APPLICATION_GRAPH
  : 'http://mu.semte.ch/application'

export default [
  {
    path: '/example1',
    query: 'CONSTRUCT {?s ?p ?o} WHERE {?s ?p ?o}'
  },
  {
    path: '/example2',
    query: `CONSTRUCT {?s ?p ?o} FROM <${graph}> WHERE {?s ?p ?o}`
  }
]
