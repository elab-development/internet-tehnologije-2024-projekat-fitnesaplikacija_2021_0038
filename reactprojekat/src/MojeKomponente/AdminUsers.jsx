import React, { useState, useEffect } from 'react';
import './AdminUsers.css';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
        },
      });
      setUsers(response.data.users);
      setError('');
    } catch (err) {
      setError('Greška prilikom učitavanja korisnika.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
          },
        }
      );

      // Ažuriraj ulogu korisnika u lokalnom stanju
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: response.data.user.role } : user
        )
      );
      setSuccess(`Uloga korisnika ID ${userId} je uspešno promenjena u ${newRole}.`);
      setError('');
    } catch (err) {
      setError('Greška prilikom promene uloge korisnika.');
      setSuccess('');
    }
  };

  if (loading) return <p>Učitavanje korisnika...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="admin-users-container">
      <h1>Administracija korisnika</h1>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ime</th>
            <th>Email</th>
            <th>Uloga</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.uloga}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="korisnik">Korisnik</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
