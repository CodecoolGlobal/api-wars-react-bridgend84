const sendUserData = async (userData, endPoint = "register") => {
  const response = await fetch(`http://localhost:8080/${endPoint}`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const verifyToken = async (token) => {
  const response = await fetch("http://localhost:8080/verify", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const getUserName = async (id) => {
  const response = await fetch(`http://localhost:8080/users/${id}`);
  return response.json();
};

export { sendUserData, verifyToken, getUserName };
