import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import FormControl from 'react-bootstrap/FormControl'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'

import learnItLogo from '../../assets/logo.svg'
import iconSearch from '../../assets/IconSearch.svg'
import people from '../../assets/people.svg'

import { useContext } from 'react'
import { PostContext } from '../../contexts/PostContext'

const NavbarMenu = () => {

    // Logout
    // const {
    //         authState: {user: {username}} , 
    //         logoutUser 
    // } = useContext(AuthContext)

    // const logout = () => {
    //     logoutUser()
    // }

    // 
    const { 
        setShowFindPostModal ,
        findTitlePost,
        showFindPost, 
        setShowFindPost
    } = useContext(PostContext)

    // const [ findPost , setFindPost] = useState({
    //     title: ''
    // })

    const { title } = showFindPost

    const onChangeFindTitlePost = event => setShowFindPost({...showFindPost , [event.target.name] : event.target.value})

    const setHandleSearch = event => {
        event.preventDefault()
        if(title !== '') {
            findTitlePost(showFindPost)
            setShowFindPostModal(true)
        }

    }

    return (
        <Navbar collapseOnSelect expand="lg" bg='secondary' variant='dark' className='shadow' >
			<Container>
            <Navbar.Brand className='font-weight-bolder text-white'>
				<img
					src={learnItLogo}
					alt='learnItLogo'
					width='32'
					height='32'
					className='mr-2'
				/>

				LEARNIT
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='basic-navbar-nav' />

			<Navbar.Collapse id='basic-navbar-nav' >
                <Nav className="me-auto">
                    <Nav.Link to='/home' as={Link}> HOME </Nav.Link>
                    <Nav.Link to='/about' as={Link}> ABOUT </Nav.Link>
                    <Nav.Link to='/contact' as={Link}> CONTACT </Nav.Link>
                    <Nav.Link to='/dashboard' as={Link}> DASHBOARD </Nav.Link>
                        <NavDropdown title="HELP" id="collasible-nav-dropdown">
                            <NavDropdown.Item >Action</NavDropdown.Item>
                            <NavDropdown.Item >Another action</NavDropdown.Item>
                            <NavDropdown.Item >Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item >Separated link</NavDropdown.Item>
                        </NavDropdown>
                </Nav>

                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        name="title"
                        className="mr-2"
                        aria-label="Search"
                        value={title} 
                        onChange={onChangeFindTitlePost}
                    />
                    <Button 
                        variant='success' 
                        onClick={setHandleSearch}> 
                        <img    src={iconSearch} 
                                alt='logoutIcon' 
                                width='20' height='20' 
                                className='mr-2'
                        />
                    </Button>
                </Form>

				<Nav >
                    <Nav.Link to='/account' as={Link}> 
                        <img    src={people} 
                                alt='peopelIcon' 
                                width='30' height='30' 
                                className='mr-2' /> 
                    </Nav.Link>

                    {/* <NavDropdown title={<img src={people}/>} show={true}  id="collasible-nav-dropdown">
                        <NavDropdown.Item>Welcomne {username}</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                            <Button onClick={logout}>
                                <img src={logoutIcon} alt='logoutIcon' width='32' height='32' className='mr-2'/>
                                Logout
                            </Button>
                        </NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
			</Navbar.Collapse>
            </Container>
		</Navbar>
    )
}

export default NavbarMenu
