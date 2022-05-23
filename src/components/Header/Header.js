import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import './Header.css';

const Header = () => {

    const [user] = useAuthState(auth);
    console.log(user);

    const handleSignOut = () => {
        signOut(auth);
    }

    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Tools-hub 🛠️</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/blogs'>Blog</Nav.Link>
                        {
                            user && <Nav.Link as={Link} to='/dashboard'>Dashboard</Nav.Link>
                        }
                    </Nav>
                    <Nav>
                        {
                            user ?
                                <div className='active-user'>
                                    <p style={{ 'marginBottom': '0', 'color': 'white' }}>{user.displayName}</p>
                                    <Nav.Link onClick={handleSignOut} className='btn btn-success'>Logout</Nav.Link>
                                </div>
                                :
                                <Nav.Link className='btn btn-danger' as={Link} to='/login'>Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;