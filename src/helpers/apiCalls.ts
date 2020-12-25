import axios from "axios";

const address = process.env.REACT_APP_URL;
const port = process.env.REACT_APP_PORT;
const url = `${address}:${port}`;

export const fetchInitCall = () => {
  return axios.get(`${url}/lei/scrape/init-data`);
};
