// Import React and useState hook for managing component state
import React, { useState } from 'react';

// Import the API function to update a reservation
import { updateReservation } from '../services/api';

// EditReservation component receives a reservation object and handlers for update/cancel actions
const EditReservation = ({ reservation, onUpdate, onCancel }) => {
  // Initialize form state with the reservation's current start and end times
  const [formData, setFormData] = useState({
    start_time: reservation.start_time,
    end_time: reservation.end_time,
  });

  // Handle changes in the input fields and update form state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to update the reservation via API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt to update the reservation
      await updateReservation(reservation.id, formData);
      // Notify parent to refresh data or close the editor
      onUpdate();
    } catch (err) {
      // Log and alert on failure
      console.error('Failed to update reservation', err);
      alert('Failed to update reservation.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Reservation (Date/Time only)</h3>

      {/* Input for start time */}
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

      {/* Input for end time */}
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

      {/* Submit and cancel buttons */}
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

// Export the component for use in other parts of the app
export default EditReservation;
