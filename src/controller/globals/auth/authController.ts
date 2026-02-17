/*

REGISTER/SIGNUP
incoming data  --> username, email, password 
processing/checking --> email valid, compulsory data aaaunu paryo 
db--> table--> query --> table ma insert/read/delete/update

LOGIN/SIGNIN
LOGOUT
FORGOT PASSWORD 
RESET PASSWORD/ OTP
*/
import { Request, Response } from "express";
import User from "../../../database/model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateJWTToken from "../../../severice/generatejwtToken.js";


// funtion based
// json data -- req.body 
// files -- req.file/req.files 
// const registerUser = async (req: Request, res: Response) => {
//     const { username, email, password } = req.body;
//     // checing 
//     if (!username || !email || !password) {
//         return res.status(400).json({
//             message: "All fields are required"
//         })
//     }
//     // insert into User table 
//     await User.create({
//         username,
//         email,
//         password
//     })
//     return res.status(201).json({
//         message: "User registered successfully"
//     })
// }

// class based 
// methods --> registerUser, loginUser, logoutUser, forgotPassword, resetPassword
// atribute --> none
class AuthController {
    static async registerUser(req: Request, res: Response) {
        const { username, email, password } = req.body;

        if (req.body == undefined) {
            console.log("triggereed")
            res.status(400).json({
                message: "No data was sent!!"
            })
            return
        }

        // checing 
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const Exits = await User.findOne({ where: { email } });
        if (Exits) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        // insert into User table 
        await User.create({
            username,
            email,
            password:bcrypt.hashSync(password, 8)
        })
        return res.status(201).json({
            message: "User registered successfully"
        })

    }

    // login user 
    static async loginUser (req :Request,res:Response){
        const {email , password} = req.body ;
        if(!email || !password){
            return res.status(402).json({
                message :"email password required "
            })
        }

        // check if email exist or not in our users table
        const data = await User.findAll({
            where: {
                email
            }
        })

        
        if (!data || data.length === 0) {
            return res.status(404).json({
                message: "Not registered "
            })
        }
// cheack password
        const passwordMatch = bcrypt.compareSync(password, data[0].password);
        if (passwordMatch){

            // gerebate tokwn 
            const token = generateJWTToken({ id: data[0].id })
            return res.status(200).json({
                message: "Login successful",
                 token
            })
        }
       

        
    }
}
export default AuthController;
