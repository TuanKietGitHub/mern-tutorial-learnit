import React from 'react'
import Card from 'react-bootstrap/esm/Card'
import Button from 'react-bootstrap/esm/Button'

import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import logoutIcon from '../assets/logout.svg'

const People = () => {

    const {
        authState: {user: {username}} , 
        logoutUser 
    } = useContext(AuthContext)

    const logout = () => {
        logoutUser()
    }

    return (
        <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Welcome {username}</Card.Header>
                    <Card.Body>
                        <Card.Title as='h2'>Information</Card.Title>
                        <Card.Text className = 'text-left'>
                            <h6> Name </h6> 
                            <h6> Phone</h6>
                            <h6> Fax </h6>
                            <h6> Address</h6>
                        </Card.Text>
                        <Card.Footer className='text-right'>
                            <Button onClick={logout} variant='success'>
                                <img src={logoutIcon} alt='logoutIcon' width='32' height='32' className='mr-2'/>
                                <> </> Logout
                            </Button>
                            
                        </Card.Footer>
                    </Card.Body>
        </Card>
    )
}

export default People
