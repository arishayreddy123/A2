// Import React and hooks for managing component state and side effects
import React, { useEffect, useState } from 'react';

// Import API functions for fetching rooms and creating reservations
import { getRooms, createReservation } from '../services/api';

// Import helper to get auth token
import { getToken } from '../services/auth';

// ReservationForm component for booking a room
const ReservationForm = () => {
  // State to store available rooms
  const [rooms, setRooms] = useState([]);

  // State for the form inputs
  const [formData, setFormData] = useState({
    room: '',
    start_time: '',
    end_time: '',
  });

  // State to show success or error messages
  const [message, setMessage] = useState('');

  // Fetch room data when component mounts
  useEffect(() => {
    getRooms()
      .then((res) => setRooms(res.data))
      .catch((err) => console.error('Error loading rooms:', err));
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    const token = getToken();
    if (!token) {
      setMessage('You must be logged in to make a reservation.');
      return;
    }

    try {
      // Attempt to create reservation via API
      await createReservation(formData);
      setMessage('Reservation successful!');

      // Reset form
      setFormData({ room: '', start_time: '', end_time: '' });
    } catch (err) {
      // Handle specific error responses
      if (err.response?.data?.detail) {
        setMessage(`Error: ${err.response.data.detail}`);
      } else if (err.response?.data) {
        const errors = Object.entries(err.response.data)
          .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
          .join(' | ');
        setMessage(`Error: ${errors}`);
      } else {
        setMessage('Reservation failed.');
      }
    }
  };

  return (
    <div>
      <h2>Make a Reservation</h2>

      {/* Display feedback message */}
      {message && <p>{message}</p>}

      {/* Reservation form */}
      <form onSubmit={handleSubmit}>
        <label>
          Room:
          <select
            name="room"
            value={formData.room}
            onChange={handleChange}
            required
          >
            <option value="">Select a room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} (Capacity: {room.capacity})
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Start Time:
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          End Time:
          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Book Room</button>
      </form>
    </div>
  );
};

// Export the ReservationForm component
export default ReservationForm;
