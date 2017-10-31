'use strict'

var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var appController = require('../controllers/app');
var tokenController = require('../controllers/token');
var auditController = require('../controllers/audit');
//USERS

//authentification token
router.post('/auth', userController.authUserApp);
//insert
router.post('/user', userController.saveUser);
//update
router.put('/user/:id', userController.updateUser);
//delete
router.delete('/user/:id', userController.deleteUser);
//select * from users
router.get('/users', userController.getUsers);
//select * from users where users.id = ?
router.get('/user/:id', userController.getUser);

//APPS

//insert
router.post('/app', appController.saveApp);
//update
router.put('/app/:id', appController.updateApp);
//delete
router.delete('/app/:id', appController.deleteApp);
//select * from apps
router.get('/apps', appController.getApps);
//select * from apps where apps.id = ?
router.get('/app/:id', appController.getApp);

//token
//insert
//router.post('/token', tokenController.saveToken);
//update
router.put('/token/:id', tokenController.updateToken);
//delete
//router.delete('/token/:id', tokenController.deleteToken);
//select * from apps
router.get('/tokens', tokenController.getTokens);
//select * from apps where token.id =?
router.get('/token/:id', tokenController.getToken);

//Audit
//Insert
//router.post('/audit', auditController.saveAudit);
//update
router.put('/audit/:id', auditController.updateAudit);
//delete
router.delete('/Audit/:id', auditController.deleteAudit);
//select * from apps
router.get('/audits', auditController.getAudits);
//select * from apps where apps.id = ?
router.get('/audit/:id', auditController.getAudit);


module.exports = router;