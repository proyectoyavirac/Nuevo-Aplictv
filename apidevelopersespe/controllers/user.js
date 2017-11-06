'use strict'
var modeldb = require('../models/model');
var User = modeldb.User;
var userNameLocal = modeldb.User.local;
var credential = modeldb.Credential;
var jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
var config = require('../cfg');
var mongoose = require('mongoose');





//POST-AUTH
function authUserApp(req, res) {
    credential.findOne({
        username: req.body.username
    }).exec((err, user) => {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'La autenticación falló. Usuario no encontrado.' });
        } else if (user) {
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'La autenticación falló. Contraseña incorrecta.' });
            } else {
                var payload = {
                    access: user.access
                }
                var token = jwt.sign(payload, config.secret, {
                    expiresIn: 86400 // tiempo 24 horas
                });
                res.json({
                    success: true,
                    message: 'Disfruta tu token! ' + user.username,
                    token: token
                });
            }

        }

    });
};

//POST
function saveUser(req, res) {
    var user = new User();
    var params = req.body;
    if (params.local) {
        user.className = 'ec.edu.espe.developers.espe.mongo.model.User';
        user.codigo = 'USER' + randomstring.generate(10).toUpperCase(); //mejoara control
        user.local = params.local;
        user.facebook = params.facebook;
        user.twitter = params.twitter;
        user.google = params.google;
        user.flag = 1;
        user.creationDate = new Date();
        user.lastChange = new Date();

        user._id = new mongoose.Types.ObjectId();
        user.save((err, userStored) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en el servidor.'
                });
            } else {
                if (userStored) {
                    res.status(200).send({
                        user: userStored
                    });
                } else {
                    res.status(200).send({
                        message: 'No se ha guardado la user.'
                    });
                }
            }
        });

    } else {
        res.status(200).send({
            message: 'Por favor complete los campos requeridos.'
        });
    }
};

//GET
function getUsers(req, res) {
    User.find({}).exec((err, users) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (users) {
                res.status(200).send({
                    users
                });
            } else {
                res.status(404).send({
                    message: 'No hay users.'
                });
            }
        }
    });
};

//get name
function getName(req, res) {

    jsonObject = JSON.stringify(data);
    console.log(jsonObject);

    User.findOne({
        'local.name': req.params.name,
        'local.password': req.params.password
    }, function (err, user) {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (user) {
                res.status(200).send(
                    { json(user) }
                );
                console.log(user);
               
            } else {
                res.status(404).send({
                    message: 'Usuario no encontrado'
                });

            }
        }

    })
};

//GET
function getUser(req, res) {
    var userId = req.params.id;
    User.findById(userId).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (user) {
                res.status(200).send({
                    user

                }
                )

            } else {
                res.status(404).send({
                    message: 'No se encontrado.'
                });
            }
        }
    });
};

//PUT
function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;
    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (userUpdated) {
                res.status(200).send({
                    user: userUpdated
                });
            } else {
                res.status(404).send({
                    message: 'No se actualizado.'
                });
            }
        }
    });
};

//DELETE
function deleteUser(req, res) {
    var userId = req.params.id;
    User.findByIdAndRemove(userId, (err, userRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (userRemoved) {
                res.status(200).send({
                    user: userRemoved
                });
            } else {
                res.status(404).send({
                    message: 'No se eliminado.'
                });
            }
        }
    });
}

module.exports = {
    authUserApp,
    saveUser,
    getName,
    updateUser,
    deleteUser,
    getUsers,
    getUser
};