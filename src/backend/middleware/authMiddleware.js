import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try{
       const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        console.log("token",token);
        const decoded = jwt.verify(token, "mysecretkey");
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch(error){
        return res.status(401).json({
            message:"invalid token"
        });
    }
  
};

export default authMiddleware;