import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { verifyToken, getUserName } from "./api/login";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState("Not signed in");

  const sendToken = (received) => {
    setToken(received);
  };

  useEffect(() => {
    if (token) {
      verifyToken(token).then((res) => {
        if (res.message === "valid_token") {
          getUserName(res.data.id).then((response) => {
            setUser(response.username);
          });
        }
      });
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Layout username={user}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login sendToken={sendToken} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
