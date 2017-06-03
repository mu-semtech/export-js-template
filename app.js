import { app } from 'mu';
import request from 'request';

import queries from '/config/export';

queries.map(function(config) {
  app.get(config.path, function(req, res, next) {
    let query = '';
    try {
      // replace placeholders in query with query params if it's a template
      query = typeof(config.query) === 'string' ? config.query : config.query(req.query);
    } catch (err) {
      err.status = 400;
      return next(err);
    }

    const options = {
      method: 'POST',
      url: process.env.MU_SPARQL_ENDPOINT,
      encoding: 'utf8',
      headers: {
        'Accept': config.format
      },
      qs: {
        format: config.format,
        query: query
      }
    };

    request(options, function(error, response, body) {
      if (error) {
        console.error(`Something went wrong executing the SPARQL query: ${JSON.stringify(error)}`);
        return next(error);
      } else if (response.statusCode == 200) {
        const filename = req.query.file || config.file;
        if (filename) { res.attachment(filename); }
        res.send(body);
      } else {
        return next(new Error(body));
      }
    });
  } );    
});
