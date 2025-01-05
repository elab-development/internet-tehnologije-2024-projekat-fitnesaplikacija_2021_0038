import React, { useState, useEffect } from 'react';
import './UserNotificationComponent.css';

const UserNotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        // Filtriramo notifikacije koje su starije od 10 dana
        const recentNotifications = data.filter((notification) => {
          const createdDate = new Date(notification.created_at);
          const tenDaysAgo = new Date();
          tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
          return createdDate >= tenDaysAgo;
        });
        setNotifications(recentNotifications);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <p>Učitavanje notifikacija...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="user-notification-container">
      <h1>Obaveštenja</h1>
      {notifications.length === 0 ? (
        <p className="no-notifications">Nemate novih notifikacija u poslednjih 10 dana.</p>
      ) : (
        <div className="notification-list">
          {notifications.map((notification) => (
            <div className="notification-card" key={notification.id}>
              <h2 className="notification-title">{notification.title}</h2>
              <p className="notification-message">{notification.message}</p>
              {notification.action_url && (
                <a
                  href={notification.action_url}
                  className="notification-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pročitaj više
                </a>
              )}
              <p className="notification-date">
                Datum: {new Date(notification.created_at).toLocaleDateString('sr-RS')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserNotificationComponent;
