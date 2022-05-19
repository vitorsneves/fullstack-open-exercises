import axios from "axios";

const url = "http://localhost:3001";

const postPerson = async (person) => {
  const response = await axios({
    method: "post",
    url: `${url}/persons`,
    data: person,
  });
  console.log(response);
};

const getAllPhones = async () => {
  try {
    const response = await axios({ method: "get", url: `${url}/persons` });

    return response.data;
  } catch {
    alert(
      "It was not possible to connect with the server. Check your connection"
    );

    return [];
  }
};

export default { getAllPhones, postPerson };
