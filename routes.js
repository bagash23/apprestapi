'use strict';

module.exports = function(app) {
    var jsonKu = require('./controller');

    app.route('/').get(jsonKu.index);
}