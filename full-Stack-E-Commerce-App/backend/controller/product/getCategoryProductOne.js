const productModel = require("../../models/productModel")

const getCategoryProduct = async(req,res)=>{

    const productCategory = await productModel.distinct("category")

    console.log("category",productCategory)


    //store one product from each category in array
    const productByCategory = []

    for(const category of productCategory){
        const product = await productModel.findOne({category : category})

        if(product){
            productByCategory.push(product)
        }
    }
     
    res.json({
        message: "product category",
        data : productByCategory,
        success : true,
        error : false,
    })


  try{

  }catch(err){
    res.status(400).json({
            message : err.message || err,
            error : true,
            success : false  
            
        })
  }
}


module.exports = getCategoryProduct