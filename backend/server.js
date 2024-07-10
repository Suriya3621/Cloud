const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Firebase Admin initialization
const serviceAccountPath = path.join(__dirname, 'Cloud.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('Service account file does not exist:', serviceAccountPath);
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

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