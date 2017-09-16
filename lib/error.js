var errorResponses = require( './error-responses.js' );

module.exports = function error( param, validation, options ){
    return {
    	param: param,
    	validation: validation,
    	response: errorResponses[ validation ] || errorResponses[ 'default' ],
    	options: options
    };
};