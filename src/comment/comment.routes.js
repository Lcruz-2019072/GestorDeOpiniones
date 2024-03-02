import { Router } from "express"
import { addComment, deleteComment, getComments, updateCommetn } from './comment.controller.js'
import {validateJwt} from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/addComment', [validateJwt], addComment)
api.put('/updateComment/:id', [validateJwt], updateComment)
api.delete('/deleteComment/:id',[validateJwt], deleteComment)
api.get('/getComments', [validateJwt],getComments)


export default api	