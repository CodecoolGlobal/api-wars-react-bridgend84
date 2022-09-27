import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBarComponent = ({ username }) => {
  return (
    <Navbar>
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
        <Nav.Item></Nav.Item>
      </Nav>
      <Navbar.Collapse
        className="justify-content-end"
        style={{ paddingRight: "1rem" }}
      >
        <Navbar.Text>{username}</Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBarComponent;
