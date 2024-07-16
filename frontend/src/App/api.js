import { db } from '../Firebase/config.js';

export const createUser = async (user) => {
  try {
    const docRef = await db.collection('Users').add(user);
    return { id: docRef.id, ...user };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const snapshot = await db.collection('Users').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    await db.collection('Users').doc(id).update(user);
    return { id, ...user };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await db.collection('Users').doc(id).delete();
    return { id };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};