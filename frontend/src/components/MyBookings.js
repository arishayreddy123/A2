import React, { useEffect, useState } from 'react';
import {
  getReservations,
  updateReservation,
  deleteReservation,
} from '../services/api';

const MyBookings = () => {
  const [reservations, setReservations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ start_time: '', end_time: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await getReservations();
      setReservations(res.data);
    } catch (err) {
      setMessage('Failed to load reservations');
    }
  };

  const handleEdit = (res) => {
    setEditId(res.id);
    setEditData({ start_time: res.start_time, end_time: res.end_time });
  };

  const handleSave = async (id) => {
    try {
      await updateReservation(id, editData);
      setMessage('Reservation updated successfully');
      setEditId(null);
      fetchReservations();
    } catch (err) {
      setMessage('Failed to update reservation');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReservation(id);
      setMessage('Reservation deleted');
      fetchReservations();
    } catch (err) {
      setMessage('Error deleting reservation');
    }
  };

  return (
    <div>
      <h2>My Bookings</h2>
      {message && <p>{message}</p>}
      <ul>
        {reservations.map((res) => (
          <li key={res.id}>
            {editId === res.id ? (
              <>
                Start: <input type="datetime-local" value={editData.start_time} onChange={(e) => setEditData({...editData, start_time: e.target.value })} />
                End: <input type="datetime-local" value={editData.end_time} onChange={(e) => setEditData({...editData, end_time: e.target.value })} />
                <button onClick={() => handleSave(res.id)}>Save</button>
              </>
            ) : (
              <>
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

export default MyBookings;
