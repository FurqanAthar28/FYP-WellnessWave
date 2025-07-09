import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import { showToast } from "../components/common/toasts/Toast";

const Permissions = ({perProp}) => {

  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Function to check if user has the required permissions
  const hasPermission = () => {
    if (user && token) {
      
      if(user.role === 'admin')
      {
        let adminPermission = ['admin']
        if(Array.isArray(perProp)) {

          if(perProp.some((permission) => adminPermission.includes(permission))) {
            return true;
          }
        }
        else{
          showToast('Access Denied.', 'info')
          return false;
        }
      }
      showToast('Access Denied.', 'info')
      return false;
    }
    // User or token is missing, no permissions
    showToast('Access Denied', 'info')
    return false;
  };

  return (
    hasPermission()? <Outlet /> : (
      <Navigate
        to="/"
        state={{ from: location }}
        replace
      />
    )
  );
};

export default Permissions;
