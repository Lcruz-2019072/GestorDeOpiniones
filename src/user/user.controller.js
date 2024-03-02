'use strict'

import User from './user.model.js'
import { generarjwt } from '../utils/jwt.js'
import { encrypt, checkPassword, checkUpdate, checkUpdatePassword} from '../utils/validator.js'

export const register = async(req, res) =>{
    try {
        let data = req.body
        console.log(data)
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({message: `Registered successfully, can be logged with username ${user.username}`})
    } catch (error) {
        console.error(error)
        if(error.keyValue.username) return res.status(400).send({message: `username ${error.keyValue.username} is alredy taken ` })
        return res.status(500).send({message: 'Fail registering user', error: error})
    }
}

export const login = async (req, res) => {
    try {
        let data = req.body
        let user = await User.findOne({
            $or: [
                {
                    username: data.username
                },
                {
                    email: data.email
                }
            ]
        })
        if( user && await checkPassword(data.password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username, 
                name:  user.name
            } 
            let token = await generarjwt(loggedUser)
            return res.send({message: `Welcome ${loggedUser.name}`, loggedUser, token})
        }else{
            res.status(500).send({message: 'password is not valid'})
        }
        if(!user) return res.status(404).send({message: 'error validate username or email'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error login user', error: error })
    }

}


export const getUsers = async (req, res) =>{
    try {

        let user = await User.find()
        if(!user) return res.status(404).send({message: 'user not found'})
        
        return res.send(user)
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Fail get user'})
    }
}

export const updatePassword = async(req, res)=>{
    try {
        let data = req.body
        data._id = req.user._id

        if (data.password) {
            let user = await User.findById(data._id);
            if (!user) return res.status(401).send({ message: 'User not found' })
    
            let isPasswordValid = await checkPassword(data.password, user.password)
            if (!isPasswordValid) {
                return res.status(400).send({ message: 'The password is not correct' })
            }else{
                data.password = await encrypt(data.newPassword)
            }
        }
        let update =  await checkUpdatePassword(data, data._id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be Update password'})
        let updateUser = await User.findOneAndUpdate(
            { _id: data._id },
            data,
            {new: true} 
        )
        if (!updateUser) return res.status(401).send({ message: 'user not found' })
        return res.send({ message: 'Update password', updateUser })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error Update password' })
    }

}

export const updateUser = async(req, res)=>{
    try {
        let data = req.body
        data._id = req.user._id
        let update =  await checkUpdate(data, data._id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be update'})
        let updateUser = await User.findOneAndUpdate(
            { _id: data._id },
            data,
            {new: true} 
        )
        if (!updateUser) return res.status(401).send({ message: 'user not found' })
        return res.send({ message: 'user update', updateUser })
    } catch (error) {
        console.error(error)
        if(error.keyValue.username) return res.status(400).send({message: `username ${error.keyValue.username} is alredy taken ` })
        return res.status(500).send({ message: 'Error updating' })
    }

}