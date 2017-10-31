'use strict'
var modeldb = require('../models/model');
var Audit = modeldb.Audit;
var credential = modeldb.Credential;
var jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
var config = require('../cfg');




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

    //  saveAudit,
    updateAudit,
    deleteAudit,
    getAudits,
    getAudit
};