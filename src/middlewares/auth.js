const jwt = require("jsonwebtoken");
const SECERT_KEY="NOTE_API";

const auth = (req, res, next)=>{
    
    try{
        let token = req.headers.authorization;
        
        if(token){
            
            token = token.split(" ")[1]; // remove  bearer 
            let user = jwt.verify(token, SECERT_KEY);
            req.userId = user.id;//add userId in the request so that we can acces data on the basis of that
            
        }else{
            return res.status(401).json({message: "Unauthorized User!!"})
 
        }

        next();

    }catch(error){
        console.log(error);
        res.status(401).json({message: "Unauthorized User!!"})
   
    }
}

module.exports= auth;