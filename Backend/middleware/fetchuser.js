const jwt = require('jsonwebtoken');
const JWT_SECRET = "rahulran$a"

// HAMARE TOKEN MEI USERID BHI HOTI HAI LAGI HUI


const fetchuser =(req,res,next)=>{
    // get the user from the jwt token and id to req object.

    // first we will get the token , ye auth-token hamare header ka naam hai 
    // iska mtlb header mei jaake authtoken ko daal ke dekho thunderclient mei fr user mil jega kiska auth
    // token hai 
    const token=req.header('auth-token');


    if (!token) {
        res.status(401).send({error:"please authenticate using a valid token"})
    }

    try {
//      WE WILL VARIFY THE TOKEN 
        const data=jwt.verify(token,JWT_SECRET);

        // this will give me the user
        req.user=data.user;

        // CALL THE NEXT FUNCTION
        next();
        
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token"})
    }
}


// here fetchuser is the function
module.exports=fetchuser;