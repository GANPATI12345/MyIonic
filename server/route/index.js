var user = require('./user');
var category = require('./category');
var subCategory = require('./subCategory');

module.exports = function (app) {
    app.use('/user', user)
    app.use('/category', category)
    app.use('/subCategory', subCategory)
}