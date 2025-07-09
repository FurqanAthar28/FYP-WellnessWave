import axios from "axios";
import { serverUrl } from "../../../ServerLink";
import { showToast } from "../../../components/common/toasts/Toast";

// Function to adjust date by a specified number of hours
const adjustDateByHours = (dateString, hours) =>{
  // Parse the input date string into a Date object
  const date = new Date(dateString);
  
  // Adjust the date by subtracting the specified number of hours
  date.setHours(date.getHours() - hours);
  
  // Return the adjusted date
  return date;
}

export const fetchAllAppointments = (token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "APPOINTMENTS_REQUEST" });

      const response = await axios.get(`${serverUrl}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("All Appointments", response.data.appointments);
    
      const user = JSON.parse(localStorage.getItem("user"));
      if (response.status === 200) {
        const { appointments } = response.data;
        const today = new Date();
        const userAppointments = appointments.filter(
          (app) => app.userId === user._id && adjustDateByHours(app.startTime, 5) >= today
        );
        // today.setHours(0, 0, 0, 0); // Set time to start of the day
        console.log("Appointment Date", new Date(userAppointments[0]?.date))
        console.log("Start Date", new Date(userAppointments[0]?.startTime))
        console.log("End Date", new Date(userAppointments[0]?.endTime))
        console.log("Current Date", new Date())
        
        dispatch({
          type: "APPOINTMENTS_SUCCESS",
          payload: { appointments, userAppointments },
        });
      } else {
        dispatch({
          type: "APPOINTMENTS_FAILURE",
          payload: { error: response.data.message },
        });
      }
    } catch (error) {
      console.error("Error fetching Appointments:", error);
      dispatch({
        type: "APPOINTMENTS_FAILURE",
        payload: { error: "Error fetching Appointments:" },
      });
    }
  };
};

export const fetchAllUserAppointmentsForToday = (token, userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "APPOINTMENTS_REQUEST" });

      const response = await axios.get(`${serverUrl}/appointments/user-today/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("All Appointments", response.data.appointments);
    
      if (response.status === 200) {
        const { appointments, userAppointments } = response.data;

        dispatch({
          type: "APPOINTMENTS_SUCCESS",
          payload: { appointments, userAppointments },
        });
      } else {
        dispatch({
          type: "APPOINTMENTS_FAILURE",
          payload: { error: response.data.message },
        });
      }
    } catch (error) {
      console.error("Error fetching Appointments:", error);
      dispatch({
        type: "APPOINTMENTS_FAILURE",
        payload: { error: "Error fetching Appointments:" },
      });
    }
  };
};

export const fetchAllCounsellorAppointments = (token, counsellorId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "COUNSELLOR_APPOINTMENTS_REQUEST" });

      const response = await axios.get(`${serverUrl}/appointments/counsellor/${counsellorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("All Counsellor Appointments", response.data.counsellorAppointments);
      if (response.status === 200) {
        const { counsellorAppointments } = response.data;
        dispatch({
          type: "COUNSELLOR_APPOINTMENTS_SUCCESS",
          payload: { counsellorAppointments },
        });
      } else {
        dispatch({
          type: "COUNSELLOR_APPOINTMENTS_FAILURE",
          payload: { error: response.data.message },
        });
      }
    } catch (error) {
      console.error("Error fetching Appointments:", error);
      dispatch({
        type: "COUNSELLOR_APPOINTMENTS_FAILURE",
        payload: { error: "Error fetching Appointments:" },
      });
    }
  };
};

export const createAppointment = (data, appointments, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "APPOINTMENTS_REQUEST" });

      const response = await axios.post(`${serverUrl}/appointments`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        const { appointment } = response.data;
        // Dispatch success action if needed
        let updatedAppointments = [...appointments, appointment];

        dispatch({
          type: "APPOINTMENTS_SUCCESS",
          payload: updatedAppointments,
        });
        showToast(response.data.message, "success");
      }
    } catch (error) {
      console.error("Error creating Appointments:", error);
      dispatch({
        type: "APPOINTMENTS_FAILURE",
        payload: {
          error:
            error.response?.data?.message || "Error creating Appointments:",
        },
      });
      showToast(
        error.response?.data?.message || "Error creating Appointments:",
        "error"
      );
    }
  };
};

export const deleteAppointment = (id, token, appointments) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "APPOINTMENTS_REQUEST" });
      const response = await axios.delete(`${serverUrl}/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response for delete", response);

      const user = JSON.parse(localStorage.getItem("user"));
      if (response.status === 200) { 
        appointments = appointments.filter((appointment) => appointment._id !== id)

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to start of the day

        const userAppointments = appointments.filter(
          (app) => app.userId === user._id && new Date(app.date) >= today
        );
          
        dispatch({
          type: "APPOINTMENTS_SUCCESS",
          payload: { appointments, userAppointments },
        });
        showToast(response.data.message, "success");
      }
    } catch (error) {
      dispatch({
        type: "APPOINTMENTS_FAILURE",
        payload: { error: "Error deleting user appointments:" },
      });
      showToast(
        error.response?.data?.message || "Error deleting user appointments:",
        "error"
      );
    }
  }
};

export const fetchUserAppointments = async (token, userId) => {
  try {
    const response = await axios.get(`${serverUrl}/appointments/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      const { userAppointments } = response.data;
      return {success: true, userAppointments}
    } else {
      return {success: false}
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return {success: false}
  }
};

export const fetchAllCounsellorAppointmentsForAdmin = async (token, userId) => {
  try {
    const response = await axios.get(`${serverUrl}/appointments/all-counsellor/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      const { counsellorAppointments } = response.data;
      return {success: true, counsellorAppointments}
    } else {
      return {success: false}
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return {success: false}
  }
};

export const fetchAppointment = async (token, appointmentId) => {
  try {
    const response = await axios.get(`${serverUrl}/appointments/${appointmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data)
    if (response.status === 200) {
      const { appointment } = response.data;
      return {success: true, appointment}
    } else {
      return {success: false}
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return {success: false}
  }
};

export const updateAppointmentStatus = (token, appointmentId, counsellorAppointments, attendance ) => {
  return async (dispatch) => {
    try {
        dispatch({ type: "COUNSELLOR_APPOINTMENTS_REQUEST" });
  
         // Conditionally construct the query string
      const queryString = attendance ? `?attendance=${attendance}` : "";

      const response = await axios.patch(`${serverUrl}/appointments/status/${appointmentId}${queryString}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Counsellor Appointment:", response.data.appointment);

      if (response.status === 200) {
        const { appointment } = response.data;
        
        // Find the appointment in the appointments array by appointmentId
        let index = counsellorAppointments.findIndex((obj) => obj._id === appointmentId);

        // If the appointment is found, update its status and attendance if present
        if (index !== -1) {
          counsellorAppointments[index].status = appointment.status;
          if (attendance) {
            counsellorAppointments[index].attendance = appointment.attendance;
          }
        }

          dispatch({
            type: "COUNSELLOR_APPOINTMENTS_SUCCESS",
            payload: { counsellorAppointments },
          });
        } 
        else {
          dispatch({
            type: "COUNSELLOR_APPOINTMENTS_FAILURE",
            payload: { error: response.data.message },
          });
        }
      } catch (error) {
        console.error("Error Changing Appointment Status to Ongoing:", error);
        dispatch({
          type: "COUNSELLOR_APPOINTMENTS_FAILURE",
          payload: { error: "Error Changing Appointment Status to Ongoing:" },
        });
      }
  };
}