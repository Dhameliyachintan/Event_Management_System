import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventsList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/event");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    navigate("/about", { state: { event } });
  };

  const filteredEvents = events.filter((event) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const matchesSearchTerm =
      event.title.toLowerCase().includes(lowerCaseTerm) ||
      event.description.toLowerCase().includes(lowerCaseTerm) ||
      event.location.toLowerCase().includes(lowerCaseTerm) ||
      event.status.toLowerCase().includes(lowerCaseTerm) ||
      event.day.toLowerCase().includes(lowerCaseTerm) ||
      (event.maxAttendees && event.maxAttendees.toString().includes(lowerCaseTerm));

    return matchesSearchTerm;
  });

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
        Event List
      </h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search events by title, description, location, status, day, or max attendees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg w-full p-2 mb-2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEvents.length === 0 ? (
          <div className="text-gray-600 dark:text-gray-400 text-center">
            No events available.
          </div>
        ) : (
          filteredEvents.map((event, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-lg bg-white dark:bg-gray-900 p-4 cursor-pointer"
              onClick={() => handleEventClick(event)}
            >
              <h3 className="font-bold text-lg mb-2">{event.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {event.description}
              </p>
              <p className="mt-1">
                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="mt-1">
                <strong>Day:</strong> {event.day}
              </p>
              <p className="mt-1">
                <strong>Time:</strong> {event.time}
              </p>
              <p className="mt-1">
                <strong>Max Attendees:</strong> {event.maxAttendees}
              </p>
              <p className="mt-1">
                <strong>Status:</strong> {event.status}
              </p>
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="mt-2 rounded-lg w-full h-auto"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsList;
