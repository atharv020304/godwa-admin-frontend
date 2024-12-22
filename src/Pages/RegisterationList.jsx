
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../css/RegisterDetails.css';

const RegisterationList = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [registrationDetails, setRegistrationDetails] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const response = await fetch('http://localhost:4000/api/v1/event/getevent');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Event Details:", data);
        setEventDetails(data[0]); 
      } catch (error) {
        setError(error.message);
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEventDetails();
  }, []); 

  useEffect(() => {
    async function fetchRegistrationDetails() {
      if (!eventDetails || !eventDetails._id) return; 
      try {
        const result = await fetch(`http://localhost:4000/api/v1/event/getallvisitors/${eventDetails._id}`, {
          credentials: 'include',
        });
        if (!result.ok) {
          throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const data = await result.json();
        console.log("Fetched Registration Details:", data);

        if (data && Array.isArray(data.visitors)) {
          setRegistrationDetails(data.visitors); 
        } else {
          console.error("Invalid data format received for registration details");
        }
      } catch (error) {
        console.error('Error fetching registration details:', error);
      }
    }

    fetchRegistrationDetails();
  }, [eventDetails]); 

  if (loading) {
    return <div className="visitor-registration">Loading event details...</div>;
  }

  if (error) {
    return <div className="visitor-registration">Error: {error}</div>;
  }

  return (
    <div className="visitor-registration">
      {eventDetails ? (
        <>
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
              View Registrations
            </Link>
          </div>

          {registrationDetails.length > 0 ? (
            <div className="registration-details">
              <h2>Registration Details</h2>
              <ol>
                {registrationDetails.map((visitor, index) => (
                  <li key={visitor._id}>
                    <p><strong>Name:</strong> {visitor.name}</p>
                    <p><strong>Organization:</strong> {visitor.organizationName || "N/A"}</p>
                    <p><strong>Designation:</strong> {visitor.designation || "N/A"}</p>
                    <p><strong>Phone:</strong> {visitor.phone}</p>
                    <p><strong>Email:</strong> {visitor.email}</p>
                    <p><strong>City:</strong> {visitor.city || "N/A"}</p>
                    <p><strong>Source:</strong> {visitor.source}</p>
                    {visitor.source === "Other" && (
                      <p><strong>Other Source Details:</strong> {visitor.otherSourceDetails}</p>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <p>No registrations available.</p>
          )}
        </>
      ) : (
        <p>No event details available.</p>
      )}
    </div>
  );
};

export default RegisterationList;
