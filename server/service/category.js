var Promise = require('bluebird')

var Category = promise.promisifyAll(require('../modals/category'));
categoryService = {}

categoryService.findCategory = function (query, next) {
    Category.find(query)
        .then(function (data) {
            data = JSON.parse(JSON.stringify(data));
            return next(null, data);
        })
        .catch((err) => {
            console.log('error')
        })
};

categoryService.findCategoryPopulate = function (query, next) {
    Category.findOne(query).populate('subCategory.subCategoryId').exec()
        .then(function (data) {
            data = JSON.parse(JSON.stringify(data));
            console.log('data', data)
            return next(null, data);
        })
        .catch((err) => {
            console.log('error', err)
        })
};

categoryService.saveCategory = function (query, next) {
    let category = new Category(query)
    category.save(query)
        .then(function (data) {
            data = JSON.parse(JSON.stringify(data));
            return next(null, data);
        })
        .catch((err) => {
            console.log('error')
        })
};

module.exports = categoryService