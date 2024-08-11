import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useContext, useState } from 'react';
import { useForm } from '../../hooks/useForm';

import { createService } from '../../services/postsServices';
import AuthContext from '../../contexts/authContext';


const initialValues = {
  title: '',
  body: '',
}

function Create() {

  const { accessToken } = useContext(AuthContext)
  const { values, onChange, onSubmit } = useForm(createService, initialValues, accessToken);

  return (
    <Form noValidate
      onSubmit={onSubmit}
    >
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Enter title"
          value={values.title}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group
        className="mb-3"
        controlId="body">
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="body"
          value={values.body}
          onChange={onChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="d-block mx-auto">
        Register
      </Button>
    </Form>
  );
}

export default Create;