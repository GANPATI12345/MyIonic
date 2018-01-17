const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    'categoryName': { type: String, trim: true },
    'isActive': { type: Boolean, required: false, default: true },
    'imageIcon': { type: String, required: false },
    'priority': { type: String, required: false },
    'subCategory':[{
       'subCategoryId': { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
        'date': { type: String }
    }]
}, {
        'timestamps': { createdAt: 'createdAt', updatedAt: 'lastUpdate' }
    })
module.exports = mongoose.model('Category', categorySchema)