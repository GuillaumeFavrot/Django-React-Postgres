//URL and axios setup
import axios from 'axios';

let url = ''
  // If no base URL (or an empty string) is given the main app address will be used. In production this is fine because the main Heroku app address serves the Django app.
  // Since React is also served by Django the correct URL is used.
  // However in development React runs on its own server so we have to specify the address (the Django server address) where requests have to be sent.
  // This section is generic and does not have to be modified. 
if(process.env.NODE_ENV === 'development') {
  url = 'http://127.0.0.1:8000'
}

export const api = axios.create({
  baseURL: url,
  xsrfCookieName: "csrftoken",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

