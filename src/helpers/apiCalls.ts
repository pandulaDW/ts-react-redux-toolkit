import axios from "axios";

const address = process.env.REACT_APP_URL;
const port = process.env.REACT_APP_PORT;
const url =
  process.env.NODE_ENV === "development" ? `${address}:${port}` : address;

export const fetchInitCall = () => {
  return axios.get(`${url}/lei/scrape/init-data`);
};
