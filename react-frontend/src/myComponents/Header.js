import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import './Header.css';

function Header() {
    return(
        <Container id = "headerContainer">
            <Row id = "HeaderRow">
                <Col id = "titleCol">
                    <Nav.Link id = "filter" href="/">
                        <Image id = "logo" href="/" src={require("./logos/image2.png")}/>
                    </Nav.Link>
                </Col>
                <Col id = "navbarCol" >
                    <Navbar id = "navbar" bg="alert" variant="dark">
                        <Navbar.Brand id = "NavLink" href="/">Home</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link id = "NavLink" href="/cards">Browse cards</Nav.Link>
                            <Nav.Link id = "NavLink" href="/create">Create a card</Nav.Link>
                        </Nav>
                    </Navbar>
                </Col>
            </Row>
            
        </Container>
        
    )
}

export default Header;