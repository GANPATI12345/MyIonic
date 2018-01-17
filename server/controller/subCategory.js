const User = require('../modals/user');
const Category = require('../modals/category');
var app = express();
var path = require('path');
const commonFile = promise.promisifyAll(require('../utility/common'))
var Promise = require('bluebird')
var categoryControllers = {};
var userService = promise.promisifyAll(require('../service/user'));
var categoryService = promise.promisifyAll(require('../service/category'));
var subCategoryService = promise.promisifyAll(require('../service/subCategory'));

categoryControllers.addSubCategory = (req, res) => {
    if (!req.body.subCategoryName || !req.body.categoryId) {
        res.status(500).json({
            message: "missing Arguements",
        });
    }
    else {
        console.log('inside else')
        let obj = {
            subCategoryName: req.body.subCategoryName
        }
        subCategoryService.findSubCategoryAsync(obj).then(findData => {
            console.log("findData", findData)
            if (findData.length > 0) {
                res.status(500).json({
                    message: "Category Already Exist",
                })
                return Promise.reject("already exist");
            }
            else if (findData == 0) {
                subCategoryService.saveSubCategoryAsync(req.body).then(subCategory => {
                    if (subCategory) {
                        console.log('subcategory  1', subCategory)
                        Category.update({ _id: req.body.categoryId }, { $push: { subCategory: { "subCategoryId": subCategory._id }}  }).then(upateCategory => {
                            if (upateCategory) {
                                res.status(200).json({
                                    message: "Category Added",
                                    data: subCategory
                                });
                            }
                        })
                    }
                })
            }
        })
       .catch((err) => {
      console.log('error  ', err)
   })
 }
}

module.exports = categoryControllers;