const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const PORT = process.env.X_ZOHO_CATALYST_LISTEN_PORT|| 8000;
require("dotenv").config()
// Middleware
app.use(cors());
app.use(bodyParser.json());

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: '2394338094ea87b1882a09acb3a6785b993fcf4d',
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: '115897788671432628446',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wtwua%40installar-1202.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com'
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
// Routes
app.get("/", (req, res) => {
  res.redirect("/users");
});

// CRUD endpoints
app.post('/users', async (req, res) => {
  try {
    const user = req.body;
    const docRef = await db.collection('Users').add(user);
    res.status(201).send({ id: docRef.id });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const snapshot = await db.collection('Users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    await db.collection('Users').doc(id).update(updatedUser);
    res.status(200).send({ id });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('Users').doc(id).delete();
    res.status(200).send({ id });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
