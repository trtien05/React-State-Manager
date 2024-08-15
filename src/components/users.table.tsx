import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchListUsers } from '../redux/users/userSlice';
import { toast } from 'react-toastify';
import Edit from './users.edit';
import Add from './users.add';
import Delete from './users.delete';

const UsersTable = () => {

  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.user.listUsers);

  useEffect(() => {
    dispatch(fetchListUsers());
    toast('🦄 Wow so easy!');
  }, [])

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Table User</h2>

        </div>
        <div>
          <Add />
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Edit user={user} />
                <Delete user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>

  )
}

export default UsersTable