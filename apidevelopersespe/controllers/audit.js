'use strict'
var modeldb = require('../models/model');
var Audit = modeldb.Audit;
var credential = modeldb.Credential;
var jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
var config = require('../cfg');


//POST
function saveAudit(req, res) {
    var audit = new Audit();
    var params = req.body;
    if (params.application) {
        audit.className = 'ec.edu.espe.developers.espe.mongo.model.User';
        audit.codigo = 'Audit' + randomstring.generate(10).toUpperCase(); //mejoara control
        audit.application = params.application;
        audit.flag = 1;
        audit.creationDate = new Date();
        audit.lastChange = new Date();
        audit.date = new Date();
        audit.ip = '10.10.10.10';
        audit.search = 'http://aplicaciones.espe.edu';
        audit.save((err, auditStored) => {
            if (err) {
                res.status(500).send({
                    message: 'Error en el servidor.'
                });
            } else {
                if (auditStored) {
                    res.status(200).send({
                        audit: auditStored
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
function getAudits(req, res) {
    Audit.find({}).exec((err, audits) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (audits) {
                res.status(200).send({
                    audits
                });
            } else {
                res.status(404).send({
                    message: 'No hay audits.'
                });
            }
        }
    });
};

//GET
function getAudit(req, res) {
    var auditId = req.params.id;
    Audit.findById(auditId).exec((err, audit) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (audit) {
                res.status(200).send({
                    audit
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
function updateAudit(req, res) {
    var auditId = req.params.id;
    var update = req.body;
    Audit.findByIdAndUpdate(auditId, update, { new: true }, (err, userUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (auditUpdated) {
                res.status(200).send({
                    user: auditUpdated
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
function deleteAudit(req, res) {
    var auditId = req.params.id;
    Audit.findByIdAndRemove(auditId, (err, userRemoved) => {
        if (err) {
            res.status(500).send({
                message: 'Error en el servidor.'
            });
        } else {
            if (auditRemoved) {
                res.status(200).send({
                    user: auditRemoved
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

    saveAudit,
    updateAudit,
    deleteAudit,
    getAudits,
    getAudit
};