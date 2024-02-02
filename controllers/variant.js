const Variant = require('../models/variant');
const Product = require('../models/product');

module.exports.create = async(req,res)=>{
    try{
        const variant = new Variant(req.body);
        const product = await Product.findById(req.params.id);

        variant.SKU = req.params.id;
        product.variants.push(variant);

        await product.save();
        await variant.save();

        res.status(200).json({
            message:"successfully added a new variant"
        })



    }catch(err){
        res.status(404).json({
            message: err.message || 'Error during variant creation',
          });
    }
}

module.exports.update = async(req,res)=>{
    try{
        const {varId} = req.params;
        const variant = await Variant.findByIdAndUpdate(varId,req.body,{
            new : true,  // updated document will be returned
            runValidators : true
        });
        res.status(200).json({
            message:"successfully updated the variant"
        })
        variant.save();
        

    }catch(err){
        res.status(404).json({
            message:err.message
        })
    }
}


module.exports.delete = async(req,res)=>{
    try{
        const {id,varId} = req.params;
        if(!Variant.findById(varId)){
            throw new Error('Variant not found');
        }
        await Product.findByIdAndUpdate(id,{$pull:{variants:varId}});
        await Variant.findByIdAndDelete(varId);

        res.status(200).json({
            message:"Variant deleted successfully"
        })
    }catch(err){
        res.status(404).json({
            message:err.message
        })
    }
}


