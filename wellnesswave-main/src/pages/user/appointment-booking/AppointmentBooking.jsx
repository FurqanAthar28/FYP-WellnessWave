import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createAppointment, deleteAppointment, fetchAllAppointments } from "../../../redux/actions/appointmentActions/appointmentActions";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../components/common/toasts/Toast";

const AppointmentPage = () => {

  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user")) 
  const token = localStorage.getItem("token") 

  // redux states
  const appointments = useSelector(state => state?.appointments?.appointments)
  const userAppointments = useSelector(state => state?.appointments?.userAppointments)

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
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

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7); // Add 7 days to get to next week
  const fridayIndex = 5; // Friday is the 5th day of the week (0-indexed)
  const daysUntilFriday = (fridayIndex + 7 - nextWeek.getDay()) % 7; // Calculate days until next Friday
  const maxDate = new Date(nextWeek.setDate(nextWeek.getDate() + daysUntilFriday));

  // Functions to store date & time
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const startTime = new Date(`${formattedDate} ${selectedTime}`);
      const endTime = new Date(startTime.getTime() + 29 * 62060); // Adding 29 minutes (29 * 60000 milliseconds) to startTime

      const currentDate = new Date(); // Get the current date and time

      console.log(new Date());
      console.log(startTime);
      console.log(endTime);

      if (currentDate > startTime) {
          showToast("Time has passed can't book now.","error");
          return;
      }
      const newAppointment = {
        userId: user._id,
        date: formattedDate,
        startTime,
        endTime,
        counsellorId: user.counsellorId,
      };

      console.log("Appointment", newAppointment)
      await dispatch(createAppointment(newAppointment, appointments, token))
      // setBookedAppointments([...bookedAppointments, newAppointment]);
      setSelectedDate(null);
      setSelectedTime("09:00 AM");
      await getAppointments()
    }
  };

  const handleCancel = async (id) => {
    await dispatch(deleteAppointment(id, token, appointments))
    await getAppointments()
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

  // Function to make weekends unavailable to select in datepicker
  const isWeekday = (date) => {
    const day = date.getDay();
    // Return true for weekdays (Monday-Friday)
    return day > 0 && day < 6;
  };
  
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

  useEffect(() => {

    if(selectedDate !== null){
      const appointmentsOnSelectedDate = appointments?.filter((appointment) => formatDate(selectedDate,0) === formatDate(appointment.date,1))
      const availableSlot = availableTimes?.filter(
        (time) =>
          !appointmentsOnSelectedDate?.some((appointment) => (formatTime(appointment.startTime) === time))
      );
      setAvailableSlots(availableSlot);
    }
  }, [selectedDate, userAppointments]);

  const getAppointments = async () => {
    dispatch(fetchAllAppointments(token));
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

  return (
    <>
      <div className="h-full flex bg-gray-100">
        <div className="w-full p-8 bg-white rounded-md">
          <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-6">
            Book an Appointment
          </h2>
          <div className="mb-6 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex">
              <label className="block text-2xl mt-2 text-indigo-800 font-semibold text-gray-600 ">
                Select Date:
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
                maxDate={maxDate}
                filterDate={isWeekday}
                dateFormat="MMMM d, yyyy"
                className="w-[200px] h-[51px] p-3 mx-2 border rounded-lg border-2 border-gray-600 shadow-xl focus:outline-none focus:ring focus:border-blue-300 hover:border-blue-200"
                placeholderText="Select a date"
              />
            </div>
            <div className="w-full md:w-1/2 flex mt-4 md:mt-0">
              <label className="block text-2xl mt-2 text-indigo-800 font-semibold text-gray-600 mb-0">
                Select Time:
              </label>
              <select
                value={selectedTime}
                onChange={handleTimeChange}
                placeholder="Select time slot"
                className="w-[200px] h-[51px] p-3 mx-2 relative px-3 border rounded-lg border-2 border-gray-600 shadow-xl focus:border-blue-300 hover:border-blue-200"
              >
                {availableSlots?.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-4 md:mt-0 w-[200px] h-[52px] bg-blue-500 text-white p-1 rounded-md shadow-xl hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-300"
            >
              Book!
            </button>
          </div>

          {userAppointments?.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-indigo-800 mb-2">
                Booked Appointments:
              </h3>
              <table className="w-full border-collapse border border-gray-800">
                <thead className="text-white">
                  <tr className="bg-indigo-800">
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Starting Time</th>
                    <th className="border p-2">Ending Time</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userAppointments
                  .sort((a, b) => new Date(a.startTime) - new Date(b.startTime)) // Sort appointments by date
                  .map((appointment, index) => (
                    <tr key={index}>
                      <td className="border pl-[50px] py-[5px]">{formatDate(appointment.date, 1)}</td>
                      <td className="border pl-[50px] py-[5px]">{formatTime(appointment.startTime)}</td>
                      <td className="border pl-[50px] py-[5px]">{formatTime(appointment.endTime)}</td>
                      <td className="border pl-[50px] py-[5px]">
                        <>
                          <button
                            onClick={() => handleCancel(appointment._id)}
                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                          >
                            Cancel
                          </button>
                          {appointment.status === 'Coming' && (
                            <>
                              {(adjustDateByHours(appointment.startTime, 5) > new Date()) && (
                                <button className="ml-[20px] bg-gray-300 px-2 py-1">Wait</button>
                              )}
                              {(adjustDateByHours(appointment.startTime, 5) <= new Date() && adjustDateByHours(appointment.endTime, 5) >= new Date()) && (
                                <button className="ml-[20px] bg-blue-500 text-white px-2 py-1">Wait for meeting link.</button>
                              )}
                            </>
                          )}
                        </>                        
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
};

export default AppointmentPage;
