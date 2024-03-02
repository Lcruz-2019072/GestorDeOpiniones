'use strict'
import {Router} from 'express'
import { getUsers, login, register, updatePassword, updateUser } from './user.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()


api.post('/register', register)
api.post('/login', login)


api.put('/updateUser',[validateJwt], updateUser)
api.get('/getUsers', [validateJwt], getUsers)
api.put('/updatePassword', [validateJwt], updatePassword)

export default api
