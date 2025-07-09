import axios from "axios";
import { serverUrl } from "../../../ServerLink";
import { showToast } from "../../../components/common/toasts/Toast";

export const fetchUsers = (token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "USERS_REQUEST" });

      const response = await axios.get(`${serverUrl}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const { users } = response.data;
        const pendingUsers = users.filter((user) => !user.active);
        const approvedUsers = users.filter((user) => user.active);
        const students = approvedUsers.filter(
          (user) => user.role === "student"
        );
        const faculty = approvedUsers.filter((user) => user.role === "faculty");
        const staff = approvedUsers.filter((user) => user.role === "staff");
        const counsellors = approvedUsers.filter((user) => user.role === "counsellor");
        dispatch({
          type: "USERS_SUCCESS",
          payload: {
            users,
            pendingUsers,
            approvedUsers,
            students,
            faculty,
            staff,
            counsellors,
          },
        });
      } else {
        dispatch({
          type: "USERS_FAILURE",
          payload: { error: response.data.message },
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
};

export const fetchCounsellors = async (token) => {
  return async (dispatch) => {
    try { 
      dispatch({ type: "UPDATE_COUNSELLORS_REQUEST" });

      const response = await axios.get(`${serverUrl}/counsellors`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const { counsellors } = response.data;
        dispatch({
          type: "UPDATE_COUNSELLORS_SUCCESS",
          payload: {
            counsellors
          }
        })
      } else {
        dispatch({
          type: "_UPDATE_COUNSELLORS_FAILURE",
          payload: { error: response.data.message },
        });
      }
    } catch (error) {
      dispatch({
        type: "_UPDATE_USERS_FAILURE",
        payload: { error: 'Error fetching counsellors' },
      });
    }
  }
};

export const fetchOneUser = async (token, userId) => {
    try {
      const response = await axios.get(`${serverUrl}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const { user } = response.data;
        return {success: true, user}
      } else {
        return {success: false}
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return {success: false}
    }
};

export const changePermission = (token, adminId, userId, users) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UPDATE_USERS_REQUEST" });

      // Check if the user is an admin
      let userToUpdate = users.find((obj) => obj._id === userId);

      if (userToUpdate && userToUpdate.role === "admin") {
        // If the user is an admin, notify and return without making changes
        showToast("Cannot change Admin Permissions.", "info");
        return;
      }

      // Make a request to the backend to update user permission
      const response = await axios.post(
        `${serverUrl}/change-permission/${adminId}`,
        { userId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.status === 200) {
        // Find the user in the users array by userId
        let index = users.findIndex((obj) => obj._id === userId);
        // If the user is found, toggle its active state
        if (index !== -1) {
          users[index].active = !users[index].active;
        }
        dispatch({
          type: "UPDATE_USERS_SUCCESS",
          payload: {
            users
          }
        })
        
        showToast(response.data.message, "success");
      } 
      else {
        dispatch({
          type: "_UPDATE_USERS_FAILURE",
          payload: { error: response.data.message },
        });
        showToast(response.data.message, "error");
      }
    } catch (error) {
      dispatch({
        type: "_UPDATE_USERS_FAILURE",
        payload: { error: 'Error handling permission change' },
      });
      showToast("Error handling permission change:", "error");
    }
  }
};

export const assignCounsellorToUser = (token, adminId, userId, counsellorId, users) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "UPDATE_USERS_REQUEST" });

      // Check if the user is an admin
      let userToUpdate = users.find((obj) => obj._id === userId);

      if (userToUpdate && userToUpdate.role === "admin") {
        // If the user is an admin, notify and return without making changes
        showToast("Cannot change Admin Permissions.", "info");
        return;
      }

      // Make a request to the backend to update user permission
      const response = await axios.post(
        `${serverUrl}/assign-counsellor/${adminId}`,
        { userId, counsellorId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.status === 200) {
        // Find the user in the users array by userId
        let index = users.findIndex((obj) => obj._id === userId);
        // If the user is found, toggle its active state
        if (index !== -1) {
          users[index].counsellorId = response.data.user.counsellorId || counsellorId;
        }
        dispatch({
          type: "UPDATE_USERS_SUCCESS",
          payload: {
            users
          }
        })
        
        showToast(response.data.message, "success");
      } 
      else {
        dispatch({
          type: "_UPDATE_USERS_FAILURE",
          payload: { error: response.data.message },
        });
        showToast(response.data.message, "error");
      }
    } catch (error) {
      dispatch({
        type: "_UPDATE_USERS_FAILURE",
        payload: { error: 'Error handling permission change' },
      });
      showToast("Error handling permission change:", "error");
    }
  }
};

