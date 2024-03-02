import { Router } from "express"
import { addPost, deletePost, getPosts, updatePost } from "./post.model.js"
import {validateJwt} from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/addPost',[validateJwt], addPost)
api.put('/updatePost/:id', [validateJwt], updatePost)
api.delete('/deletePost/:id', [validateJwt], deletePost)
api.get('/getPost', [validateJwt], getPosts)
export default api