

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied"
    });
    
  }
  console.log("user",req.user);
  next();
};

export default adminMiddleware;
