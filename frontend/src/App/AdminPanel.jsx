import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../Firebase/config.js';
import { MdEdit, MdDelete } from "react-icons/md";
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";

// Create User
const createUser = async (user) => {
  try {
    const docRef = await addDoc(collection(db, 'Users'), user);
    return { id: docRef.id, ...user };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update User
const updateUser = async (id, user) => {
  try {
    const userDoc = doc(db, 'Users', id);
    await updateDoc(userDoc, user);
    return { id, ...user };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete User
const deleteUser = async (id) => {
  try {
    const userDoc = doc(db, 'Users', id);
    await deleteDoc(userDoc);
    return { id };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', pass: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const results = [];
      const collectionsRef = collection(db, "Users");
      const querySnapshot = await getDocs(collectionsRef);
      querySnapshot.forEach(doc => {
        results.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setUsers(results);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.pass) {
      alert('Name and Password fields cannot be empty.');
      return;
    }
    try {
      await createUser(newUser);
      await fetchUsers();
      setNewUser({ name: '', pass: '' });
      setError('');
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Error adding user');
    }
  };

  const handleUpdateUser = async () => {
    if (editingUser) {
      try {
        await updateUser(editingUser.id, editingUser);
        await fetchUsers();
        setEditingUser(null);
        setError('');
      } catch (error) {
        console.error('Error updating user:', error);
        setError('Error updating user');
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      await fetchUsers();
      setError('');
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user');
    }
  };

  return (
    <Container>
      <Title>Admin Panel</Title>
      {loading ? (
        <LoadingSpinner>
          <div className="spinner-border text-dark" role="status"></div>
        </LoadingSpinner>
      ) : (
        <>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Form>
            <Input
              type="text"
              placeholder="Name"
              maxLength="20"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Password"
              maxLength="6"
              minLength="6"
              value={newUser.pass}
              onChange={(e) => setNewUser({ ...newUser, pass: e.target.value })}
            />
            <Button onClick={handleAddUser}>Add User</Button>
          </Form>
          {editingUser && (
            <Form>
              <Input
                type="text"
                placeholder="Name"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Password"
                value={editingUser.pass}
                onChange={(e) => setEditingUser({ ...editingUser, pass: e.target.value })}
              />
              <Button onClick={handleUpdateUser}>Update User</Button>
            </Form>
          )}
          <UserList className="text-dark">
            {users.map(user => (
              <UserListItem key={user.id}>
                <UserInfo>{user.name} - {user.pass}</UserInfo>
                <ActionButton onClick={() => setEditingUser(user)} className="bg-info"><MdEdit /></ActionButton>
                <ActionButton onClick={() => handleDeleteUser(user.id)}><MdDelete /></ActionButton>
              </UserListItem>
            ))}
          </UserList>
        </>
      )}
    </Container>
  );
};

export default AdminPanel;

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const UserListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const UserInfo = styled.span`
  flex-grow: 1;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;