'use strict'
var modeldb = require('..models/model');
var Token = modeldb.Token;
var credential = modeldb.Credential;
var jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
var config = require('../cfg');


//post
function saveToken(req, res) {
    var token = new Token();
    var params = req.body;
    if (params.local) {
        token.className = 'ec.edu.developers.espe.mongo.model.Token';
        token.codigo = 'TOKEN' + randomstring.generate(10).toUpperCase();
        token.local = params.local;
        token.flag = 1;
        token.creationDate = new Date();
        token.lastChange = new Date();
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