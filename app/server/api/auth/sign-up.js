import bcrypt from "bcryptjs"
import User from '../../utils/models/user';

export default defineEventHandler(async(event)=>{
    try {
        await dbConnect();
        const body = await readBody(event);
        const { email, password } = body;

        // VALIDATE WITH YUP

        // CHECK if user exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw createError({
                statusCode:400,
                statusMessage: 'User already exists'
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password,12)

        // Create user
        const user = await User.create({
            email: email.toLowerCase(),
            password: hashedPassword
        })

        // Set a new session
        await setUserSession(event,{
            user:{
                id: user._id.toString(),
                email: user.email
            }
        })

        return {
            success: true,
            user:{
                id: user._id,
                email: user.email
            }
        }
    } catch(error){
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage:  error.statusMessage || error.message,
            data: error.data || null
        })
    }
})