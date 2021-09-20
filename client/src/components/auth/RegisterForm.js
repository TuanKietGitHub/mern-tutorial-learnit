import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useContext , useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
    // Context
    const {registerUser} = useContext(AuthContext)

    // Router
  //  const history = useHistory()


    // Local state
    const [registerForm , setRegisterForm] = useState( {
        username: '',
        password: '',
        confirmpassword: ''
    })

    const [alert , setAlert] = useState(null)

    const {username , password , confirmpassword} = registerForm

    const onChangeRegisterForm = event => setRegisterForm({...registerForm, [event.target.name]: event.target.value})

    const register = async event => {
        event.preventDefault()

        if(password !== confirmpassword) {
            setAlert({type: 'danger' , message: 'Passwords do no match'})
            setTimeout(() => setAlert(null) , 5000)
            return
        }
        

        try {
            const registerData = await registerUser(registerForm)
            console.log(registerData)
            if (registerData.success) {
                //history.push('/dashboard')
            }
            else {
                setAlert({type: 'danger' , message: registerData.message})
                setTimeout(() => setAlert(null), 5000)
            }

        } catch (error) {
            console.log(error)
        }
    }
        return (
            <>
                <Form className="my-4" onSubmit={register}>
                <AlertMessage info={alert} />

                    <Form.Group className="my-3">
                        <Form.Control 
                            type='text' 
                            placeholder='Username' 
                            name='username' 
                            required 
                            value={username}
                            onChange={onChangeRegisterForm}
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control 
                            type='password' 
                            placeholder='Password' 
                            name='password' 
                            required 
                            value={password}
                            onChange={onChangeRegisterForm}
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control 
                            type='password' 
                            placeholder='Confirm Password' 
                            name='confirmpassword' 
                            required 
                            value={confirmpassword}
                            onChange={onChangeRegisterForm}
                        />
                    </Form.Group>
                    <Button variant='success' type='submit'>Register</Button>
                </Form>
                <p>Already have an account? 
                    <Link to='/login'>
                        <Button variant='info' size='sm' className='ml-2'>Login</Button>
                    </Link>
                </p>
            </>
        )
}

export default RegisterForm