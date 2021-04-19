import { notification } from 'antd';
import articleService from '../services/article';
import {GET_ONE_ARTICLE  ,CREATE_COMMENT } from  '../actions/articlePage'; 


const articlePage = (state = [] , action)=>{
    switch (action.type) {
        case GET_ONE_ARTICLE :
            return action.data 
        default :
            return state 
    }
}



export const getArticleData = (id) => {
    return async (dispatch) => {
        try {

            const myarticle = await articleService.getThisArticle(id) ; 
            const likedBy = await articleService.getlikedBy(id); 
            const isfollow = await articleService.isfollow(id) ; 
            const isbooked = await articleService.isBooked(id) ; 
            const comments = await articleService.getComments(id) ; 
            const response = { myarticle, likedBy , isfollow :isfollow , isbooked :isbooked , comments } ; 

            dispatch({ type: GET_ONE_ARTICLE, data: response });
            notification.success({
                message: 'get article data successfully'
            })
        } catch (e) {
            notification.error({
                message: 'faild get data of article'
            })
        }
    }
}


export const likeArticle = (id) => {
    return async () => {
        try {
             await articleService.likeArticle(id);

            notification.success({
                message: 'like Article successfully'
            })
        } catch (e) {
            notification.error({
                message: 'faild to like Article'
            })
        }
    }
}


export const unlikeArticle = (id) => {
    return async () => {
        try {
            await articleService.unlikeArticle(id);

            notification.success({
                message: 'Unlike Article successfully'
            })
        } catch (e) {
            notification.error({
                message: 'faild to unlike Article'
            })
        }
    }
}


export const BookMark =(id)=>{
    return async()=>{
        try{
            const response = await articleService.BookMark(id) ; 
            notification.success({
                message: 'booked Article successfully'
            })
        }catch(e)
        {
            notification.error({
                message: 'failed to book Article'
            })
        }
    }
}


export const unBookMark =(id)=>{
    return async()=>{
        try{
            const response = await articleService.unBookMark(id) ; 
            notification.success({
                message: 'unbooked Article successfully'
            })
        }catch(e)
        {
            notification.error({
                message: 'failed to unbook Article'
            })
        }
    }
}



export const CreateComment = (id, comment) => {
    return async (dispatch) => {
        try {
            const response = await articleService.createComment(id, comment)

            dispatch({ type: CREATE_COMMENT, data: response })
            notification.success({
                message: 'Added comment successfully'
            })
        } catch (error) {
            notification.error({
                message: 'Added article failed'
            })
        }
    }
}




export default articlePage  ; 

