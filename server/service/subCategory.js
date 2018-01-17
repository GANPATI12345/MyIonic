var Promise = require('bluebird')

var SubCategory = promise.promisifyAll(require('../modals/subCategory'));
subCategoryService = {}

subCategoryService.findSubCategory = function (query, next) {
    console.log('query  ', query)
    SubCategory.find(query)
        .then(function (data) {
            data = JSON.parse(JSON.stringify(data));
            console.log('data    ',data)
            return next(null, data);
        })
        .catch((err) => {
            console.log('error')
        })
};

subCategoryService.saveSubCategory = function (query, next) {
    let subCategory = new SubCategory(query)
    subCategory.save(query)
        .then(function (data) {
            data = JSON.parse(JSON.stringify(data));
            console.log('daata',data)
            return next(null, data);
        })
        .catch((err) => {
            console.log('error')
        })
};

module.exports = subCategoryService