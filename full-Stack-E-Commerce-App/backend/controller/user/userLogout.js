async function userLogout(req,res){
    try{
         res.clearCookie('token')

         res.json({
            message : 'Logged Out Successfully',
            error : false, 
            success : true,
            data : []
         })


    }catch(err){
        return res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = userLogout