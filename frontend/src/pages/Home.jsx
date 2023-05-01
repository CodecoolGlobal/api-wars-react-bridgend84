import { useState, useEffect } from "react";
import ResidentsModal from "../components/ResidentsModal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import {
  getPlanetsData,
  getPageCount,
  getResidents,
  storeVoteToPlanet,
} from "../api/api";

function Home({ username }) {
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    getPageCount().then((count) => setMaxPage(count));
  }, []);

  useEffect(() => {
    getPlanetsData(page).then((data) => {
      setPlanets(data);
    });
  }, [page]);

  const modalOpen = async (residents) => {
    getResidents(residents).then((response) => setResidents(response));
    setShowModal(true);
  };

  const modalClose = () => {
    setShowModal(false);
  };

  const voteToPlanet = async (planetId, index, button) => {
    button.disabled = true;
    setPlanets([...planets.slice(0, index), {
      ...planets[index],
      voted: [...planets[index].voted, username],
      votes: planets[index].votes + 1
    }, ...planets.slice(index + 1, planets.length)])
    await storeVoteToPlanet(planetId, username);
  };

  return (
    <Container fluid>
      <h1>Star Wars universe planets</h1>
      {page > 1 ? (
        <Button onClick={() => setPage(page - 1)} variant="primary" active>
          Previous page
        </Button>
      ) : (
        <Button variant="primary" disabled>
          Previous page
        </Button>
      )}
      {page < maxPage ? (
        <Button onClick={() => setPage(page + 1)} variant="primary" active>
          Next page
        </Button>
      ) : (
        <Button variant="primary" disabled>
          Next page
        </Button>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Terrain</th>
            <th>Surface Water Percentage</th>
            <th>Population</th>
            <th>Residents</th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet, index) => (
            <tr key={index}>
              <td>{planet.name}</td>
              <td>
                {Number(planet.diameter) || Number(planet.diameter) === 0
                  ? planet.diameter + " km"
                  : planet.diameter}
              </td>
              <td>{planet.climate}</td>
              <td>{planet.terrain}</td>
              <td>
                {Number(planet.surface_water)
                  ? planet.surface_water + " %"
                  : planet.surface_water}
              </td>
              <td>
                {Number(planet.population)
                  ? new Intl.NumberFormat().format(Number(planet.population)) +
                    " people"
                  : planet.population}
              </td>
              <td>
                {planet.residents.length > 0 ? (
                  <Button
                    variant="secondary"
                    onClick={() => modalOpen(planet.residents)}
                  >
                    {planet.residents.length} resident(s)
                  </Button>
                ) : (
                  "No known residents"
                )}
              </td>
              <td>
                {username === "Not signed in" ? (
                  <></>
                ) : (
                  <Button
                    variant="outline-primary"
                    onClick={(e) => voteToPlanet(planet._id, index, e.target)}
                    disabled={planet.voted.includes(username)}
                  >
                    Vote
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ResidentsModal
        showModal={showModal}
        modalClose={modalClose}
        residents={residents}
      />
    </Container>
  );
}

export default Home;
