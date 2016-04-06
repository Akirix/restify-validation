var _this = this;
var _ = require( 'lodash' );
var vldtorExtraIP = require('../patches/isIP.js');

var validators = {
    isIPLike: function(value){
        return vldtorExtraIP.isIP(value)
    },
    isString: function( value ){
        return _.isString( value );
    },
    isObject: function( value ){
        return _.isObject( value );
    },
    notObject: function( value ){
        return !_.isObject( value );
    },
    isArray: function( value ){
        return _.isArray( value );
    },
    notArray: function( value ){
        return !_.isArray( value );
    },
    isBoolean: function( value ){
        return _.isBoolean( value );
    },
    isEmpty: function( value ){
        return _.isEmpty( value );
    },
    notEmpty: function( value ){
        return !_.isEmpty( value );
    },
    isFunction: function( value ){
        return _.isFunction( value );
    },
    isNaN: function( value ){
        return _.isNaN( value );
    },
    isNumber: function( value ){
        return _.isNumber( value );
    },
    isNumerical: function( value ){
        return !isNaN( parseFloat( value ) ) && isFinite( value );
    },
    isDate: function( value ){
        return !isNaN( Date.parse( value ) );
    },
    isEmail: function( value ){
        var emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        return _.isString( value ) && emailRegex.test( value );
    },
    isUpperCase: function( value ){
        return _.isString( value ) && value === value.toUpperCase();
    },
    isLowercase: function( value ){
        return _.isString( value ) && value === value.toLowerCase();
    },
    isNull: function( value ){
        return value === null;
    },
    notNull: function( value ){
        return value !== null;
    },
    isPrimitive: function( value ){
        return _.isNumber( value ) || _.isString( value ) || _.isBoolean( value );
    },
    isComposite: function( value ){
        return _.isObject( value ) || _.isArray( value );
    },
    isIn: function( value, options ){
        if ( _.isArray( options ) ) {
            return options.indexOf( value ) !== -1;
        }
        else {
            return false;
        }
    }
};

module.exports = ( function(){
    // Aliases
    validators[ 'isNumeric' ] = validators.isNumerical;
    validators[ 'isPrimary' ] = validators.isPrimitive;
    validators[ 'isReference' ] = validators.isComposite;

    return validators;
} ).call();