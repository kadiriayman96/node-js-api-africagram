// login register(create user) logout ..
import {PrismaClient}  from "@prisma/client"
import {BadRequestMessage, UnAuthenticatedMessage, NotFoundMessage} from "../errors/index.js"
import hashPassword from "../utils/hashPassword.js"
import generateToken from "../utils/jwt.js"
import comparePasswords from "../utils/comparePasswords.js"
import  sign from "jsonwebtoken"

const prisma  = new PrismaClient()

// User Register
const register = async(req, res) => {
    try {
        const {firstname, lastname, email, password} = req.body

        // check if all the data are filled
        if (!firstname || !lastname || !email || !password) {
            return res.status(500).send(BadRequestMessage("fill all the data"));
        }

        // check if the utilsateur deja exist
        const existingUser = await prisma.utilisateur.findFirst({
            where: {
                email: email
            }
        })
        if(existingUser) {
            //return res.send(BadRequestMessage("utilisateure deja exist"))
            return res.send("deja exist")
        }

        // Hash Password
        const hpass = await hashPassword(password)
        console.log(hpass)

        // Sauvgarder l'utilisateur dans la db
        const register = await prisma.utilisateur.create({
            data : {
                firstname,
                lastname,
                email,
                password: hpass
            }
        })

        //Generer Token

        const token = await generateToken({email: email}, "Acharf")
        console.log(token)

        //Envoyer la repense et le token

            res.send(token)
       

    } catch (error) {
        console.log(error.name)
    }
}

// User Login

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        // validate email & password
        if (!email || !password) {
            return res.status(500).send(BadRequestMessage("fill all the data"));
        }

        // Trouver l'utilisateure
        const userData = await prisma.utilisateur.findUnique({
            where: {
                email: email
            },select:{
                email:true,
                password:true
            }
        })

        if(!userData) {
            return res.status(500).send(BadRequestMessage("user not exist"));
        }

        // Compare les passwords
        const isMatch = await comparePasswords(password, userData.password)
        if(isMatch === true){
            //Generate Token
            const token = await generateToken({email: email}, "Acharf")
            return res.send(token)
        } else {
            return res.status(500).send(BadRequestMessage("user not exist"));        }

    } catch (error) {
        console.log(error)
    }
}

export {register, loginUser}