const sendUserData = async (userData, endPoint = "register") => {
  const response = await fetch(`/api/${endPoint}`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const verifyToken = async (token) => {
  const response = await fetch("/api/verify", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const getUserName = async (id) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

export { sendUserData, verifyToken, getUserName };
