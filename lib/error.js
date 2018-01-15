var errorResponses =  {
    isString: 'Must be a string',
    isObject: 'Must be an object',
    notObject: 'Must not be an object',
    isArray: 'Must be an array',
    notArray: 'Must not be an array',
    isBoolean: 'Must be a boolean',
    notEmpty: 'Must not be empty',
    isEmpty: 'Must be empty',
    isFunction: 'Must be a function',
    isNaN: 'Must not be a number',
    isNumber: 'Must be a number',
    isNumeric: 'Must be a number or a numeric string',
    isNumerical: 'Must be a number or a numeric string',
    isDate: 'Invalid date',
    isEmail: 'Invalid email',
    isUpperCase: 'Must be an uppercase string',
    isLowercase: 'Must be a lowercase string',
    isNull: 'Must be null',
    notNull: 'Must not be null',
    isPrimitive: 'Must be a string, number, or boolean',
    isPrimary: 'Must be a string, number, or boolean',
    isComposite: 'Must be an array or object',
    isReference: 'Must be an array or object',
    isIn: 'Invalid parameter',
    default: 'Invalid parameter'
};

module.exports = function( param, validation, options ){
    return {
        param: param,
        validation: validation,
        response: errorResponses[ validation ] || errorResponses[ 'default' ],
        options: options
    };
};