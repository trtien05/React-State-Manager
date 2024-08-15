import { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createNewUser, resetCreate } from '../redux/users/userSlice';
import { toast } from 'react-toastify';

const Add = () => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const isCreateUser = useAppSelector(state => state.user.isCreateUser);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //If add user success
  useEffect(() => {
    if (isCreateUser === true) {
      setShow(false);
      toast('🦄 Wow so easy!');
      dispatch(resetCreate())
    }
  }, [isCreateUser])

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const addUser = {
      name: event.target.elements.floatingName.value,
      email: event.target.elements.floatingEmail.value
    }
    dispatch(createNewUser(addUser))
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow} >
        Add User
      </Button>
      <Modal show={show} backdrop={false} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>

            <Form.Group className="mb-3" controlId="formBasicName">
              <FloatingLabel controlId="floatingName" label="Name">
                <Form.Control type="name" placeholder="Name" />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingEmail"
                label="Email"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
            </Form.Group>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit' >
              Confirm
            </Button>
          </Modal.Footer>
        </Form>

      </Modal>
    </>
  )
}

export default Add