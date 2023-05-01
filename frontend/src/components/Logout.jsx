import Alert from "react-bootstrap/Alert";

const Logout = ({ handleLogout }) => {
  
  handleLogout();

  return (
    <>
      <Alert variant="info">You have logged out!</Alert>
    </>
  );
};

export default Logout;
