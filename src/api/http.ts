import axios from "axios";

export const domain = "http://a0830433.xsph.ru/";

export const http = axios.create({
  baseURL: domain,
});
