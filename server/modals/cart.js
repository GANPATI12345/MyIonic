const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cartSchema = new Schema({
    productList: [{
        'inStock': { type: Boolean, default: true },
        'category': mongoose.Schema.Types.ObjectId, ref: 'Category',
        'categoryId': mongoose.Schema.Types.ObjectId, ref: 'SubCategory',
        'productId': mongoose.Schema.Types.ObjectId, ref: 'product',
        'userId': mongoose.Schema.Types.ObjectId, ref: 'user',
        'productName': { type: String },
        'unit': { type: Number },
        'imageUrl': { type: String },
        'uniqueCode': { type: String },
        'productDescription': { type: String },
        durationDateTo: { type: String, required: false },
        durationTimeTo: { type: String, required: false },
        durationDateFrom: { type: String, required: false },
        durationTimeFrom: { type: String, required: false },
        productLatitude: { type: String, required: false },
        productLongitude: { type: String, required: false },
        productDistance: { type: String, required: false },
        durationTo: { type: Number },
        durationFrom: { type: Number },
        'quantity': { type: Number },
        'minQuatity': { type: Number },
        'price': { type: Number },
        'actualPrice': { type: Number },
        'savedMoney': { type: Number },
        'status': { type: String, default: "Pending" },
        totalValue: { type: Number },
        pickDrop: { type: Boolean, default: false },
        'deliveryCharge': { type: Number, default: 0 },
        'deliveryDate': { type: String },
        stockId: { type: String, default: "" },
        productMaxQuantity: { type: String },
        productMinQuantity: { type: String },
        isActive: { type: Boolean, default: false, default: true }
    }],



}, {
        timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdate' }
    })

module.exports = mongoose.model('cart', cartSchema)