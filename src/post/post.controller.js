'use strict'

import Post from './post.model.js'
import Category from '../category/category.model.js'
import {checkUpdatePost} from '../utils/validator.js'

export const addPost = async(req, res)=>{
    try {
        let data = req.body
        data.user = req.user._id
        console.log(data._id)
        let category = Category.findOne({_id: data.category})
        if(!category) return res.status(404).send({message: 'Category not found'})
        let post = new post(data)
        await post.save()
        return res.send({message: `Register succesfully, ${post.title}`})

    } catch (error) {
        console.error(error)
        return res.status(500).send({message:'Fail to add post' })
    }

}

export const updatePost = async (req, res)=>{
    try {
        let data = req.body
        let {id} = req.params
        let idUser = req.user._id.toString()
        console.log(idUser)

        let findUser = await Post.findOne({ _id: id })
        if(!findUser) return res.status(404).send({message: 'Post not found'})
        let idU = findUser.user.toString()

        if (idU == idUser) {
            let updatedPost = await checkUpdatePost(data, id)
            if (!updatedPost) return res.status(400).send({ message: 'Have submitted some data that cannot be update' })
            let updatePost = await Post.findOneAndUpdate(
                { _id: id },
                data,
                { new: true }
            )
            if (!updatePost) return res.status(401).send({ message: 'Post not found' })
            return res.send({ message: 'Post update', updatePost })
        }else{
            return res.status(400).send({message: 'You can not update the Post of another user'})
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Fail to update Post ' })
    }
}

export const deletePost = async (req, res) =>{
    try {
        let {id} = req.params
        let uId = req.user._id.toString()

        let findUser = await Post.findOne({_id: id})
        if(!findUser) return res.status(404).send({message: 'Post not found'})
        let userID = findUser.user.toString()

        if(uId === userID){
            let deletePost = await Post.findOneAndDelete({_id: id})
            if(!deletePost) return res.status(404).send('Post not found')
            return res.send({message: `Post ${deletePost.title} deleted successfully `})

        }else{
            return res.status(500).send({message: 'You can not delete the post of other user'})
        }
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Fail delete Post'})
    }
}

export const getPosts = async (req, res) =>{
    try {

        let post = await Post.find().populate('user', ['name']).populate('category', ['categoryName'])
        if(!post) return res.status(404).send({message: 'Post not found'})
        
        return res.send(post)
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Fail get post'})
    }
}