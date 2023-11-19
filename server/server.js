import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js'
import { notFound, errorHandler } from './Middleware/errorMiddleware.js';
dotenv.config();

const app = express();

app.use('/api/users',userRoutes);

//custom error handling 
app.use(notFound);
app.use(errorHandler);

const PORT=process.env.PORT || 5000;
app.get('/',(req,res)=>res.send("server is ready"));
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});



// -POST /api/users*** -register a user
// -POST /api/users/auth*** -Authenticate a user and get token
// -POST /api/users/logout*** -logout a user and clear cookie
// -GET /api/users/profile*** -get user profile
// -PUT /api/users/profile*** -update profile

