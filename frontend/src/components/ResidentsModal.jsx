import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

const ResidentsModal = ({ residents, showModal, modalClose }) => {
  return (
    <Modal show={showModal} onHide={modalClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Residents</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Hair color</th>
              <th>Skin color</th>
              <th>Eye color</th>
              <th>Birth year</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident, index) => (
              <tr key={index}>
                <td>{resident.name}</td>
                <td>{resident.height}</td>
                <td>{resident.mass}</td>
                <td>{resident.hair_color}</td>
                <td>{resident.skin_color}</td>
                <td>{resident.eye_color}</td>
                <td>{resident.birth_year}</td>
                <td>{resident.gender}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={modalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResidentsModal;