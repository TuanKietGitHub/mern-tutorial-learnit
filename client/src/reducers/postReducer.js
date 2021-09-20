import { 
            POST_LOADING_SUCCESS , 
            POST_LOADING_FAIL , 
            ADD_POST , 
            DELETE_POST , 
            UPDATE_POST,
            FIND_POST , 
            FIND_TITLE_POST
        } from "../contexts/constants"

export const postReducer = (state , action) => {
    const {type , payload} = action

    switch(type) {
        case POST_LOADING_SUCCESS:
            return {
                ...state,
                posts: payload ,
                postLoading: false
                
            }

        case POST_LOADING_FAIL:
            return {
                ...state,
                posts: [] ,
                postLoading: false
                
            }

        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts , payload]
            }

        case DELETE_POST: 
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload)
            }

        case FIND_POST: 
            return {
                ...state ,
                post: payload
            }

        case UPDATE_POST:
            // C1: 
            // const newPost = state.posts.map( post => {
            //     if(post._id === payload._id) return payload
            //     return post
            // })

            // C2:
            const newPost = state.posts.map(post => post._id === payload._id ? payload : post)   
            const newPostFind = state.postsFind.map(post => post._id === payload._id ? payload : post)                           
            return {
                ...state ,
                posts: newPost ,
                postsFind: newPostFind
            }   

        case FIND_TITLE_POST:
            return {
                ...state ,
                postsFind: payload
            }

        default: 
            return state
    }
}