import { graph } from 'helpers/sparql'

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
