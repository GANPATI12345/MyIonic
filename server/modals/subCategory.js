const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    'categoryId': { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    'subCategoryName': { type: String, trim: true },
    'isActive': { type: Boolean, required: false, default: true },
    'imageIcon': { type: String, required: false },
    'priority': { type: String, required: false },
    'subCategory': [{
        'subCategoryName': { type: String, trim: true },
        'isActive': { type: Boolean, required: false, default: true },
        'imageIcon': { type: String, required: false },
        'priority': { type: String, required: false }
    }],
}, {
        timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdate' }
    })
module.exports = mongoose.model('SubCategory', subCategorySchema)