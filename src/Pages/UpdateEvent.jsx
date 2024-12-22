
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/UpdateEvent.css';

const UpdateEvent = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [formData, setFormData] = useState({
    eventName: '',
    eventDates: '',
    eventTime: '',
    eventAddress: '',
    acceptResponses: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:4000/api/v1/event/getevent');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEventDetails(data[0]); 
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/v1/event/update/${eventDetails._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert('Event updated successfully!');
      navigate('/review-event');
    } catch (err) {
      alert(`Error updating event: ${err.message}`);
    }
  };

  if (loading) {
    return <div className="visitor-registration">Loading event details...</div>;
  }

  if (error) {
    return <div className="visitor-registration">Error: {error}</div>;
  }

  return (
    <div className="visitor-registration">
      {eventDetails ? (
        <div className="event-info-card">
          <h2>Update Event Details</h2>
          <form onSubmit={handleSubmit} className="update-form">
            <label>
              Event Name: <span className="required">*</span>
              <input
                type="text"
                name="eventName"
                value={formData.eventName || ''}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Event Dates: <span className="required">*</span>
              <input
                type="text"
                name="eventDates"
                value={formData.eventDates || ''}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Event Time: <span className="required">*</span>
              <input
                type="text"
                name="eventTime"
                value={formData.eventTime || ''}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Event Address: <span className="required">*</span>
              <textarea
                name="eventAddress"
                value={formData.eventAddress || ''}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">Update Event</button>
          </form>
        </div>
      ) : (
        <p>No event details available.</p>
      )}
    </div>
  );
};

export default UpdateEvent;






