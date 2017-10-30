'use strict'
var modeldb = require('../models/model');
var App = modeldb.App;
var randomstring = require("randomstring");
var md5 = require('md5');

//POST
function saveApp(req, res) {
    var app = new App();
    var params = req.body;

    if (params.name && params.description) {
        app.className = 'ec.edu.espe.developers.espe.mongo.model.App';
        var count = App.count({}).exec((err, value) => {
            if (err) {
                console.log('Error en el servidor. ' + err);
            }
        });

        var code = randomstring.generate(6);
        app.codigo = 'APP' + count + code.toUpperCase();

        app.name = params.name;
        app.description = params.description;
        app.developer = params.developer;

        app.client_id = md5(app.developer.codigo);
        app.client_secret = md5(app.name + app.codigo);

        app.flag = 1;
        app.cretionDate = Date.now;
        app.lastChange = Date.now;

        app.save((err, appStored) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en el servidor.'
                });
            } else {
                if (appStored) {
                    res.status(200).send({
                        app: appStored
                    });
                } else {
                    res.status(200).send({
                        message: 'No se ha guardado la App.'
                    });
                }
            }
        });
    } else {
        res.status(200).send({
            message: 'Por favor complete los campos requeridos'
        });
    }
};

//GET
function getApps(req, res) {
    App.find({}).exec((err, apps) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (apps) {
                res.status(200).send({
                    apps
                });
            } else {
                res.status(404).send({
                    message: 'No hay apps.'
                });
            }
        }
    });
};

//GET
function getApp(req, res) {
    var appId = req.params.id;
    app.findById(appId).exec((err, app) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (app) {
                res.status(200).send({
                    app
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
function updateApp(req, res) {
    var appId = req.params.id;
    var update = req.body;
    App.findByIdAndUpdate(appId, update, { new: true }, (err, appUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (appUpdated) {
                res.status(200).send({
                    app: appUpdated
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
function deleteApp(req, res) {
    var appId = req.params.id;
    App.findByIdAndRemove(appId, (err, appRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (appRemoved) {
                res.status(200).send({
                    app: appRemoved
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
    saveApp,
    updateApp,
    deleteApp,
    getApps,
    getApp
};