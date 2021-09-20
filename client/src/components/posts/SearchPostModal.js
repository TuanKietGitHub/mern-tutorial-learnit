import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Toast from "react-bootstrap/Toast"

import { useContext } from 'react'
import { PostContext } from '../../contexts/PostContext' 

import SinglePost from "../../components/posts/SinglePost"
import UpdatePostModal from "../../components/posts/UpdatePostModal"

const SearchPostModal = () => {

    const { 
        showFindPostModal , 
            setShowFindPostModal , 
            setShowToast ,
            setShowFindPost
        } = useContext(PostContext)

    const closeDialog = () => {
        setShowFindPostModal(false)
        setShowFindPost({
            title: ''
        })
    }

    const { 
        postState: { 
            post ,
            postsFind
        } , 
        showToast: {
            show ,
            message ,
            type
        } 
    } = useContext(PostContext)

    let body = null

    if (postsFind.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>                    
                    <Card.Body>
                        <Card.Title>Search Results</Card.Title>
                        <Card.Text>
                            No results were found for your search term!
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        ) 
    } else {
            // row-cols-1 : Mặc định là 1 cột
            // row-cols-md-3 : Khi post nhiều hơn màn hình thì chia thành 3 cột
            // g-4 : Khoảng cách giữa các cột các dòng 
            // mx-auto : Ra giữa
            // mt-3 : Margin ở trên đầu
            // my-2 : khoảng cách trên và dưới

            body = (
                <>
                    <Row className='row-cols-1 row-cols-md-2 g-4 mx-auto mt-3'>
                        {postsFind.map(post => (
                            <Col key={post._id} className='my-2'> 
                                <SinglePost post={post} />
                            </Col>
                            )
                        )}
                    </Row>
                </>
            )
        }

    return (
        <Modal show={showFindPostModal} 
                animation={false} 
                onHide={closeDialog}
            >
            <Modal.Header closeButton>
                <Modal.Title>Search Results</Modal.Title>
            </Modal.Header>
            <Form >
                <Modal.Body >
                    {body}
                    {post !== null && <UpdatePostModal/> } 
                    <Toast 
                        show={show} 
                        animation={false}
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
                </Modal.Body>
            </Form>
        </Modal>
    )
}

export default SearchPostModal