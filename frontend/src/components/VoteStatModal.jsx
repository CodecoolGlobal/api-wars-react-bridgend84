import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

const VoteStatModal = ({ planetVotes, showModal, statModalClose }) => {
  return (
    <Modal show={showModal} onHide={statModalClose} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Votes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Planet name</th>
              <th>Vote(s)</th>
            </tr>
          </thead>
          <tbody>
            {planetVotes.map((planetVote, index) => (
              <tr key={index}>
                <td>{planetVote.name}</td>
                <td>{planetVote.votes}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={statModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VoteStatModal;