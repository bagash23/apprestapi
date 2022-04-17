'use strict';

const { connect } = require('./koneksi');

module.exports = function(app) {
    var jsonKu = require('./controller');

    app.route('/').get(jsonKu.index);
    app.route('/tampil').get(jsonKu.tampildataBerita);
    app.route('/tampil/:id').get(jsonKu.tampilkanBeritaById);
    app.route('/tambah').post(jsonKu.tambahdataBerita);
    app.route('/ubah').put(jsonKu.ubahdataBerita);
    app.route('/hapus').delete(jsonKu.hapusdataBerita);
}