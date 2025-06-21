import React, { useEffect, useState } from 'react';
import { getRooms, createReservation } from '../services/api';
import { getToken } from '../services/auth';

const ReservationForm = () => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    room: '',
    start_time: '',
    end_time: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    getRooms()
      .then((res) => setRooms(res.data))
      .catch((err) => console.error('Error loading rooms:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      setMessage('You must be logged in to make a reservation.');
      return;
    }

    try {
      await createReservation(formData);
      setMessage('Reservation successful!');
      setFormData({ room: '', start_time: '', end_time: '' });
    } catch (err) {
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
      {message && <p>{message}</p>}
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

export default ReservationForm;
