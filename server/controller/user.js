const User = require('../modals/user');
var app = express();
var path = require('path');
const commonFile = promise.promisifyAll(require('../utility/common'))
var Promise = require('bluebird')
var userControllers = {};
var userService = promise.promisifyAll(require('../service/user'));
//userService = require('../service/user')

userControllers.signUp = (req, res) => {
    if (!req.body.email || !req.body.password|| !req.body.mobile){
        res.status(500).json({
            message: "missing Arguements",
        });
    }
    userService.findOneDataAsync({ email: req.body.email, isActive: true}).then((userData)=>{
        console.log('data 1   ', userData)
        if (userData) {
            res.status(200).json({
                message: "Already Register",
            });
        }
        else if (!userData){
            const user = new User();
            user.email=req.body.email;
            user.password = commonFile.becryptPassword(req.body.password)
            user.mobile = req.body.mobile;
            user.isActive=true;
            user.unix= moment().unix();
            userService.saveUserAsync(user).then(saveUser=>{
                console.log('data 1   ', saveUser)
                if (saveUser) {
                    commonFile.createTokensAsync(saveUser).then((token)=>{
                        console.log('token  ',token)
                        delete saveUser.password
                        res.status(200).json({
                            message: "User Register",
                            token:token,
                            user: saveUser
                        });
                    })
                }
            })
        }
    })
    .catch((err) => {
        res.status(500).json({
            message: "Something went wrong",
            err: err
        });
    })
}

userControllers.login = (req, res) => {
  console.log('inside')
    if (!req.query.email || !req.query.password) {
        res.status(500).json({
            message: "missing Arguements",
        });
    }
    let obj={
        email:req.query.email,
        isActive:true
    }
    userService.findOneDataAsync(obj).then(data=>{
       if (!data) {
           res.status(200).json({
               message: "Authentication Failed"
           });
       } else if(data) {
           const passwordStatus = commonFile.comparePassword(req.query.password, data.password)
           console.log("Check password status:", passwordStatus)
           if (passwordStatus == true) {
               commonFile.createTokensAsync(data).then((token) => {
                   delete data.password
                   res.status(200).json({
                       message: "Login Successful",
                       token: token,
                       user: data
                   });
               })
           } else {
               res.json(401, {
                   message: "Authentication failed. Wrong password."
               })
           }
       }
    })
}
module.exports = userControllers;