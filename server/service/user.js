var Promise = require('bluebird')

var User = promise.promisifyAll(require('../modals/user'));

module.exports.findUser = function (query, next) {
    User.find(query)
        .then(function (data) {
            data = JSON.parse(JSON.stringify(data));
            return next(null, data);
        })
        .catch(next)
};

module.exports.findOneData = function (query, callback) {
    console.log('inside')
    User.findOne(query)
        .then(function (data) {
            data = JSON.parse(JSON.stringify(data));
//console.log('inside',data)
            return callback(null, data)
        })
        .catch((err) => {
            console.log('error')
        })
};

module.exports.saveUser = function (query, next) {
    console.log('inside', query)
    let user = new User(query)
    user.save()
        .then(function (data) {
            data = JSON.parse(JSON.stringify(data));
            console.log('inside', data)
            return next(null, data)
        })
        .catch((err) => {
            console.log('error')
        })
};

// module.exports.saveUser = function (query,callback) {
//     console.log('query',query)
//     const user = new User();
//     user.email = "he";
//     user.save().then((data) => {
//         console.log(data, '==== ')
//       return  callback(null,data)
//     })
//     // let user =new User(query)
//     // user.save()
//     //     .then(function (data) {
//     //         data = JSON.parse(JSON.stringify(data));
//     //         console.log('data saved')
//     //         return next(null, data);
//     //     })
//     //     .catch((err)=>{
//     //         console.log('error  ',err)
//     //     })
// };