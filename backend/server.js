const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./SecretKey/Cloud.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
app.get("/",function(req,res){
    res.redirect("/users")
})
  // CRUD endpoints
  app.post('/users', async (req, res) => {
    try {
        const user = req.body;
            const docRef = await db.collection('Users').add(user);
                res.status(201).send({ id: docRef.id });
                  } catch (error) {
                      res.status(400).send(error.message);
                        }
                        });

                        app.get('/users', async (req, res) => {
                          try {
                              const snapshot = await db.collection('Users').get();
                                  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                                      res.status(200).send(users);
                                        } catch (error) {
                                            res.status(400).send(error.message);
                                              }
                                              });

                                              app.put('/users/:id', async (req, res) => {
                                                try {
                                                    const { id } = req.params;
                                                        const updatedUser = req.body;
                                                            await db.collection('Users').doc(id).update(updatedUser);
                                                                res.status(200).send({ id });
                                                                  } catch (error) {
                                                                      res.status(400).send(error.message);
                                                                        }
                                                                        });

                                                                        app.delete('/users/:id', async (req, res) => {
                                                                          try {
                                                                              const { id } = req.params;
                                                                                  await db.collection('Users').doc(id).delete();
                                                                                      res.status(200).send({ id });
                                                                                        } catch (error) {
                                                                                            res.status(400).send(error.message);
                                                                                              }
                                                                                              });

                                                                                              const PORT = process.env.PORT || 5000;
                                                                                              app.listen(PORT, () => {
                                                                                                console.log(`Server running on port ${PORT}`);
                                                                                                });
