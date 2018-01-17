const jwt = require('jsonwebtoken');
const commonFile = {};
const bcrypt = require('bcryptjs');
const credentials = require("../utility/credentials.json");

const crypto = require('crypto');

const request = require('request');
let expireTime = Math.floor(Date.now() / 1000) + (43200 * 60);
let expireTimeForAdminSideToken = Math.floor(Date.now() / 1000) + (15 * 60);
/**
 * Function becryptPassword used for password encrption
 * @param passwordValue {String} 
 *
 */
commonFile.becryptPassword = (passwordValue) => {
    var hash = bcrypt.hashSync(passwordValue, 8);
    console.log(passwordValue, "encrypted value", hash)
    return hash;
}

/**
 * Function comparePassword 
 * @param passwordValue {String} user feed password
 * @param actualPassword {String} get password from db
 *
 */
commonFile.comparePassword = (passwordValue, actualPassword) => {
    var hash = bcrypt.hashSync(passwordValue, 8);
    //console.log("In password check-->", passwordValue, actualPassword);
    return bcrypt.compareSync(passwordValue, actualPassword);
}

/**
 * Function createTokens 
 * @param req {Object} the request object
 * @param res {Object} the response object
 *
 */

commonFile.createTokens = (fdata, callback) => {
    expireTime = Math.floor(Date.now() / 1000) + (43200 * 60);
    console.log("Id is-->", fdata._id)
    var token = jwt.sign({
        exp: expireTime,
        data: fdata._id
    }, credentials.jwtSecret);
    return callback(null,token);
}

module.exports = commonFile;