// **************************************************************************
//Copyright (c) 2016 Chris O'Hara <cohara87@gmail.com>
//
//Permission is hereby granted, free of charge, to any person obtaining
//a copy of this software and associated documentation files (the
//"Software"), to deal in the Software without restriction, including
//without limitation the rights to use, copy, modify, merge, publish,
//distribute, sublicense, and/or sell copies of the Software, and to
//permit persons to whom the Software is furnished to do so, subject to
//the following conditions:
//
//The above copyright notice and this permission notice shall be
//included in all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
//LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
//WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// **************************************************************************
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// https://github.com/chriso/validator.js/blob/master/lib/isIP.js
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isIP;

var _assertString = require('./util/assertString');

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
var ipv6Block = /^[0-9A-F]{1,4}$/i;

function isIP(str) {
    var version = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    (0, _assertString2.default)(str);
    version = String(version);
    if (!version) {
        return isIP(str, 4) || isIP(str, 6);
    } else if (version === '4') {
        if (!ipv4Maybe.test(str)) {
            return false;
        }
        var parts = str.split('.').sort(function (a, b) {
            return a - b;
        });
        return parts[3] <= 255;
    } else if (version === '6') {
        var blocks = str.split(':');
        var foundOmissionBlock = false; // marker to indicate ::

        // At least some OS accept the last 32 bits of an IPv6 address
        // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
        // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
        // and '::a.b.c.d' is deprecated, but also valid.
        var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
        var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

        if (blocks.length > expectedNumberOfBlocks) {
            return false;
        }
        // initial or final ::
        if (str === '::') {
            return true;
        } else if (str.substr(0, 2) === '::') {
            blocks.shift();
            blocks.shift();
            foundOmissionBlock = true;
        } else if (str.substr(str.length - 2) === '::') {
            blocks.pop();
            blocks.pop();
            foundOmissionBlock = true;
        }

        for (var i = 0; i < blocks.length; ++i) {
            // test for a :: which can not be at the string start/end
            // since those cases have been handled above
            if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
                if (foundOmissionBlock) {
                    return false; // multiple :: in address
                }
                foundOmissionBlock = true;
            } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
                // it has been checked before that the last
                // block is a valid IPv4 address
            } else if (!ipv6Block.test(blocks[i])) {
                return false;
            }
        }
        if (foundOmissionBlock) {
            return blocks.length >= 1;
        }
        return blocks.length === expectedNumberOfBlocks;
    }
    return false;
}
module.exports = exports['default'];