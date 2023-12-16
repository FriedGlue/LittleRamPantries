const { once } = require('events');
const { EventEmitter } = require('stream');

const receive_post_body = async function(request, max_size) {

    let buffers = [];
    let size = 0;
    const emitter = new EventEmitter;
    let done = false;

    emitter.on('done', () => { done = true });
    request.on('end', () => { emitter.emit('done'); });

    request.on('data', (chunk) => {
        if(!done) {
            if(size + chunk.length > max_size) {
                buffers.push(chunk.slice(0, max_size - size));
                size = max_size;
                console.log('Warning: overly large POST body truncated to max_size ' + max_size);
                emitter.emit('done');
            }
            else {
                buffers.push(chunk);
                size += chunk.length;
            }
        }
    });

    await once(emitter, 'done');

    const body = Buffer.concat(buffers);
    return body;
}

module.exports = receive_post_body;