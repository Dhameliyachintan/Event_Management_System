import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const EditEventForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};

  const [title, setTitle] = useState(event.title);
  const [locationName, setLocationName] = useState(event.location);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time || "");
  const [description, setDescription] = useState(event.description);
  const [status, setStatus] = useState(event.status);
  const [imageUrl, setImageUrl] = useState(event.imageUrl || "");
  const [mapUrl, setMapUrl] = useState(event.mapUrl || "");
  const [day, setDay] = useState(event.day || "");
  const [maxAttendees, setMaxAttendees] = useState(event.maxAttendees || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = {
      title,
      location: locationName,
      date,
      time,
      description,
      status,
      imageUrl,
      mapUrl,
      day,
      maxAttendees
    };

    try {
      const response = await axios.put(
        `http://localhost:3001/event/${event.id}`,
        updatedEvent
      );
      if (response.status === 200) {
        toast.success("Event updated successfully!");
        navigate(`/about`, { state: { event: { ...event, ...updatedEvent } } });
      }
    } catch (error) {
      console.error("Failed to update event:", error);
      toast.error("Failed to update event.");
    }
  };

  return (
    <div className="container mx-auto mt-6 px-4">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8">
        Edit Event
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-400"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-400"
            htmlFor="location"
          >
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-400"
            htmlFor="date"
          >
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-400"
            htmlFor="day"
          >
            Day:
          </label>
          <select
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200"
            required
          >
            <option value="">Select a Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-400"
            htmlFor="maxAttendees"
          >
            Max Attendees:
          </label>
          <input
            type="number"
            id="maxAttendees"
            value={maxAttendees}
            onChange={(e) => setMaxAttendees(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-400"
            htmlFor="time"
          >
            Time:
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-400"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-400"
            htmlFor="status"
          >
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200"
          >
            <option value="Business">Business</option>
            <option value="Music">Music</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Award">Award</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-400"
            htmlFor="imageUrl"
          >
            Image URL:
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200"
          
          />
          {imageUrl && (
            <div className="mt-2 flex justify-center items-center flex-col">
              <p className="text-sm text-gray-500 pb-4">Image Preview:</p>
              <img
                src={imageUrl}
                alt="Preview"
                className="mt-1 w-full h-auto rounded max-h-[200px] max-w-[200px]"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-400"
            htmlFor="mapUrl"
          >
            Map URL:
          </label>
          <input
            type="url"
            id="mapUrl"
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200"
            placeholder="Enter Google Maps URL"
 
          />
          {mapUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 pb-4">Map Preview:</p>
              <iframe
                src={mapUrl}
                title="Map Preview"
                className="w-full h-[200px] rounded"
                style={{ border: "none" }}
                allowFullScreen
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEventForm;
