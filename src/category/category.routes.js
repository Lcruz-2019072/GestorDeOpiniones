'use strict'

import {Router} from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { addCategory, deleteCategory, getCategory, updatedCategory } from './category.controller.js'

const api = Router()

api.post('/addCategory',[validateJwt] ,addCategory)
api.put('/updateCategory/:id',[validateJwt], updatedCategory)
api.delete('/deleteCategory/:id', [validateJwt], deleteCategory)
api.get('/getCategory',[validateJwt], getCategory)

export default api