const User = require('../modals/user');
const Category = require('../modals/category');
var app = express();
var path = require('path');
const commonFile = promise.promisifyAll(require('../utility/common'))
var Promise = require('bluebird')
var categoryControllers = {};
var userService = promise.promisifyAll(require('../service/user'));
var categoryService = promise.promisifyAll(require('../service/category'));

categoryControllers.addCategory = (req, res) => {
    if (!req.body.categoryName) {
        res.status(500).json({
            message: "missing Arguements",
        });
    }
    let obj = {
        categoryName: req.body.categoryName
    }
    categoryService.findCategoryAsync(obj).then(findData => {
        console.log("findData", findData)
        if (findData.length > 0) {
            res.status(500).json({
                message: "Category Already Exist",
            });
        }
        else if (!findData==0) {
            categoryService.saveCategoryAsync(req.body).then(category => {
                if (category) {
                    res.status(200).json({
                        message: "Category Added",
                        data: category
                    });
                }
            })
        }
    })
}

categoryControllers.allCategory = (req, res) => {
    Category.find().then(category => {
        if (category) {
            console.log('category   ', category)
            let arr=[];
            async.forEachSeries(category, (obj, cb) => {
                categoryService.findCategoryPopulateAsync({_id:obj._id}).then(withPopulate => {
                    if (withPopulate) {
                        console.log('categor== ', withPopulate)
                        arr.push(withPopulate)
                        cb();
                    }
                })
            },(err)=>{
                console.log('final async',arr)
                res.status(200).json({
                    message: "All Category with subcategory",
                    data: arr
                });
            })
        }
    })
}

module.exports = categoryControllers;