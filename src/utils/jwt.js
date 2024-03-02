'use strict'

import jwt from 'jsonwebtoken'
const secretKey = '@LlaveSuperSecreta@'

export const generarjwt = async(payload)=>{
    try {
        return jwt.sign(payload, secretKey, {
            expiresIn: '3h', 
            algorithm: 'HS256'
        })
    } catch (error) {
        console.error(error)   
        return error
    }
}