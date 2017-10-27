'use strict'
var modeldb = require('../models/model');
var Token = modeldb.Token;
var credential = modeldb.Credential;
var jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
var config = require('../cfg');


//post
function saveToken(req, res) {
    var token = new Token();
    var params = req.body;
    if (params.application) {
        token.className = 'ec.edu.developers.espe.mongo.model.Token';
        token.codigo = 'TOKEN' + randomstring.generate(10).toUpperCase();
        token.application = params.application;
        token.flag = 1;
        token.forever = true;
        token.hash = '89746513';
        token.creationDate = new Date();
        token.lastChange = new Date();
        token.date_in = new Date();
        token.date_out = new Date();
        token.save((err, tokenStored) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en el servidor.'
                });
            } else {
                if (tokenStored) {
                    res.status(200).send({
                        token: tokenStored
                    });
                } else {
                    res.status(200).send({
                        message: 'No se ha guardado el token'
                    });
                }
            }
        });
    } else {
        res.status(200).send({
            message: 'Por favor complete los campos requeridos.'
        })
    }
}


//DELETE
function deleteToken(req, res) {
    var tokenId = req.params.id;
    User.findByIdAndRemove(tokenId, (err, userRemoved) => {
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

//GET
function getTokens(req, res) {
    Token.find({}).exec((err, tokens) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (tokens) {
                res.status(200).send({
                    tokens
                });
            } else {
                res.status(404).send({
                    message: 'No hay tokens.'
                });
            }
        }
    });
};

//GET
function getToken(req, res) {
    var tokenId = req.params.id;
    User.findById(tokenId).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (user) {
                res.status(200).send({
                    token
                });
            } else {
                res.status(404).send({
                    message: 'No se encontrado.'
                });
            }
        }
    });
};


//PUT
function updateToken(req, res) {
    var tokenId = req.params.id;
    var update = req.body;
    Token.findByIdAndUpdate(tokenId, update, { new: true }, (err, userUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (userUpdated) {
                res.status(200).send({
                    token: userUpdated
                });
            } else {
                res.status(404).send({
                    message: 'No se actualizado.'
                });
            }
        }
    });
};



module.exports = {
    saveToken,
    updateToken,
    deleteToken,
    getTokens,
    getToken
};