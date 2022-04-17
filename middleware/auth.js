var connection = require("../koneksi");
var mysql = require("mysql");
var jwt = require("jsonwebtoken");
var md5 = require("md5");
var response = require("../res");
var config = require("../config/secret");
var ip = require("ip");

// controller register
exports.register = function (req, res) {
  var dataPost = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    rule: req.body.rule,
    tanggal_daftar: new Date(),
  };

  var query = "SELECT email FROM ?? WHERE ?? = ?";
  var table = ["user", "email", dataPost.email];

  query = mysql.format(query, table);

  connection.query(query, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      if (rows.length == 0) {
        var query = "INSERT INTO ?? SET ?";
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, dataPost, function (err, rows) {
          if (err) {
            console.log(err);
          } else {
            response.ok("Berhasil menambahkan user", res);
          }
        });
      } else {
        response.ok("Email sudah digunakan", res);
      }
    }
  });
};

// controller login
exports.login = function (req, res) {
  var post = {
    password: req.body.password,
    email: req.body.email,
  };

  var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
  var table = ["user", "password", md5(post.password), "email", post.email];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        var token = jwt.sign({ rows }, config.secret);

        id_user = rows[0].id;
        var data = {
          id_user: id_user,
          acces_token: token,
          ip_address: ip.address(),
        };

        var query = "INSERT INTO ?? SET ?";
        var table = ["akses_token"];

        query = mysql.format(query, table);
        connection.query(query, data, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: true,
              message: "Token JWT tergenerate!",
              token: token,
              currUser: data.id_user,
            });
          }
        });
      } else {
        res.json({ Error: true, Message: "Email atau password salah!" });
      }
    }
  });
};


exports.halamanRahasia = function (req, res) {
    response.ok("Ini halaman rahasia admin", res);
}