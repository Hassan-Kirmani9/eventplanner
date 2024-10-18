import React, { useState } from 'react';
import { Eye, Pencil, Trash, FilePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


// Mock data for demonstration
const initialEvents = [
  { id: 'EVT001', name: 'Conference 2023' },
  { id: 'EVT002', name: 'Product Launch' },
  { id: 'EVT003', name: 'Annual Gala' },
  { id: 'EVT004', name: 'Workshop Series' },
  { id: 'EVT005', name: 'Charity Run' },
];

// Modal component for viewing event details
const ViewEventModal = ({ isOpen, onClose, event }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-4 w-96">
          <h2 className="text-xl font-semibold mb-2">View Event</h2>
          <p className="mb-4">Event ID: {event?.id}</p>
          <p className="mb-4">Event Name: {event?.name}</p>
          <div className="flex justify-end mt-4">
            <button className="bg-gray-300 text-black rounded px-4 py-2" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

// Modal component for editing event details
const EditEventModal = ({ isOpen, onClose, event, onSave }) => {
  const [eventName, setEventName] = useState(event?.name || '');

  const handleSave = () => {
    onSave(event.id, eventName);
    onClose();
  };

  
  
  return (
      isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-4 w-96">
          <h2 className="text-xl font-semibold mb-2">Edit Event</h2>
          <label className="block mb-2">Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="border rounded p-2 w-full"
            />
          <div className="flex justify-end mt-4">
            <button className="mr-2 bg-gray-300 text-black rounded px-4 py-2" onClick={onClose}>
              Cancel
            </button>
            <button className="bg-green-500 text-white rounded px-4 py-2" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default function EventTable() {
    const [events, setEvents] = useState(initialEvents);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const navigate =useNavigate()
    const handleCreateEvent = () => {
    navigate('/create-event');
  };

  const handleCreateForm = () => {
    navigate('/create-event-form');
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setIsViewModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const handleSaveEvent = (id, name) => {
    setEvents(events.map(event => (event.id === id ? { ...event, name } : event)));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Event ID</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Create Form</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 text-sm text-gray-900">{event.id}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{event.name}</td>
              <td className="px-6 py-4 text-sm">
                <div className="flex space-x-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="View"
                    onClick={() => handleViewEvent(event)} // View event
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800"
                    title="Edit"
                    onClick={() => handleEditEvent(event)} // Edit event
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                    onClick={() => handleDeleteEvent(event.id)} // Delete event
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 text-sm">
                <button
                  className="flex w-[10rem] mb-1 justify-center rounded-3xl bg-secondary p-2 font-medium text-gray"
                  onClick={handleCreateForm}
                >
                  <FilePlus className="w-4 h-5 mr-1" />
                  Create Form
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <button
          onClick={handleCreateEvent}
          className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Create Event
        </button>
      </div>

      {/* Modals for viewing and editing events */}
      <ViewEventModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        event={selectedEvent}
      />
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={selectedEvent}
        onSave={handleSaveEvent}
      />
    </div>
  );
}
