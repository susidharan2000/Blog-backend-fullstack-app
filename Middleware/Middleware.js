import jwt from 'jsonwebtoken';
import { errorHandler } from '../Utils/Error.js';

export const middleware =(req,res,next)=>{
   const token = req.headers.token;
  // console.log(token);
    if(!token){
        return next(errorHandler(401,"Unauthorized User"));
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      
        if (err) {
          return next(errorHandler(401, 'Unauthorized access' ));
        }
        req.user = user;
        next();
      });
}