// Quan ly trang thai cua app 
// Xac thuc nguoi dung

import {createContext , useReducer , useEffect} from 'react'
import { authReducer } from '../reducers/authReducer'
import {apiUrl , LOCAL_STORAGE_TOKEN_NAME} from '../contexts/constants'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const AuthContext = createContext() 

const AuthContextProvider = ({children}) => {
    const [authState , dispatch] = useReducer(authReducer , {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    // Authenticate user 
    const loadUser = async () => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if(response.data.success) {
                dispatch({type: 'SET_AUTH' , 
                payload: {isAuthenticated: true, 
                user: response.data.user}
            })
        }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH' , 
                payload: {isAuthenticated: false,
                user: null}
            })
        }
    }

    useEffect(() => loadUser() , [])

    // Register 
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register` , userForm)
            if (response.data.success) 
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME , response.data.accessToken)
            
            await loadUser()

            return response.data
        } catch (error) {
            if(error.response.data) 
                return error.response.data
            else 
                return {success: false, message: error.message}
        }
    }

    // Login 
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login` , userForm)
            if (response.data.success) 
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME , response.data.accessToken)
            
            await loadUser()

            return response.data
        } catch (error) {
            if(error.response.data) 
                return error.response.data
            else 
                return {success: false, message: error.message}
        }
    }

    // Logout 
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false , user: null}
        })
    }

    // Context data
    const AuthContextData = {loginUser, registerUser , logoutUser , authState}

    // Return provider
    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider



