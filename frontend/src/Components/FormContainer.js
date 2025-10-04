import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../STYLES/Loginform.scss";

const FormContainer = ({ children }) => {
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center ">
          <Col xl={4} lg={5} md={6} sm={8} xs={12}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormContainer;
