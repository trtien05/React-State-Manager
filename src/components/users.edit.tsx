import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { resetUpdate, updateUser } from '../redux/users/userSlice';
import { toast } from 'react-toastify';

interface UserEdit {
  user: {
    id: number,
    email: string,
    name: string
  }
}

const Edit: React.FC<UserEdit> = ({ user }) => {
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  const isUpdateUser = useAppSelector(state => state.user.isUpdateUser)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isUpdateUser === true) {
      setShow(false);
      toast('🦄 Wow so easy!');
      dispatch(resetUpdate())
    }
  }, [isUpdateUser])

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const editUser = {
      id: user.id,
      name: event.target.elements.floatingName.value,
      email: event.target.elements.floatingEmail.value
    }
    dispatch(updateUser(editUser))
  }
  return (
    <>
      <Button variant="warning" onClick={handleShow} style={{ marginRight: '5px' }}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>

            <Form.Group className="mb-3" controlId="formBasicName">
              <FloatingLabel controlId="floatingName" label="Name">
                <Form.Control type="name" defaultValue={user.name} placeholder="Name" />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingEmail"
                label="Email"
                className="mb-3"
              >
                <Form.Control type="email" defaultValue={user.email} placeholder="name@example.com" />
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

export default Edit