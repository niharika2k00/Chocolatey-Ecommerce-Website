import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3 mx-2">
                        <p style={{ color: "#e5e5e5" }} > Copyright &copy; Developed By Niharika Dutta</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;
