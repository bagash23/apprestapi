'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = (req, res) => {
    response.ok("Berjalan", res);
}

// tampilkan semua data
exports.tampildataBerita = function(req, res) {
    connection.query("SELECT * FROM fields", function(error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

// tampilkan data berdasarkan id
exports.tampilkanBeritaById = function(req, res) {
    let id = req.params.id;
    connection.query("SELECT * FROM fields WHERE id = ? ", [id],
        function(error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res);
            }
    });

};

// tambah data fields 
exports.tambahdataBerita = function(req, res) {
    var image = req.body.image;
    var title = req.body.title;
    var deskripsi = req.body.deskripsi;

    connection.query("INSERT INTO fields (image, title, deskripsi) VALUES (?, ?, ?)", [image, title, deskripsi],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil menambahkan data", res);
            }
    });
};

// mengubah data 
exports.ubahdataBerita = function(req, res) {
    let id = req.body.id;
    var image = req.body.image;
    var title = req.body.title;
    var deskripsi = req.body.deskripsi;

    connection.query("UPDATE fields SET image = ?, title = ?, deskripsi = ? WHERE id = ?", [image, title, deskripsi, id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil mengubah data", res);
            }
    });
};

// menghapus data
exports.hapusdataBerita = function(req, res) {
    var id = req.body.id;
    connection.query("DELETE FROM fields WHERE id = ?", [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil menghapus data", res);
            }
    });
};
