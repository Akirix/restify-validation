var _this = this;
var _ = require( 'lodash' );
_.mixin( require( 'lodash-deep' ) );

var error = require( './error.js' );
var validators = require( './validators.js' )();

var _validator = function( req, res, next ){

    if( !req.hasOwnProperty( 'validationErrors' ) ){
        req.validationErrors = [];
    }

    req.assert = function( param, validation, options ){

        if( _.isString( param ) && validators.hasOwnProperty( validation ) && _.isFunction( validators[ validation ] ) ){
            var value;
            if( param.indexOf( '.' ) === -1 ){
                value = req.params[ param ];
            }
            else{
                value = _.deepGet( req.params, param );
            }

            if( !!options && options.hasOwnProperty( 'allowNull' ) && options.allowNull && !value ){
                return true;
            }
            else{
                var validationResult = validators[ validation ]( value, options );
                if( !validationResult ){
                    req.validationErrors.push( error( param, validation, options ) );
                }
                return validationResult;
            }
        }
        else{
            return true;
        }
    };
    return next();
};

var restifyValidator = function( options ){
    return [ _validator ];
};

module.exports = restifyValidator;