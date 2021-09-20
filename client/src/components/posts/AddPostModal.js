import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {
// Contexts
const { showAddPostModal , setShowAddPostModal , addPost ,setShowToast } = useContext(PostContext)

// State
const [newPost , setNewPost] = useState({ 
    title: '',
    description: '',
    url: '',
    status: 'TO LEARN'
}) 

const {title , description , url} = newPost

const onChangeNewPostForm = event => setNewPost({...newPost , [event.target.name] : event.target.value})

const closeDialog = () => {
    setAddPostData()
}

// Add post 
const onSubMit = async event => {
    event.preventDefault()
    const {success , message} = await addPost(newPost) 
    setAddPostData() 
    setShowToast({
        show: true,
        message: message,
        type: success ? 'success' : 'danger'
    })   
}

const setAddPostData = () => {
    setNewPost({ 
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })
    setShowAddPostModal(false)
}

    return (
        <Modal show={showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubMit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' value={title} onChange={onChangeNewPostForm} />
                        <Form.Text id='title-help' muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='textarea' placeholder='Description' rows={3} name='description' value={description} onChange={onChangeNewPostForm} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='text' placeholder='Youtube Tutorial URL' name='url' value={url} onChange={onChangeNewPostForm} />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
                    <Button variant='primary' type='submit'>LearnIt</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal
