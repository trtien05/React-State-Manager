import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteUser, resetDelete } from '../redux/users/userSlice';

interface UserEdit {
  user: {
    email: string,
    id: number
  }
}

const Delete: React.FC<UserEdit> = ({ user }) => {
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  const isDeleteUser = useAppSelector((state) => state.user.isDeleteUser)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isDeleteUser === true) {
      setShow(false);
      dispatch(resetDelete())
    }
  }, [])


  const handleClick = (event: any) => {
    event.preventDefault();
    const deleteID = {
      id: user.id
    }
    dispatch(deleteUser(deleteID))
  }
  return (
    <>
      <Button variant="danger" onClick={handleShow} style={{ marginRight: '5px' }}>
        Delete
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Delete the user: {user.email}</p>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit' onClick={handleClick} >
            Confirm
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default Delete