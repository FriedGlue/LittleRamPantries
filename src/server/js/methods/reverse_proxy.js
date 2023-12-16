const http = require('http');
const { once } = require('events');
const { EventEmitter } = require('stream');

const reverse_proxy_Endpoint = function(server_config, entry_url, target_url) {

    return {
        url: entry_url,
        method_type: 'GET',
        pass: async(pathname, request) => {

            const buffers = [];
            const emitter = new EventEmitter;

            http.get(target_url, (response) => {
                response.on('data', chunk => { buffers.push(chunk); });
                response.on('end', () => { emitter.emit('done', response.statusCode, response.headers); })
            });

            const [ server_response_code, server_response_headers ] = await once(emitter, 'done');
            const server_response_body = Buffer.concat(buffers);

            return {
                success: true,
                server_response_code,
                server_response_body,
                server_response_headers
            };
        }
    };
};

module.exports = reverse_proxy_Endpoint;