const http = require('http');
const url = require('url');

const server_config = require('../server_config.json');

const latest_contents_Endpoint = require('./methods/latest_contents');
const pantry_exterior_Endpoint = require('./methods/pantry_exterior');
const pantry_info_Endpoint     = require('./methods/pantry_info');
const contents_update_Endpoint = require('./methods/contents_update');

const reverse_proxy_Endpoint = require('./methods/reverse_proxy');

// List of allowed URLs; see the file each method is specified in for more details on each.
const methods = [

    latest_contents_Endpoint(server_config),
    pantry_exterior_Endpoint(server_config),
    pantry_info_Endpoint    (server_config),
    contents_update_Endpoint(server_config),

];

// Read from request <- contains url (and potentially body)
// Write to response <- status code, page content, image, what-have-you
const server = http.createServer(async(request, response) => {

    // Query = parameters from url, pathname = address after '/'
    // ex. http://ip:port/pathname?param=foo
    const parse = url.parse(request.url);
    const pathname = parse.pathname[0] == '/' ? parse.pathname.substring(1) : parse.pathname;

    // Allows CORS
    response.setHeader("Access-Control-Allow-Origin", "*");
    var result = {};

    // Valid request if and only if the incoming request matches one of the formats in 'methods[]'
    for(let i = 0; i < methods.length; i++) {

        const matches = (request.method === methods[i].method_type) &&
                        (('url_match' in methods[i] && methods[i]['url_match'](pathname, request)) ||
                         ('url'       in methods[i] && methods[i]['url'] == pathname));

        if(matches) {
            result = await methods[i].pass(pathname, request);
            if(result.success) break;
        }
    }

    // Finally, send response (dependent on valid formatting of request)
    if('success' in result && result.success) {
        if('server_response_headers' in result) response.setHeaders(new Headers(result.server_response_headers));
        if('server_response_code' in result) response.writeHead(result.server_response_code);
        if('server_response_body' in result && result.server_response_body != null) response.write(result.server_response_body);
    }
    else {
        response.writeHead(404);
    }
    response.end();
});

server.listen(server_config.port, server_config.host);
console.log('Listening on port ' + server_config.port + ' w/ host ' + server_config.host);

process.on('SIGINT', () => { process.exit(0); });
process.on('exit', () => {
    console.log('Closing server...');
    server.close();
})
