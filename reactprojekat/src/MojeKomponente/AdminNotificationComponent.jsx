import React, { useState, useEffect } from 'react';
import './AdminNotificationComponent.css';
const AdminNotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: '',
    action_url: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Učitavanje svih notifikacija
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/notifications', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Kreiranje nove notifikacije
  const handleCreateNotification = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(newNotification),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors ? JSON.stringify(errorData.errors) : 'Failed to create notification');
      }

      const createdNotification = await response.json();
      setNotifications((prev) => [createdNotification, ...prev]);
      setNewNotification({ title: '', message: '', type: '', action_url: '' });
      alert('Notifikacija uspešno kreirana!');
    } catch (err) {
      alert(`Greška: ${err.message}`);
    }
  };

  return (
    <div className="admin-notification-container">
      <h1>Administracija notifikacija</h1>

      {/* Forma za kreiranje notifikacija */}
      <form className="notification-form" onSubmit={handleCreateNotification}>
        <h2>Kreiraj novu notifikaciju</h2>
        <div className="form-group">
          <label htmlFor="title">Naslov:</label>
          <input
            id="title"
            type="text"
            value={newNotification.title}
            onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Poruka:</label>
          <textarea
            id="message"
            value={newNotification.message}
            onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="type">Tip:</label>
          <input
            id="type"
            type="text"
            value={newNotification.type}
            onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="action_url">URL akcije:</label>
          <input
            id="action_url"
            type="url"
            value={newNotification.action_url}
            onChange={(e) => setNewNotification({ ...newNotification, action_url: e.target.value })}
          />
        </div>
        <button type="submit">Kreiraj</button>
      </form>

      {/* Prikaz notifikacija u tabeli */}
      <h2>Pregled notifikacija</h2>
      {loading ? (
        <p>Učitavanje...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="notification-table">
          <thead>
            <tr>
              <th>Naslov</th>
              <th>Poruka</th>
              <th>Tip</th>
              <th>URL akcije</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id}>
                <td>{notification.title}</td>
                <td>{notification.message}</td>
                <td>{notification.type || 'N/A'}</td>
                <td>{notification.action_url || 'N/A'}</td>
                <td>
                  <button
                    onClick={() => alert(`Notifikacija: ${notification.id} - Trenutno bez funkcionalnosti`)}
                  >
                    Pregledaj
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminNotificationComponent;
