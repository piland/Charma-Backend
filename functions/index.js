const DUO_SECRET_KEY = process.env.DUO_SECRET_KEY;
const DUO_INTEGRATION_KEY = process.env.DUO_INTEGRATION_KEY;
const DUO_HOSTNAME = process.env.DUO_HOSTNAME;


const functions = require("firebase-functions");
const axios = require("axios");

const authHeader = {auth:
        {username: DUO_INTEGRATION_KEY, password: DUO_SECRET_KEY}};

const duoBaseUrl = "https://" + DUO_HOSTNAME + "/auth/v2";

// /ping - Liveness check
exports.ping = functions.https.onRequest(async (req, res) => {
  try {
    const response = await axios.get(duoBaseUrl + "/ping", authHeader);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(error.response.status || 500).send(error.message);
  }
});

// /check - Status check
exports.check = functions.https.onRequest(async (req, res) => {
  try {
    const response = await axios.get(duoBaseUrl + "/check",
        authHeader);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(error.response.status || 500).send(error.message);
  }
});

// /logo - Retrieve logo
exports.logo = functions.https.onRequest(async (req, res) => {
  try {
    const response = await axios.get(duoBaseUrl + "/logo",
        authHeader);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(error.response.status || 500).send(error.message);
  }
});

// /enroll - Enroll a user
exports.enroll = functions.https.onRequest(async (req, res) => {
  const username = req.query.username;
  try {
    const response = await axios.post(duoBaseUrl + "/enroll",
        {username}, authHeader);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(error.response.status || 500).send(error.message);
  }
});

// /enroll_status - Check enrollment status
exports.enrollStatus = functions.https.onRequest(async (req, res) => {
  const username = req.query.username;
  try {
    const response = await axios.get(duoBaseUrl + "/enroll_status",
        {params: {username}, ...authHeader});
    res.status(200).send(response.data);
  } catch (error) {
    res.status(error.response.status || 500).send(error.message);
  }
});

// /preauth - Pre-authentication check
exports.preauth = functions.https.onRequest(async (req, res) => {
  const username = req.query.username;
  try {
    const response = await axios.post(duoBaseUrl + "/preauth",
        {username}, authHeader);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(error.response.status || 500).send(error.message);
  }
});

// /auth - Authentication request
exports.auth = functions.https.onRequest(async (req, res) => {
  const {username, factor, device} = req.query;
  try {
    const response = await axios.post(duoBaseUrl + "/auth",
        {username, factor, device}, authHeader);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(error.response.status || 500).send(error.message);
  }
});

// /auth_status - Check authentication status
exports.authStatus = functions.https.onRequest(async (req, res) => {
  const txid = req.query.txid;
  try {
    const response = await axios.get(duoBaseUrl + "/auth_status",
        {params: {txid}, ...authHeader});
    res.status(200).send(response.data);
  } catch (error) {
    res.status(error.response.status || 500).send(error.message);
  }
});
