import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import { sendUserData } from "../api/login";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(100);

  const handleSubmit = () => {
    const user = {
      username: username,
      password: password,
    };
    sendUserData(user).then((res) => {
      setResponse(Number(res.status));
    });
  };

  return (
    <Form style={{ width: "30rem", padding: "0.5rem" }}>
      <Form.Group className="mb-3" controlId="username">
        <FloatingLabel controlId="username" label="Username">
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <FloatingLabel controlId="password" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      {response === 100 ? (
        <Alert variant="info">Please fill in the registration form!</Alert>
      ) : response === 200 ? (
        <Alert variant="success">Success!</Alert>
      ) : response === 400 ? (
        <Alert variant="warning">User already exists!</Alert>
      ) : (
        <Alert variant="danger">Error occured!</Alert>
      )}
    </Form>
  );
};

export default Register;
