import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import VoteStatModal from "./VoteStatModal";
import { getPlanetsData } from "../api/api";

const style = { textDecoration: "none", padding: "1rem" };

const NavBarComponent = ({ username }) => {
  const [showModal, setShowModal] = useState(false);
  const [votes, setVotes] = useState([]);

  const statModalShow = () => {
    getPlanetsData().then((response) => {
      const newVotes = response
        .filter((planet) => planet.votes !== 0)
        .map(
          (planet) => ({ name: planet.name, votes: planet.votes })
        );
      setVotes(newVotes);
      setShowModal(true);
    });
  };

  const statModalClose = () => {
    setShowModal(false);
  };

  return (
    <Navbar>
      <Nav activeKey="/home">
        <Nav.Item>
          <Link to="/" style={style}>
            Planet list
          </Link>
        </Nav.Item>
        <VoteStatModal
          planetVotes={votes}
          showModal={showModal}
          statModalClose={statModalClose}
        />
        <Nav.Item>
          <Link onClick={statModalShow} style={style}>
            Voting statistics
          </Link>
        </Nav.Item>
        {username === "Not signed in" ? (
          <>
            <Nav.Item>
              <Link to="/register" style={style}>
                Registration
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/login" style={style}>
                Login
              </Link>
            </Nav.Item>
          </>
        ) : (
          <Nav.Item>
            <Link to="/logout" style={style}>
              Logout
            </Link>
          </Nav.Item>
        )}
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
