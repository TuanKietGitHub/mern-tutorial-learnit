import { createContext , useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {    apiUrl, 
            POST_LOADING_FAIL, 
            POST_LOADING_SUCCESS , 
            ADD_POST ,
            DELETE_POST , 
            UPDATE_POST , 
            FIND_POST ,
            FIND_TITLE_POST
        } from "./constants";
import axios from "axios";

export const PostContext = createContext()

const PostContextProvider = ({children}) => {

    // state
    const [postState, dispatch] = useReducer(postReducer, {
        post: null ,
        posts: [] ,
        postsFind: [],
        postLoading: true
    })

    // Set Show ADD POST
    const [showAddPostModal , setShowAddPostModal] = useState(false)
    const [showUpdatePostModal , setShowUpdatePostModal] = useState(false)
    const [showFindPostModal , setShowFindPostModal] = useState(false)
    const [showPeople , setShowPeople] = useState(false)

    // Set Form Search
    const [ showFindPost , setShowFindPost] = useState({
        title: ''
    })

    // Set Show Toast
    const [showToast , setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // GET all post
    const getPost = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            if(response.data.success) {
                //console.log(response.data.posts)
                dispatch({ 
                    type: POST_LOADING_SUCCESS,
                    payload: response.data.posts
                })
            }
        } catch (error) {
            dispatch({ type: POST_LOADING_FAIL})
        }
    }

    // Add Post
    const addPost = async newPost => { 
        try {
            const response = await axios.post(`${apiUrl}/posts` , newPost)
            if(response.data.success) {
                dispatch({ 
                    type: ADD_POST,
                    payload: response.data.Post
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server Error' }
        }
    } 

    // Delete Post
    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            if(response.data.success) {
                dispatch({
                    type: DELETE_POST,
                    payload: postId
                })
               return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server Error' }
        }
    }

    // Find post when user is updating post
    const findPost = postId => {
        const post = postState.posts.find( post => post._id === postId)
        dispatch({
            type: FIND_POST ,
            payload: post
        })
    }

    // Update Post 
    const updatePost = async updatePost => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatePost._id}` , updatePost)
            if(response.data.success) {
                dispatch({
                    type: UPDATE_POST ,
                    payload: response.data.Post
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false , message: 'Server Error'}
        }
    }

    // Find Title Post
    const findTitlePost = postTitle => {
        let postsFind = []
        for(let post of postState.posts) {
            if(post.title === postTitle.title)
                postsFind.push(post)
        }
        dispatch({
            type: FIND_TITLE_POST ,
            payload: postsFind
        })
        return postsFind
    }

    // Context data
    const PostContextData = {
        getPost , 
        postState , 

        showAddPostModal , 
        setShowAddPostModal , 
        addPost , 

        showToast ,
        setShowToast ,

        deletePost,

        findPost,

        showUpdatePostModal ,
        setShowUpdatePostModal ,
        updatePost ,

        showFindPostModal,
        setShowFindPostModal,

        findTitlePost,

        showFindPost,
        setShowFindPost,

        showPeople,
        setShowPeople

    }

    //console.log({PostContextData : getPost() , postState})

    // Return provider
    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider




