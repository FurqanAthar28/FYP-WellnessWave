import React, { useCallback, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {fetchAllCounsellorAppointments } from "../../../redux/actions/appointmentActions/appointmentActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CounsellorAppointments = () => {
  const dispatch = useDispatch()
  const move = useNavigate()
  const user = JSON.parse(localStorage.getItem("user")) 
  const token = localStorage.getItem("token") 

  // redux states
  const counsellorAppointments = useSelector(state => state?.appointments?.counsellorAppointments)

  console.log("Counsellor Appointments", counsellorAppointments);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([])

  const availableTimes = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ];

  // Functions to format date and times in table
  const formatDate = (dateString, deductDays) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() - deductDays)
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };
  
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    time.setHours(time.getHours() - 5)
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(time);
  };

  // Function to adjust date by a specified number of hours
  const adjustDateByHours = (dateString, hours) =>{
    // Parse the input date string into a Date object
    const date = new Date(dateString);
    
    // Adjust the date by subtracting the specified number of hours
    date.setHours(date.getHours() - hours);
    
    // Return the adjusted date
    return date;
  }
  useEffect(() => {

    if(selectedDate !== null){
      const appointmentsOnSelectedDate = counsellorAppointments?.filter((appointment) => formatDate(selectedDate,0) === formatDate(appointment.date,1))
      console.log(appointmentsOnSelectedDate)
      const availableSlot = availableTimes?.filter(
        (time) =>
          !appointmentsOnSelectedDate?.some((appointment) => (formatTime(appointment.startTime) === time))
      );
      setAvailableSlots(availableSlot);

    }
  }, [selectedDate, counsellorAppointments]);
  console.log("Counsellor Appointments", counsellorAppointments)

  const getAppointments = async () => {
    dispatch(fetchAllCounsellorAppointments(token, user._id));
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (user && token) {
          await getAppointments();
        }
      } catch (error) {
        console.error("Error Fetching Appointments:", error);
      }
    };
    fetchAppointments()
  }, [])

  const handleJoinRoom = useCallback((roomId, counsellorId, userId, appointment) => {
      move(`/room-page/${roomId}/${counsellorId}/${userId}/${appointment.counsellorId.name}`, { state: {appointment}})
  },[])  
  
  const handleJoinLounge = (roomId) => {
      move(`/meeting-lounge/${roomId}`)
  } 

  return (
    <>
      <div className=" flex w-full bg-gray-100">
        <div className="w-full p-8 bg-white rounded-md">
          <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-6">
            Your Appointments Today
          </h2>

          {counsellorAppointments?.length > 0 ? (
            <div className="mt-8">
              <table className="w-full border-collapse border border-gray-800">
                <thead className="text-white">
                  <tr className="bg-indigo-800">
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Starting Time</th>
                    <th className="border p-2">Ending Time</th>
                    <th className="border p-2">Person</th>
                    <th className="border p-2">Contact</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {counsellorAppointments
                  .sort((a, b) => new Date(a.startTime) - new Date(b.startTime)) // Sort appointments by date
                  .map((appointment, index) => (
                    <tr key={index}>
                      <td className="border pl-[50px] py-[5px]">{formatDate(appointment.date, 1)}</td>
                      <td className="border pl-[50px] py-[5px]">{formatTime(appointment.startTime)}</td>
                      <td className="border pl-[50px] py-[5px]">{formatTime(appointment.endTime)}</td>
                      <td className="border pl-[50px] py-[5px]">{appointment.userId.name} </td>
                      <td className="border pl-[50px] py-[5px]">{appointment.userId.contact} </td>
                      <td className="border pl-[50px] py-[5px]">
                      {appointment.status === 'Coming' && (
                        <>
                          {(adjustDateByHours(appointment.startTime, 5) > new Date()) && (
                            <button onClick={() => handleJoinLounge(appointment._id, user._id, appointment.userId._id, appointment)} className="bg-gray-300 px-2 py-1">Wait</button>
                          )}
                          {(adjustDateByHours(appointment.startTime, 5) <= new Date() && adjustDateByHours(appointment.endTime, 5) >= new Date()) && (
                            <button onClick={() => handleJoinLounge(appointment._id)} className="bg-blue-500 text-white px-2 py-1">Go To Meeting Lounge</button>
                          )}
                        </>
                      )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-8 text-gray-600">No appointments booked yet.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default CounsellorAppointments