import { Container, Table } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useEffect } from 'react';
import { fetchListBlogs } from '../redux/blogs/blogSlice';
import AddBlog from './blogs.add';
import EditBlog from './blogs.edit';
import DeleteBlogs from './blogs.delete';

const BlogsTable = () => {
  const blogs = useAppSelector(state => state.blog.listBlogs);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchListBlogs());
  }, [])
  return (
    <>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>Table Blogs</h2>

          </div>
          <div>
            <AddBlog />
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Content</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>{blog.content}</td>
                <td>
                  <EditBlog blog={blog} />
                  <DeleteBlogs blog={blog} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default BlogsTable