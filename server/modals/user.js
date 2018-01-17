const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    'email': { type: String, required: true },
    'fullName': { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    middleName: { type: String, default: "" },
    'gender': { type: String, default: "" },
    'mobile': { type: String, default: "" },
    'dob': { type: String, default: "" },
    'nationalId': { type: String, required: false },
    'password': { type: String, required: false },
    'registrationOTP': { type: String, required: false },
    'registrationExpireTime': { type: String, required: false },
    'forgotPasswordOTP': { type: String, required: false, default: "" },
    'forgotPasswordExpireTime': { type: Number, required: false, default: "" },
    'forgotPasswordVerify': { type: Boolean, required: false, default: false },
    'profileImage': { type: String, required: false },
    'notification': { type: String, required: false, },
    // 'rating': [{
    //     'userId': mongoose.Schema.Types.ObjectId, ref: 'user',
    //     'starRate': { type: Number, required: false, default: 0 },
    //     "review": { type: String, required: false }
    // }],
    totalRating: { type: Number, required: false, default: 0 },
    'facebook': {
        id: { type: String, required: false }
    },
    'google': {
        id: { type: String, required: false }
    },
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
    location: { type: [Number], required: false, index: '2dsphere' },
    'address': [{
        'title': { type: String, default: "Home" },
        'street': { type: String, default: "" },
        'interior': { type: String, default: "" },
        'city': { type: String, default: "" },
        'state': { type: String, default: "" },
        'name': { type: String, default: "" },
        'address': { type: String, default: "" },
        'locality': { type: String, default: "" },
        'country': { type: String, default: "" },
        'mobile': { type: String, default: "" },
        'formattedAddress': { type: String, default: "" },
        'isActive': { type: Boolean, default: true },
        latitude: { type: String },
        longitude: { type: String },
        serviceDelivery: { type: Boolean, default: false }
    }],
    'deviceId': [],
    deliveryAddress: [{
        latitude: { type: String },
        longitude: { type: String },
        address: { type: String }
    }],
    localAddress: { type: String, default: "" },
    'isSuspend': { type: Boolean, default: false },
    'isActive': { type: Boolean, default: false },
    'unixDate': { type: Number, required: false }
}, {
        timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdate' }
    })

module.exports = mongoose.model("user", userSchema)