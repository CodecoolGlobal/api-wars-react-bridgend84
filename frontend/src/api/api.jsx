const getPlanetsData = async (page = "") => {
  const planets = await fetch("http://localhost:8080/api/planets/" + page);
  return await planets.json();
};

const getPageCount = async () => {
  const pages = await fetch("http://localhost:8080/api/planets/pages");
  return await pages.json();
};

const getResidents = async (residents) => {
  const data = await fetch("http://localhost:8080/api/people", {
    method: "POST",
    body: JSON.stringify(residents),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await data.json();
};

const storeVoteToPlanet = async (planetId, username) => {
  const response = await fetch(
    `http://localhost:8080/api/planets/${planetId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ username: username }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
};

export { getPlanetsData, getPageCount, getResidents, storeVoteToPlanet };
