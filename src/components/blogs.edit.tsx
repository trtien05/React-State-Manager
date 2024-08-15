import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { resetUpdateBlog, updateBlog } from '../redux/blogs/blogSlice';

interface EditBlogProps {
  blog: {
    id: number
    title: string,
    author: string,
    content: string,
  }

}

const EditBlog: React.FC<EditBlogProps> = ({ blog }) => {
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  const isUpdateBlog = useAppSelector(state => state.blog.isUpdateBlog)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isUpdateBlog === true) {
      setShow(false);
      dispatch(resetUpdateBlog())
    }
  }, [isUpdateBlog])

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const editblog = {
      id: blog.id,
      title: event.target.elements.title.value,
      author: event.target.elements.author.value,
      content: event.target.elements.content.value,
    }
    dispatch(updateBlog(editblog))
  }
  return (
    <>
      <Button variant="warning" onClick={handleShow} style={{ marginBottom: '5px' }}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit blog</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>

            <FloatingLabel className='mb-3' controlId="title" label="Title">
              <Form.Control type="title" defaultValue={blog.title} placeholder="Title" />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="author" label="Author">
              <Form.Control type="author" defaultValue={blog.author} placeholder="Author" />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="content" label="Content">
              <Form.Control type="content" defaultValue={blog.content} placeholder="Content" />
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

export default EditBlog