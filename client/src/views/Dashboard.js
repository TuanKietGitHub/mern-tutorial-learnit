import { PostContext } from "../contexts/PostContext"
import { useContext , useEffect } from 'react'

import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import Toast from "react-bootstrap/Toast"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

import { AuthContext } from "../contexts/AuthContext"
import SinglePost from "../components/posts/SinglePost"
import AddPostModal from "../components/posts/AddPostModal"
import addIcon from "../assets/plus-circle-fill.svg"
import UpdatePostModal from "../components/posts/UpdatePostModal"
import SearchPostModal from "../components/posts/SearchPostModal"

const Dashboard = () => {
    // Contexts
    const {authState: {user: {username}}} = useContext(AuthContext)

    const { 
        postState: { 
            post ,
            posts , 
            postLoading 
        } , 
        getPost , 
        setShowAddPostModal , 
        showToast: {
            show ,
            message ,
            type
        } ,
        setShowToast
    } = useContext(PostContext)

    // Start: GET all posts
    useEffect(() => getPost() , [])
    //console.log({postState: {posts , postLoading }})

    let body = null

    if (postLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation='border' variant='primary' />
            </div>
        )
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LaernIt</Card.Title>
                        <Card.Text>
                            Click the button below to track your skill to learn
                        </Card.Text>
                        <Button variant='success' onClick={setShowAddPostModal.bind(this , true)}>LaernIt</Button>
                    </Card.Body>
                </Card>
            </>
        ) 
    } else {
            // row-cols-1 : M???c ?????nh l?? 1 c???t
            // row-cols-md-3 : Khi post nhi???u h??n m??n h??nh th?? chia th??nh 3 c???t
            // g-4 : Kho???ng c??ch gi???a c??c c???t c??c d??ng 
            // mx-auto : Ra gi???a
            // mt-3 : Margin ??? tr??n ?????u
            // my-2 : kho???ng c??ch tr??n v?? d?????i

            body = (
                <>
                    <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                        {posts.map(post => (
                            <Col key={post._id} className='my-2'> 
                                <SinglePost post={post} />
                            </Col>
                            )
                        )}
                    </Row>

                    {/* Open Add Post Model 
                        // btn-floating : Nut Add luon luon o duoi cung
                    */}
                    <OverlayTrigger placement='left' overlay={<Tooltip>Add a new thing to laern</Tooltip>}>
                        <Button className='btn-floating' onClick={setShowAddPostModal.bind(this , true)}>
                            <img src={addIcon} alt="add-post" width='60' height='60' />
                        </Button>
                    </OverlayTrigger> 
                </>
            )
        }

    return (
        <>
            {body}
            <AddPostModal/>
            {post !== null && <UpdatePostModal/> } 
            <SearchPostModal/>
            <Toast 
                show={show} 
                style={{ position: 'fixed' , top: '20%' , right: '10px' }} 
                className={`bg-${type} text-white`}
                onClose={setShowToast.bind(this , {
                    show: false,
                    message: '',
                    type: null
                })}
                delay={3000}
                autohide
            >
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </>
    )
}

export default Dashboard