import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import { useContext } from 'react';
import { useForm } from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';

const initialValues = {
  email: '',
  password: '',
}

function Login() {
  const [validated, setValidated] = useState(false)

  const { loginSubmitHandler } = useContext(AuthContext)
  const { values, onChange, onSubmit } = useForm(loginSubmitHandler, initialValues)

  // const handleSubmit = (event) => {
  //     const form = event.currentTarget;
  //     if (form.checkValidity() === false) {
  //       event.preventDefault();
  //       event.stopPropagation();
  //     }

  //     setValidated(true);
  //   };

  //   onSubmit={onSubmit}

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Form noValidate className="custom-form" onSubmit={onSubmit}>

        <Form.Group as={Row} controlId="email">
          <Form.Label column sm={4} className="text-center">
            Email address
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              onChange={onChange}
              value={values.email}
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
              onChange={onChange}
              value={values.password}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a password with at least 6 characters.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" className="d-block mx-auto">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;