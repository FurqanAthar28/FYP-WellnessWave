// UserProfile.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';

const UserProfile = ({ personalInfo, pendingAppointments, doneAppointments }) => {
  // Check if arrays are defined before using map
  // const chartOptions = {
  //   scales: {
  //     x: {
  //       type: 'category',
  //       labels: progressData.map(entry => entry.date),
  //     },
  //     y: {
  //       type: 'linear', // or 'category' based on your data type
  //     },
  //   },
  // };
  
  // const chartData = progressData ? {
  //   labels: progressData.map(entry => entry.date),
  //   datasets: [
  //     {
  //       label: 'Progress Over Time',
  //       data: progressData.map(entry => entry.progress),
  //       fill: false,
  //       borderColor: 'rgb(75, 192, 192)',
  //     },
  //   ],
  // } : null;

  const pendingAppointmentsList = pendingAppointments ? (
    <div className="w-1/2 pr-4">
      <h3 className="text-xl font-bold mb-2">Pending Appointments</h3>
      <ul>
        {pendingAppointments.map(appointment => (
          <li key={appointment.id}>{appointment.date} - {appointment.time}</li>
        ))}
      </ul>
    </div>
  ) : null;

  const doneAppointmentsList = doneAppointments ? (
    <div className="w-1/2 pl-4">
      <h3 className="text-xl font-bold mb-2">Done Appointments</h3>
      <ul>
        {doneAppointments.map(appointment => (
          <li key={appointment.id}>{appointment.date} - {appointment.time}</li>
        ))}
      </ul>
    </div>
  ) : null;

  return (
    <div className="container mx-auto mt-8">
      {/* Personal Information */}
      <div className="bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
        <p><strong>Name:</strong> {personalInfo.name}</p>
        <p><strong>Roll Number:</strong> {personalInfo.rollNumber}</p>
        <p><strong>Email:</strong> {personalInfo.email}</p>
        <p><strong>Contact Number:</strong> {personalInfo.contactNumber}</p>
      </div>

      {/* Progress Chart */}
      {/* {chartData && (
        <div className="bg-gray-100 p-4 mt-4">
          <h2 className="text-2xl font-bold mb-2">Progress Chart Over Time</h2>
          <Line data={chartData} />
        </div>
      )} */}

      {/* Appointments */}
      {pendingAppointmentsList}
      {doneAppointmentsList}
    </div>
  );
};

export default UserProfile;
