import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom";

export default function EventForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [status, setStatus] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [day, setDay] = useState("");

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [maxAttendeesError, setMaxAttendeesError] = useState("");
  const [imageError, setImageError] = useState("");
  const [mapError, setMapError] = useState("");
  const [dayError, setDayError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTitleError("");
    setDescriptionError("");
    setDateError("");
    setTimeError("");
    setLocationError("");
    setMaxAttendeesError("");
    setImageError("");
    setDayError("");

    let hasError = false;

    if (!title) {
      setTitleError("Title is required.");
      hasError = true;
    }
    if (!description) {
      setDescriptionError("Description is required.");
      hasError = true;
    }
    if (!date) {
      setDateError("Date is required.");
      hasError = true;
    }
    if (!time) {
      setTimeError("Time is required.");
      hasError = true;
    }
    if (!location) {
      setLocationError("Location is required.");
      hasError = true;
    }
    if (!maxAttendees || isNaN(maxAttendees) || maxAttendees <= 0) {
      setMaxAttendeesError("Max attendees must be a positive number.");
      hasError = true;
    }
    if (!imageUrl) {
      setImageError("Image URL is required.");
      hasError = true;
    }

    if (!mapUrl) {
      setMapError("Map URL is required.");
      hasError = true;
    } else if (!/^https?:\/\/.+/.test(mapUrl)) {
      setMapError("Invalid URL format.");
      hasError = true;
    }

    if (!day) {
      setDayError("Please select a day of the week.");
      hasError = true;
    }

    if (hasError) return;

    const newEvent = {
      title,
      description,
      date,
      location,
      maxAttendees: Number(maxAttendees),
      status,
      imageUrl,
      mapUrl,
      time,
      day,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/event",
        newEvent
      );

      if (response.status === 201) {
        toast.success("Event created successfully!");
        setSuccess(true);
        setTitle("");
        setDescription("");
        setDate("");
        setTime("");
        setLocation("");
        setMaxAttendees("");
        setStatus("upcoming");
        setImageUrl("");
        setMapUrl("");
        setDay("");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create event.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Create a New Event
      </h1>
      {success && <p className="text-green-500">Event created successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {titleError && <p className="text-red-500">{titleError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {descriptionError && (
            <p className="text-red-500">{descriptionError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {dateError && <p className="text-red-500">{dateError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Day of the Week:
          </label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          {dayError && <p className="text-red-500">{dayError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a Status</option>
            <option value="Business">Business</option>
            <option value="Music">Music</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Award">Award</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Location:
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {locationError && <p className="text-red-500">{locationError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Max Attendees:
          </label>
          <input
            type="number"
            value={maxAttendees}
            onChange={(e) => setMaxAttendees(e.target.value)}
            min="1"
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {maxAttendeesError && (
            <p className="text-red-500">{maxAttendeesError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Time:
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {timeError && <p className="text-red-500">{timeError}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image URL:
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {imageError && <p className="text-red-500">{imageError}</p>}
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
          <label className="block text-sm font-medium text-gray-700">
            Map URL:
          </label>
          <input
            type="text"
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
            placeholder="Enter map URL"
            className="mt-1 block w-full border border-gray-300 bg-gray-50 text-gray-800 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          {mapError && <p className="text-red-500">{mapError}</p>}
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
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
