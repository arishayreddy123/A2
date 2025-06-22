// Import React hooks for state and lifecycle
import React, { useEffect, useState } from 'react';

// Import API functions for handling reservations
import {
  getReservations,
  updateReservation,
  deleteReservation,
} from '../services/api';

// MyBookings component for viewing, editing, and deleting user reservations
const MyBookings = () => {
  // State to store all reservations
  const [reservations, setReservations] = useState([]);

  // State to track which reservation is currently being edited
  const [editId, setEditId] = useState(null);

  // State to manage form data for editing a reservation
  const [editData, setEditData] = useState({ start_time: '', end_time: '' });

  // State to display feedback messages to the user
  const [message, setMessage] = useState('');

  // Load reservations when component mounts
  useEffect(() => {
    fetchReservations();
  }, []);

  // Fetch reservations from the API
  const fetchReservations = async () => {
    try {
      const res = await getReservations();
      setReservations(res.data);
    } catch (err) {
      setMessage('Failed to load reservations');
    }
  };

  // Enable editing mode for a specific reservation
  const handleEdit = (res) => {
    setEditId(res.id);
    setEditData({ start_time: res.start_time, end_time: res.end_time });
  };

  // Save updated reservation data
  const handleSave = async (id) => {
    try {
      await updateReservation(id, editData);
      setMessage('Reservation updated successfully');
      setEditId(null); // Exit edit mode
      fetchReservations(); // Refresh the list
    } catch (err) {
      setMessage('Failed to update reservation');
    }
  };

  // Delete a reservation
  const handleDelete = async (id) => {
    try {
      await deleteReservation(id);
      setMessage('Reservation deleted');
      fetchReservations(); // Refresh the list
    } catch (err) {
      setMessage('Error deleting reservation');
    }
  };

  return (
    <div>
      <h2>My Bookings</h2>

      {/* Display feedback messages */}
      {message && <p>{message}</p>}

      {/* List of reservations */}
      <ul>
        {reservations.map((res) => (
          <li key={res.id}>
            {/* Show editable form if in edit mode for this reservation */}
            {editId === res.id ? (
              <>
                Start: 
                <input
                  type="datetime-local"
                  value={editData.start_time}
                  onChange={(e) =>
                    setEditData({ ...editData, start_time: e.target.value })
                  }
                />
                End: 
                <input
                  type="datetime-local"
                  value={editData.end_time}
                  onChange={(e) =>
                    setEditData({ ...editData, end_time: e.target.value })
                  }
                />
                <button onClick={() => handleSave(res.id)}>Save</button>
              </>
            ) : (
              <>
                {/* Show reservation info if not in edit mode */}
                {res.room} — {res.start_time} to {res.end_time}
                <button onClick={() => handleEdit(res)}>Edit</button>
                <button onClick={() => handleDelete(res.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the MyBookings component
export default MyBookings;
