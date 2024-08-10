import Form from 'react-bootstrap/Form';

const initialValues = {
  email: '',
  password: '',
}


function Create() {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Topic name</Form.Label>
        <Form.Control type="text" placeholder="Enter email" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="details">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Details" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} required />
      </Form.Group>
    </Form>
  );
}

export default Create;