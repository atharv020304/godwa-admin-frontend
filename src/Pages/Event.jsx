import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../css/Event.css';

const Event = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:4000/api/v1/event/getevent');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
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
          <h2>Event Details</h2>
          <p><strong>Event Name:</strong> {eventDetails.eventName}</p>
          <p><strong>Event Dates:</strong> {eventDetails.eventDates}</p>
          <p><strong>Event Timing:</strong> {eventDetails.eventTime}</p>
          <p><strong>Event Address:</strong> {eventDetails.eventAddress}</p>

          <Link to="/update-event" className="update-event-button">
            Update Event
          </Link>
          <Link to="/registerationdetails" className="update-event-button">
            View Registerations
          </Link>
        </div>
      ) : (
        <p>No event details available.</p>
      )}
    </div>
  );
};

export default Event;
