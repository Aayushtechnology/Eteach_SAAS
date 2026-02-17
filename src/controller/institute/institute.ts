import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection.js";
import generateRandomInsituteNumber from "../../severice/gerneateinstitueNumber.js";
import User from "../../database/model/user.model.js";
// import { QueryTypes } from "sequelize-typescript";


class InstituteController {

   static async createInstitute(req: Request, res: Response) {


        const { instituteName, instituteEmail, institutePhoneNumber, instituteAddress } = req.body
        const instituteVatNo = req.body.instituteVatNo || null
        const institutePanNo = req.body.institutePanNo || null
        if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
            res.status(400).json({
                message: "Please provide instituteName,instituteEmail, institutePhoneNumber,  instituteAddress"
            })
            return
        }



        //sequlize 
        // string -- varchar 
        // int -- integer
        // boolean -- boolean
        // date -- date

        // seqlize ma id  by default primary key hunxa auto increment hunxa
        // but we can also define our own primary key and auto increment field
       const instituteNumber = generateRandomInsituteNumber()
       await sequelize.query(`CREATE TABLE IF NOT EXISTS institute_${instituteNumber} (
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            instituteName VARCHAR(255) NOT NULL,
            instituteEmail VARCHAR(255) NOT NULL unique,
            institutePhoneNumber VARCHAR(255) NOT NULL,
            instituteAddress TEXT NOT NULL,
            instituteVatNo VARCHAR(255),
            institutePanNo VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`)
    // insert data into institute table
await sequelize.query(`INSERT INTO institute_${instituteNumber} (instituteName, instituteEmail, institutePhoneNumber, instituteAddress, instituteVatNo, institutePanNo) VALUES (?, ?, ?, ?, ?, ?)`, {
    replacements: [instituteName, instituteEmail, institutePhoneNumber, instituteAddress, instituteVatNo, institutePanNo]
})
  
       // to create user_institute history table jaha chai users le k k institute haru create garyo sabai ko number basnu paryo 
       await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    userId VARCHAR(255) REFERENCES users(id), 
    instituteNumber INT UNIQUE 
    )`)

    //    if (req.user) {
    //        await sequelize.query(`INSERT INTO user_institute(userId,instituteNumber) VALUES(?,?)`, {
    //            replacements: [req.user.id, instituteNumber]
    //        })

           // const user =  await User.findByPk(req.user.id)
           // user?.currentInstituteNumber = instituteNumber
           // await user?.save()

    //        await User.update({
    //            currentInstituteNumber: instituteNumber,
    //            role: "institute"
    //        }, {
    //            where: {
    //                id: req.user.id
    //            }
    //        })
    //    }

    //    if (req.user) {
    //        req.user.currentInstituteNumber = instituteNumber
    //    }

       // req.user?.instituteNumber = instituteNumber; 
    //    next()




    res.status(201).json({
        message: "Institute created successfully"
    })

    }
}
//  postmn api 
// "instituteName": "ABC Institute",
//  "instituteEmail": "abc@institute.com",
// "institutePhoneNumber": "1234567890",
//  "instituteAddress": "Kathmandu, Nepal",
//  "instituteVatNo": "123456789",
//  "institutePanNo": "987654321"

export default  InstituteController;