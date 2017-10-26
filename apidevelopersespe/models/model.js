'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CredentialSchema = new Schema({
    descripcion: String,
    username: String,
    password: String,
    access: Boolean
});

var Credential = mongoose.model('Credential', CredentialSchema);

var UserSchema = new Schema({
    className: String,
    codigo: String,
    local: {
        id: String,
        name: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        Username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    admin: false,
    flag: 0,
    creationDate: Date,
    lastChange: Date
});

var User = mongoose.model('User', UserSchema);

var AppSchema = new Schema({
    className: String,
    codigo: String,
    developer: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    client_id: String,
    client_secret: String,
    flag: Number,
    creationDate: Date,
    lastChange: Date
});


var TokenSchema = new Schema({
    hash: String,
    date_in: Date,
    date_out: Date,
    forever: Boolean,
    flag: Number
});
var Token = mongoose.model('Token', TokenSchema);

var AuditSchema = new Schema({
    token: String,
    date: Date,
    search: String,
    ip: String,
    flag: Number
});
var Audit = mongoose.model('Audit', AuditSchema);






var App = mongoose.model('App', AppSchema);


module.exports = {
    Credential,
    User,
    App

}