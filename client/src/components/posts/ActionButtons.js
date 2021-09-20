import Button from "react-bootstrap/Button"

import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'

import { useContext } from "react"
import { PostContext } from "../../contexts/PostContext"
 

const ActionButtons = ({url , _id}) => {

    // Contexts
    const { 
        deletePost , 
        setShowToast ,
        findPost,
        setShowUpdatePostModal
       
    } = useContext(PostContext)

    // Set Delete Post (_id) 
    const setToastDeletePost = async event => {
        deletePost.bind(this , _id)
        const { success , message } = await deletePost(_id)
        setShowToast({
            show: true,
            message: message,
            type: success ? 'success' : 'danger'
        }) 
    }

    // Set Update Post (_id)
    const setToastUpdatePost = postId => {
        findPost(postId)
        setShowUpdatePostModal(true)
    }

    return (
        <>
            <Button className='post-button' href={url} target='_blank'>
                <img src={playIcon} alt='play' width='32' height='32' />
            </Button>
            <Button className='post-button'>
                <img src={editIcon} alt='edit' width='24' height='24' onClick={setToastUpdatePost.bind(this , _id)}/>
            </Button>
            <Button className='post-button' onClick={setToastDeletePost}>
                <img src={deleteIcon} alt='delete' width='24' height='24' />
            </Button>
        </>
    )               
}

export default ActionButtons



