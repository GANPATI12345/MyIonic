const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    'categoryId': mongoose.Schema.Types.ObjectId, ref: 'Category',
    'subCategoryId': mongoose.Schema.Types.ObjectId, ref: 'SubCategory',
    'productDescription': { type: String },
    'imageIcon': { type: String },
    'image': [{
        'path': { type: String },
        'position': { type: Number }
    }],
    durationToDate: { type: String },
    durationToTime: { type: String },
    durationFromDate: { type: String },
    durationFromTime: { type: String },
    'quantity': { type: Number },
    'minQuatity': { type: Number },
    'price': { type: Number },
    'categoryName': { type: String },
    'subCategoryName': { type: String },
    "productsName": { type: String },
    'product': { type: String },
    'size': [{
        "qunatity": { type: String },
        'price': { type: Number },
        'discount': { type: Number }
    }],
    'offer': [{
        'offerName': { type: String },
        'discount': { type: String }
    }],
    'brand'
},

    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdate' }
    })

module.exports = mongoose.model('product', productSchema)