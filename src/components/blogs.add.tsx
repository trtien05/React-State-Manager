import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { createNewBlog, resetCreateBlog } from '../redux/blogs/blogSlice';

const AddBlog = () => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const isCreateBlog = useAppSelector(state => state.blog.isCreateBlog);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isCreateBlog === true) {
      setShow(false);
      dispatch(resetCreateBlog())
    }
  }, [isCreateBlog])

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const addBlog = {
      title: event.target.elements.title.value,
      author: event.target.elements.author.value,
      content: event.target.elements.content.value
    }
    dispatch(createNewBlog(addBlog))
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow} >
        Add Blog
      </Button>
      <Modal show={show} backdrop={false} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Blog</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>

            <FloatingLabel className='mb-3' controlId="title" label="Title">
              <Form.Control type="title" placeholder="Title" />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="author" label="Author">
              <Form.Control type="author" placeholder="Author" />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="content" label="Content">
              <Form.Control type="content" placeholder="Content" />
            </FloatingLabel>


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

export default AddBlog