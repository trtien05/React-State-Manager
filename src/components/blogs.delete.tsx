import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteBlog, resetDeleteBlog } from '../redux/blogs/blogSlice';

interface DeleteBlogProps {
  blog: {
    id: number,
    author: string
  }

}

const DeleteBlogs: React.FC<DeleteBlogProps> = ({ blog }) => {
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  const isDeleteUser = useAppSelector((state) => state.user.isDeleteUser)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isDeleteUser === true) {
      setShow(false);
      dispatch(resetDeleteBlog())
    }
  }, [])


  const handleClick = (event: any) => {
    event.preventDefault();
    const deleteID = {
      id: blog.id
    }
    dispatch(deleteBlog(deleteID))
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
          <p>Delete the user: {blog.author}</p>

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

export default DeleteBlogs