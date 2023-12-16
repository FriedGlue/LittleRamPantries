/*
 * GET method: pantry_exterior
 * URL: domain.com/exteriors/<filename>.png (see public/pantries_info.json)
 * Returns requested image from /public/ directory, if it exists
 * ----------
 * Last updated: 10/23/2023 */

const fs = require('fs');

const pantry_exterior_Endpoint = function(server_config) {

    const pantries_info_localpath = server_config.public + '/' + server_config.pantries_info_filename;
    const url_regex = new RegExp('^exteriors\/.+\.png$');

    return {
        url_match: (url) => {
            if(url_regex.test(url)) {
                const pantries_info = JSON.parse(fs.readFileSync(pantries_info_localpath, 'utf8'));
                for(let i = 0; i < pantries_info.length; i++) {
                    const expected = server_config.pantry_exteriors_directory + '/' + pantries_info[i]['pantry_exterior_url'];
                    if(url === expected) return true;
                }
            }
            return false;
        },
        method_type: 'GET',
        pass: async(pathname, request) => {
 
            const filepath = server_config.public + '/' + pathname;
 
            if(fs.existsSync(filepath)) {

                console.log(pathname);
                const image = fs.readFileSync(filepath);
                
                return {
                    success: true,
                    server_response_code: 200,
                    server_response_body: image,
                    server_response_headers: { 'Content-Type': 'image/png', 'Content-Length': image.length }
                };
            }
            else {
                return { success: false }
            }
        }
    };
}
 
module.exports = pantry_exterior_Endpoint;