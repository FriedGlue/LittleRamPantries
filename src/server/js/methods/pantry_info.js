/*
 * GET method: pantry_info
 * URL: pantry_info.json
 * Returns pantry_info.json file in /public/ directory
 * ----------
 * Last updated: 10/24/2023 */

const fs = require('fs');

const pantry_info_Endpoint = function(server_config) {

    const url = server_config.pantries_info_filename;
    const localpath = server_config.public + '/' + url;

    return {
        url,
        method_type: 'GET',
        pass: async(pathname, request) => {

            if(fs.existsSync(localpath)) {

                console.log(pathname);
                const json_file = fs.readFileSync(localpath, 'utf8');

                return {
                    success: true,
                    server_response_code: 200,
                    server_response_body: json_file,
                    server_response_headers: { 'Content-Type': 'application/json', 'Content-Length': json_file.length }
                };
            }
            else {
                return { success: false };
            }
        }
    };
}
 
module.exports = pantry_info_Endpoint;