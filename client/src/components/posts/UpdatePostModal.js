import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
// Contexts
const { 
        postState: {post} ,
        showUpdatePostModal , 
        setShowUpdatePostModal , 
        updatePost ,
        setShowToast 
    } = useContext(PostContext)

// State
const [updatedPost , setUpdatePost] = useState(post) 

useEffect(() => setUpdatePost(post), [post])

const {title , description , url , status} = updatedPost

const onChangeUpdatePostForm = event => setUpdatePost({...updatedPost , [event.target.name] : event.target.value})

const closeDialog = () => {
    setUpdatePost(post)
    setShowUpdatePostModal(false)
}

// Add post 
const onSubMit = async event => {
    event.preventDefault()
    const {success , message} = await updatePost(updatedPost) 
    closeDialog()
    //setAddPostData() 
    setShowToast({
        show: true,
        message: message,
        type: success ? 'success' : 'danger'
    })   
}

    return (
        <Modal show={showUpdatePostModal} onHide={closeDialog} >
            <Modal.Header closeButton>
                <Modal.Title>Making Progress?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubMit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' value={title} onChange={onChangeUpdatePostForm} />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='textarea' placeholder='Description' rows={3} name='description' value={description} onChange={onChangeUpdatePostForm} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Youtube Tutorial URL' name='url' value={url} onChange={onChangeUpdatePostForm} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='select' value={status} name='status' onChange={onChangeUpdatePostForm}>
                            <option vlue='TO LEARN'>TO LEARN</option>
                            <option vlue='LEARNING'>LEARNING</option>
                            <option vlue='LEARNED'>LEARNED</option>
                        </Form.Control>
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog} >Cancel</Button>
                    <Button variant='primary' type='submit'>Update</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModal
