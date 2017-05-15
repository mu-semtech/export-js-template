Export JS Template
==================

Microservice to export data using custom defined SPARQL queries.


## Using the template
Extend the `semtech/mu-export-js-template` and add an export configuration in `/config/queries.js`.

The configuration file defines an array of export configuration objects as follows:

```javascript
export default [
    {
        path: '/all',
        format: 'text/csv',
        file: 'export-100.csv',        
        query: `SELECT * FROM <http://mu.semte.ch/application> WHERE { ?s ?p ?o } LIMIT 100`
    },
    ...
];

```

An export configuration object consists of the following properties:
* [REQUIRED] `path`: endpoint on which the export will be exposed
* [REQUIRED] `format`: format of the export (`application/json`, `text/csv`, etc.)
* [OPTIONAL] `file`: name of the attachment file containing the export. If no filename is provided, the export will be displayed inline in the browser.
* [REQUIRED] `query`: the SPARQL query to execute. This may be a `SELECT` or a `CONSTRUCT` query.

## Example Dockerfile

```
FROM semtech/mu-export-js-template:1.0.0
MAINTAINER Erika Pauwels <erika.pauwels@gmail.com>
COPY queries.js /config
```
