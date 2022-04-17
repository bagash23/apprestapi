'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = (req, res) => {
    response.ok("Berjalan", res);
}