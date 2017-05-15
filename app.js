import { app } from 'mu';
import request from 'request';

import queries from '/config/export';

queries.map(function(config) {
    app.get(config.path, function(req, res, next) {
        const options = {
            method: 'POST',
            url: process.env.MU_SPARQL_ENDPOINT,
            encoding: 'utf8',
            headers: {
                'Accept': config.format
            },
            qs: {
                format: config.format,
                query: config.query
            }
        };
        
        request(options, function(error, response, body) {
            if (error) {
                console.error(`Something went wrong executing the SPARQL query: ${JSON.stringify(error)}`);
                next(error);
            } else if (response.statusCode == 200) {
                const filename = req.query.file || config.file;
                if (filename) { res.attachment(filename); }
                res.send(body);
            } else {
                next(new Error(body));
            }
        });
    } );    
});
