const orderModel = require("../../models/orderProductModel")

const orderController = async(request,response)=>{
  try{
    const currentUserid  = request.userId
     const orderList = await orderModel.find({userId : currentUserid}).sort({ createdAt : -1})


 response.json({
    data : orderList,
    message : "order list",
    success : true,
    error : false,
 })

 
  } catch(error){
    response.json({
            message : error.message || error,
            error : true,
            success : false  
            
    })
  }
}
 

module.exports =orderController