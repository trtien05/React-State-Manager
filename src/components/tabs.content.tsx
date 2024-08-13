import { Container } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UsersTable from './users.table';

const TabsContent = () => {
  return (
    <Container>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3 mt-3"
      >
        <Tab eventKey="users" title="Users">
          <UsersTable />
        </Tab>
        <Tab eventKey="blog" title="Blog">
          Tab content for Blog
        </Tab>

      </Tabs>
    </Container>

  )
}

export default TabsContent