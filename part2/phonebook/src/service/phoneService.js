import axios from "axios";

const url = "http://localhost:3001";

const postPerson = async (person) => {
  const response = await axios({
    method: "post",
    url: `${url}/persons`,
    data: person,
  });

  return response.data;
};

const getAllPhones = async () => {
  const response = await axios({ method: "get", url: `${url}/persons` });

  return response.data;
};

const deletePhone = async (id) => {
  const response = await axios({
    method: "delete",
    url: `${url}/persons/${id}`,
  });

  return response.status === 200;
};

const updateNumber = async (person) => {
  await axios({
    method: "put",
    url: `${url}/persons/${person.id}`,
    data: person,
  });
};

const phoneService = { getAllPhones, postPerson, deletePhone, updateNumber };

export default phoneService;
