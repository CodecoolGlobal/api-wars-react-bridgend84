import Nav from 'react-bootstrap/Nav';

const NavBar = () => {
  return (
    <Nav activeKey="/home">
      <Nav.Item>
        <Nav.Link href="/">Planet list</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/vote">Voting statistics</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/register">Registration</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/logout">Logout</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavBar;
