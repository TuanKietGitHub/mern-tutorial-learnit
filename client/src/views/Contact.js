import React from 'react'
import Card from 'react-bootstrap/esm/Card'
import Button from 'react-bootstrap/esm/Button'
import logoFacebook from '../assets/logoFacebook.svg'
import google from '../assets/google.svg'

const Contact = () => {
    const url = 'https://www.facebook.com/profile.php?id=100016764136505'

    return (
        <Card className='text-center mx-5 my-5'>
            <Card.Header as='h1'>Tuấn Kiệt</Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text className='text-right'> 
                    <Button href={url} target='_blank' >
                        <img src={logoFacebook} alt='logoFacebook' width='32' height='32' className='mr-2' />
                    </Button>
                    <Button className='post-button'> </Button>
                    <Button href={url} target='_blank' >
                        <img src={google} alt='logoGoogle' width='32' height='32' className='mr-2' />
                    </Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Contact
