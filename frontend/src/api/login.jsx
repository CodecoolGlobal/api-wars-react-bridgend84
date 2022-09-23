const sendUserData = async (userData) => {
  const response = await fetch("http://localhost:8080/register", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export { sendUserData };
