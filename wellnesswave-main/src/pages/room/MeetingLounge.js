import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAppointment, updateAppointmentStatus } from "../../redux/actions/appointmentActions/appointmentActions";
import { useDispatch, useSelector } from "react-redux";

const MeetingLounge = () => {
  const { appointmentId } = useParams();
  const move = useNavigate();
  const dispatch = useDispatch()

  const counsellor = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const counsellorAppointments = useSelector(state => state?.appointments?.counsellorAppointments)

  const [appointmentData, setAppointmentData] = useState();
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleJoining = async (appointmentId, counsellorId, userId, appointment) => {
    dispatch(updateAppointmentStatus(token, appointmentId, counsellorAppointments ))
    await getAppointment()
    handleJoinRoom(appointmentId, counsellorId, userId, appointment)
  }

  const handleJoinRoom = useCallback((roomId, counsellorId, userId, appointment) => {
    // A request to backend that would set status of appointment to
    move(
      `/room-page/${roomId}/${counsellorId}/${userId}/${appointment.counsellorId.name}/${appointment.userId.contact}`, { state: {appointment}}
    );
  }, []);

  const handleMarkAttendance = async (appointmentId) => {
    console.log(`Marking attendance as ${selectedStatus} for appointment ${appointmentId}`);
    await dispatch(updateAppointmentStatus(token, appointmentId, counsellorAppointments, selectedStatus ));

    await getAppointment()
  };

  const getAppointment = async () => {
    const result = await fetchAppointment(token, appointmentId);
    console.log(result)
    if (result.success) setAppointmentData(result.appointment);
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        if (counsellor && token) {
          await getAppointment();
        }
      } catch (error) {
        console.error("Error Fetching Appointment:", error);
      }
    };

    fetchAppointment();
  }, []);


  return (
    <>
     <div className="flex relative top-[100px] justify-center p-4">
      {appointmentData?.status === "Coming" && (
        <button
          onClick={() => handleJoining(appointmentData._id, counsellor._id, appointmentData.userId._id, appointmentData)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go To Room & share link with {appointmentData?.userId.name}
        </button>
      )}

      {appointmentData?.status === "Ongoing" && (
        <>
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="bg-white border border-gray-300 px-2 py-1 rounded"
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <button
            onClick={() => handleMarkAttendance(appointmentData._id)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            disabled={!selectedStatus}
          >
            Mark Attendance
          </button>
        </>
      )}

      {appointmentData?.status === "Passed" && (
        <button
          onClick={() => move("/counsellor-home")}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Appointments
        </button>
      )}
    </div>
    </>
  );
};

export default MeetingLounge;
