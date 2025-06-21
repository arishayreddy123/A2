import React, { useState } from 'react';
import { updateReservation } from '../services/api';

const EditReservation = ({ reservation, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    start_time: reservation.start_time,
    end_time: reservation.end_time,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReservation(reservation.id, formData);
      onUpdate(); // Refresh list or close modal
    } catch (err) {
      console.error('Failed to update reservation', err);
      alert('Failed to update reservation.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Reservation (Date/Time only)</h3>

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

      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditReservation;
