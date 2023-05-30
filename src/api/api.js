import axios from 'axios';

const getRoom = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/main`);
  return response.data;
};

const addRoom = async (newRoom) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/room/create`,
    newRoom
  );
};
export { getRoom, addRoom };
