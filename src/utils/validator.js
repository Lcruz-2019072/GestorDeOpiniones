'use strict'

import { hash, compare} from 'bcrypt'

export const encrypt = (password)=>{
    try {

        return hash(password, 10)

    } catch (error) {
        console.error(error)
        return error
    }

}


export const checkPassword = async(password, hash)=>{
    try {
        return await compare(password, hash)
    } catch (error) {
        console.error(error)
        return error
    }
}

export const checkUpdate = async (data, id) => {
    if (id) {
        if (Object.entries(data).length === 0 ||
            data.password ) {
            return false
        }
        return true
    } else {
        return false
    }
}

export const checkUpdatePassword = async (data, id) => {
    if (id) {
        if (Object.entries(data).length === 0 ||
            data.name ||
            data.surname ||
            data.username ||
            data.email) {
            return false
        }
        return true
    } else {
        return false
    }
}


export const checkUpdatePost = async (data, id) => {
    if (id) {
        if (Object.entries(data).length === 0 ||
            data.user||
            data.category) {
            return false
        }
        return true
    } else {
        return false
    }
}

export const checkUpdateComment = async (data, id) => {
    if (id) {
        if (Object.entries(data).length === 0 ||
            data.user||
            data.publication) {
            return false
        }
        return true
    } else {
        return false
    }
}
