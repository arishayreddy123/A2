// Import React and hooks for managing component state and side effects
import React, { useEffect, useState } from 'react';

// Import API function to fetch list of rooms
import { getRooms } from '../services/api';

// Import navigation hook from React Router
import { useNavigate } from 'react-router-dom';

// RoomList component to display all available rooms
const RoomList = () => {
  // State to hold fetched rooms
  const [rooms, setRooms] = useState([]);

  // State to hold error message if fetching fails
  const [error, setError] = useState('');

  // Hook to handle navigation between routes
  const navigate = useNavigate();

  // Fetch the rooms when component mounts
  useEffect(() => {
    getRooms()
      .then((res) => setRooms(res.data))
      .catch(() => setError('Failed to load rooms.'));
  }, []);

  // Navigate to the reservation form when "Book" is clicked
  const handleBookClick = () => {
    navigate('/reserve');
  };

  return (
    <div>
      <h2>Available Rooms</h2>

      {/* Show error if fetching rooms failed */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display list of room cards */}
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

            {/* Book button navigates to the reservation page */}
            <button onClick={handleBookClick}>Book</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the RoomList component
export default RoomList;
