import React, { useEffect, useState } from 'react';
import { createUser, getUsers, updateUser, deleteUser } from './api.js';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', pass: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    await createUser(newUser);
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
    setNewUser({ name: '', pass: '' });
  };

  const handleUpdateUser = async () => {
    if (editingUser) {
      await updateUser(editingUser.id, editingUser);
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
      setEditingUser(null);
    }
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.pass}
          onChange={(e) => setNewUser({ ...newUser, pass: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      {editingUser && (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={editingUser.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={editingUser.pass}
            onChange={(e) => setEditingUser({ ...editingUser, pass: e.target.value })}
          />
          <button onClick={handleUpdateUser}>Update User</button>
        </div>
      )}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.pass}
            <button onClick={() => setEditingUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
