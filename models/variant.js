const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const VariantSchema = new Schema ({
    name: {
        type: String, 
        required: true
    }, 
    SKU:{
        type: Schema.Types.ObjectId,
        ref:'Product'
    },
    additionalPrice: { 
        type: Number, 
        required: true
    },
    stockCount:{
        type: Number,
        required: true
    }
}); 

module.exports = mongoose.model("Variant", VariantSchema);