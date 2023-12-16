/*
 * POST method: contents_update
 * URL: contents_update
 * ----------
 * Request: new timestamped image of pantry contents w/ identifying assymetric key signature
 * Response: 201 for success, 400 for failure
 * ----------
 * Last updated: 10/24/2023 */


// domain.com/contents_update?pantry_name=<Name>&date=<YYYY-MM-DD>&time=<HH:MM:SS TMZ> w/ attached PNG file as POST body
// ^ Note that URL formatting may be necessary, i.e. encoding non-alphanumeric character such as -, :, and whitespace

const fs = require('fs');
const url = require('url');
const receive_post_body = require('./util/receive_post_body');
const verify_signature = require('./util/verify_signature');

const contents_update_Endpoint = function(server_config) {

    const pantries_info_localpath = server_config.public + '/' + server_config.pantries_info_filename;

    return {
        url: 'contents_update',
        method_type: 'POST',
        content_type: 'application/octet-stream',
        pass: async(pathname, request) => {

            const query = url.parse(request.url, true).query;

            // 4 required args (as URL params)
            if('pantry_name' in query &&
               'signature'   in query &&
               'date'        in query &&
               'time'        in query) {

                // Load most up-to-date version of pantries_info.json and match request with a pantry defined in it:
                const pantries_info = JSON.parse(fs.readFileSync(pantries_info_localpath, 'utf8'));
                for(let i = 0; i < pantries_info.length; i++) {
                    if(query['pantry_name'] === pantries_info[i]['name']) {

                        const body = await receive_post_body(request, server_config['max_image_size_in_bytes']);

                        // Valid signature, i.e. trusted source
                        if(verify_signature(pantries_info[i]['public_key'], query['signature'], body)) {

                            // Archive previous image and replace with new one
                            const new_target_path =
                                server_config.public + '/' +
                                server_config.latest_contents_directory + '/' +
                                pantries_info[i]['latest_contents_url'];

                            const old_target_path =
                                server_config.archive + '/' +
                                server_config.latest_contents_directory + '/' +
                                pantries_info[i]['date_last_opened'] + ' ' +
                                pantries_info[i]['time_last_opened'] + ' ' +
                                pantries_info[i]['latest_contents_url'];

                            if(fs.existsSync(new_target_path)) fs.copyFileSync(new_target_path, old_target_path);
                            fs.writeFileSync(new_target_path, body);

                            // Update date and timestamp in JSON
                            // TODO: manage history + update Google Sheet w/ API
                            pantries_info[i]['date_last_opened'] = query['date'];
                            pantries_info[i]['time_last_opened'] = query['time'];
                            fs.writeFileSync(pantries_info_localpath, JSON.stringify(pantries_info, null, '\t'));

                            return {
                                success: true,
                                server_response_code: 201,
                                server_response_body: null,
                                server_response_headers: { 'Content-Type': 'application/octet-stream' }
                            };
                        }
                        // Invalid signature, i.e. untrustworthy source
                        else return { success: false };
                    }
                }
            }

            return { success: false };
        }
    };
}

module.exports = contents_update_Endpoint;