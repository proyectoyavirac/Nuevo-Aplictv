'use strict'
var modeldb = require('../models/model');
var Token = modeldb.Token;
var credential = modeldb.Credential;
var jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
var config = require('../cfg');






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
    //  saveToken,
    updateToken,
    // deleteToken,
    getTokens,
    getToken
};