const Product =require('../models/product');
const Variant = require('../models/variant');

module.exports.index = async(req,res)=>{
    try{
        const products = await Product.find({}).populate('variants');
        res.status(200).json({
            products: products
        });
    }catch(err){
        res.status(404).json({
            error: err
        })
    } 
}

module.exports.create = async(req,res)=>{
    try{
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({
            message:'successfully created new product'
        })
    }catch(err){
        res.status(400).json({
            error: err.message
        })
    } 
}

module.exports.show = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id).populate('variants');
        if(!product){
            throw new Error('product not found');
        }
        res.status(200).json({
            product: product
        })
        
    }catch(err){
        res.status(404).json({
            error: err.message
        })
    } 
}

module.exports.update = async(req,res)=>{
    try{

        if(!await Product.findById(req.params.id)){
            throw new Error('product not found');
        }

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new : true,  // updated document will be returned
            runValidators : true
        })
        res.status(200).json({
            message:"successfully updated the product"
        })
    }catch(err){
        res.status(404).json({
            error: err.message
        })
    }
}

module.exports.delete = async(req,res)=>{
    try{
        if(!await Product.findById(req.params.id)){
            throw new Error('product not found');
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"successfully deleted the product"
        })
    }catch(err){
        res.status(404).json({
            error: err.message
        })
    }
}

module.exports.search =  async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm; 

        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, ""); 

        let searchResults = await Product.find({
            $or: [
                { name: { $regex: new RegExp(searchNoSpecialChars, 'i')}}, 
                { description: { $regex: new RegExp(searchNoSpecialChars, 'i')}},
                
            ]
        });

       
        let searchResultsVariant = await Variant.find({
            $or: [
                { name: { $regex: new RegExp(searchNoSpecialChars, 'i')}}
            ]
        });

        const finalResult=searchResults.concat(searchResultsVariant);
        res.status(200).json({products: finalResult}); 

    } catch (err) {
        res.status(404).json({
            error: err
        })
    }
}