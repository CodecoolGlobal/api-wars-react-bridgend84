import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import { sendUserData } from "../api/login";
import { useState } from "react";

const Login = ({ sendToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    sendUserData(user, "login").then((res) => {
      setToken(res.token);
      if (!["", "not_found", "error", "bad_password"].includes(res.token)) {
        sendToken(res.token);
      }
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
      {token === "" ? (
        <Alert variant="info">Please log in!</Alert>
      ) : token === "not_found" ? (
        <Alert variant="warning">User not found!</Alert>
      ) : token === "error" ? (
        <Alert variant="danger">Error occured!</Alert>
      ) : token === "bad_password" ? (
        <Alert variant="warning">Bad password!</Alert>
      ) : (
        <Alert variant="success">Logged in</Alert>
      )}
    </Form>
  );
};

export default Login;
