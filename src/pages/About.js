import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};

  if (!event) {
    return (
      <div className="text-center mt-6 text-gray-600 dark:text-gray-400">
        No event data available.
      </div>
    );
  }

  const handleEdit = () => {
    navigate("/editEventForm", { state: { event } });
  };

  const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:3001/event/${event.id}`);
        toast.success("Event deleted successfully!");
        navigate("/eventForm");
      } catch (error) {
        console.error("Error deleting event:", error);
        toast.error("Failed to delete the event. Please try again.");
      }
  };

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8">
        About
      </h2>
      <div className="border rounded-lg shadow-lg bg-white dark:bg-gray-900 p-6">
        {event.imageUrl && (
          <div className="mb-4">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="rounded-lg w-full h-auto"
            />
          </div>
        )}
        <div className="text-start">
          <h3 className="font-bold text-xl mb-3">{event.title}</h3>
          <p className="mt-1">
            <strong>Location:</strong> <br /> {event.location}
            {event.mapUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 pb-4">Map Preview:</p>
                <iframe
                  src={event.mapUrl}
                  title="Map Preview"
                  className="w-full h-[200px] rounded"
                  style={{ border: "none" }}
                  allowFullScreen
                />
              </div>
            )}
          </p>
          <p className="mt-1">
            <strong>Date:</strong> <br />{" "}
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="mt-1">
            <strong>Day:</strong> <br /> {event.day}
          </p>
          <p className="mt-1">
            <strong>Max Attendees:</strong> <br /> {event.maxAttendees || "N/A"}
          </p>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            <strong>Description:</strong> <br /> {event.description}
          </p>
          <p className="mt-1">
            <strong>Status:</strong> {event.status}
          </p>
          <div className="flex justify-between mt-6">
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
