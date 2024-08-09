import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';

function Register() {

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Form noValidate  className="custom-form">

                <Form.Group as={Row} controlId="fullName">
                    <Form.Label column sm={4} className="text-center">
                        Full Name
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="text"
                            placeholder="Enter full name"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide your full name.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="email">
                    <Form.Label column sm={4} className="text-center">
                        Email address
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email address.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password">
                    <Form.Label column sm={4} className="text-center">
                        Password
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            minLength="6"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a password with at least 6 characters.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="repeatPassword">
                    <Form.Label column sm={4} className="text-center">
                        Repeat Password
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                            minLength="6"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please repeat password.
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit" className="d-block mx-auto">
                    Register
                </Button>
            </Form>
        </Container>
    );
}

export default Register;