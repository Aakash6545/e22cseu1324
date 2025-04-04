const axios = require("axios");

let token = null;
let tokenExpiry = 0;

const authPayload = {
  email: "e22cseu1324@bennett.edu.in",
  name: "aakash",
  rollNo: "e22cseu1324",
  accessCode: "rtCHZJ",
  clientID: "2ef1702a-c289-4163-9bad-38c1c15a78e4",
  clientSecret: "WJrPSyjgVksYdkdp",
};

const AUTH_URL = "http://20.244.56.144/evaluation-service/auth";

async function fetchNewToken() {
  const res = await axios.post(AUTH_URL, authPayload);
  token = `${res.data.token_type} ${res.data.access_token}`;
  tokenExpiry = res.data.expires_in * 1000; 
  return token;
}

async function getValidToken() {
  const now = Date.now();
  if (!token || now >= tokenExpiry - 60_000) {
    await fetchNewToken();
  }
  return token;
}

module.exports = {
  getValidToken,
};
