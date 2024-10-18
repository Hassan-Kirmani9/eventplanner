import React from 'react';

interface EventTableProps {
  eventName: string;
  eventUsers: string[];
}

const EventTable: React.FC<EventTableProps> = ({ eventName, eventUsers }) => {
  return (
    <div className="border border-stroke p-6.5 rounded-sm shadow-default dark:border-strokedark dark:bg-boxdark">
      <h3 className="font-medium text-black dark:text-white mb-4">
        Event Details Table
      </h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Event Name</th>
            <th className="px-4 py-2 border">Event Users</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">{eventName || 'No event name'}</td>
            <td className="px-4 py-2 border">
              {eventUsers.length > 0 ? eventUsers.join(', ') : 'No users selected'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
