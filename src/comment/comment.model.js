'use strict'
import { Schema, model } from "mongoose"

const commentSchema = Schema({
    publication:{
        type: Schema.Types.ObjectId,
        required: true
    }, 
    comment: {
        type: String, 
        required: true 
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }
},{
    versionKey: false 
})

export default model('comment', commentSchema)
