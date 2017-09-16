var _ = require( 'lodash' );
_.mixin( require( 'lodash-deep' ) );
var error = require( './error.js' );
var validators = require( './validators.js' )( _ );

function restifyValidator( req, res, next ){
    if( req.validationErrors === void( 0 ) ){
        req.validationErrors = [];
    }

    req.assert = function assert( param, validation, options ){
        var value;
        if( _.isString( param ) && _.has( validators, validation ) && _.isFunction( validators[ validation ] ) ){
            if( param.indexOf( '.' ) === -1 ){
                value = req.params[ param ];
            }
            else{
                value = _.deepGet( req.params, param );
            }

            if( !value && _.has( options, 'allowNull' ) && options.allowNull ){
                return true;
            }
            else{
                var validationResult = validators[ validation ]( value, options );
                if( !validationResult ){
                    req.validationErrors.push( error( param, validation, options ).response );
                }
                return validationResult;
            }
        }
        else{
            req.validationErrors.push( 'Wrong paramaters provided' );
        }
    }
    return next();
}

module.exports = function(){
    return restifyValidator
};
