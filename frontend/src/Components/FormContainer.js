import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../STYLES/Loginform.scss";

const FormContainer = ({ children, pageType = "default" }) => {
  const wrapperClass =
    pageType === "login"
      ? "form-container-wrapper login-form"
      : "form-container-wrapper";

  return (
    <div className={wrapperClass}>
      <Container>
        <Row className="justify-content-center">
          <Col xl={4} lg={5} md={6} sm={8} xs={10}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormContainer;
