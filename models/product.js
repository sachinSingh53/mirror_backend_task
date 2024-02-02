const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const Variant = require('./variant');

const ProductSchema = new Schema ({
    name: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: true
    }, 
    price: { 
        type: Number, 
        required: true
    }, 
    postedAt: {
        type: Date, 
        default: Date.now(), 
    },
    variants:[
        {
            type: Schema.Types.ObjectId,
            ref:'Variant'
        }
    ]
}); 

// to delete all the variants associated with the product after we delete the product
ProductSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await Variant.deleteMany({
            _id:{
                $in:doc.variants
            }
        })
    }
})

module.exports = mongoose.model("Product", ProductSchema);