import React, { useEffect, useState } from 'react';
import { getRooms } from '../services/api';
import { useNavigate } from 'react-router-dom';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getRooms()
      .then((res) => setRooms(res.data))
      .catch(() => setError('Failed to load rooms.'));
  }, []);

  const handleBookClick = () => {
    navigate('/reserve');
  };

  return (
    <div>
      <h2>Available Rooms</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {rooms.map((room) => (
          <div
            key={room.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              width: '300px',
              background: '#f9f9f9'
            }}
          >
            <h3>{room.name}</h3>
            <p><strong>Capacity:</strong> {room.capacity}</p>
            <p><strong>Location:</strong> {room.location}</p>
            <p><strong>Description:</strong> {room.description}</p>
            <button onClick={handleBookClick}>Book</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
