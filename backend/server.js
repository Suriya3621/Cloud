const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
require("dotenv").config()
// Middleware
app.use(cors());
app.use(bodyParser.json());
const admin = require('firebase-admin');

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC0idXAlW/Ztud0\nwhzGbMEMcK4WrIcbPm+eovvg6cOcURE21k2Xxw40oJKM5M+lCN5+Ya5VeQkgafAR\nhtcz/GOmtk24sVxlSvjgj1bYZKgxEKic1xaB/uaR2dA8pFdLxLSNKlWa6OCx1Vpq\n5o1CzzeZDYGSQVDOkQ+/4icvuJH9LRupeiGJ0MEFtHwZZudRxQMu04VN6CjRHte/\nhGGc57SR85sKHMOay9jgK2WhClDrV8iNNymEEMU2kvgpgeMsgGvOEAsC2+MrviKI\nq0pzZoG43Zmq8RXuKsSIuIj4cuaNjJ7TjTnvq08r6hMTmP7lCsR/RnXd74qREl+K\nQF2cbOsDAgMBAAECggEAVVA7N94GNIo3txeRlHzI/zFyOtm9oLSw93SKdV7SJpiy\ne0jq8tnITzs/9Z+cth7KUUukn9Rp6SzWmtmu8WyHxLyqXqhFgsJaeHeT8P8j8ceu\n/iqwAq8rUunsevOoIvBp57mFKYZ5w9+P8itPvq4AVm2o+K2v22V2XVUn8meUaWAv\nwsC59wqv21XouCzSIsz8nVdSmcfeDIzXgXKi0cVvdX7dluCCAVxh5fZnoO02Ry9H\n8eF6viIU7Iik3DAnAV8+0pxzcLLO7fZykbfD+E0vvHS7PQjuYHcLWaRvYUI8JX8v\nmCynCuRLgzUiHedSaVOkA1jA4oYMQ4IevWh6aorTdQKBgQDeJH/NBZQue1umBO9k\nYSeSBqEsD+Z1hT5xmI7zmPk9U3POfGYH2cZj1nD7T+1y4BF5GUy2dFI0zJJuB94E\nke2+l5UNAEapzBxJEUEkkbzbiNXPuGpogOBa++V5KdLHj+hsP10dh3ymCNUr/kyM\ngMIP4EyQVvP1pgz6tYmiNMUxNQKBgQDQDgkf9TWgIk1lN3tsRvEonDNsduL44cXF\n7RPfN7JLU48NuOZV1TZh9f15XNsw06SE5pOtnCwIa/kYxBqWSnivotChLfDx3VVK\ntTbPJ/gz2TCuHOWviz5vpRZoAX+zqimWpG/utxauZgDqnNCux3paiTzs3pez+DTk\nvefSg0yqVwKBgQDJMsnGCg2CZBxILCQfCJfsfLCx1dzoCDzcak7fd2gXEWTMWoOX\nDLnRZ0KBfI0WBLgOtMl0X7qtM7RUkC+YeAubGnPXiK53z/S2gTg9RPqG5FKzhtZp\nvIB4J7pZmXXdZgwfLuzJeBN/1nQtGnB+uYgLFR6DhR4FGdabpJz6G02XGQKBgHQQ\nYGbDlDbQ6/wbB29P5BiTitxnNhdBW+MeboeHup7q7lLpYxVe7AeaAt1BP8XtS0oY\nlymyhZ3tHfkC7RIKWWkhmuFPj6pdnscecIT/9yZ1cwKufDOBqkL+BZHfxC2mL60p\n7ods++ouXTSEZqYaAdef160MP/TV8ivpBPoa5RnhAoGBAN3sJVtxUMH4cuoUdY6n\nTVkcVXFjTJ7KGfdy9L/bwqO51FCH4kToEj42LGQx76jB55NCaiU0PW5eYM/c2PSl\nj+mVbKfG/KouJp9EYLU6cN82WsYJJi2mnf1TwSsTS/rb47qOOHtQqwrBJLD2SfZ/\nRDCjIMg2IGVYdI3+Q6WhCKgr\n-----END PRIVATE KEY-----\n',
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: 'your_client_id',
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
