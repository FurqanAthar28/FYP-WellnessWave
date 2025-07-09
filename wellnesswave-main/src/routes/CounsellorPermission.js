import React from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { showToast } from "../components/common/toasts/Toast";

const CounsellorPermission = ({perProp}) => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
  
    // Function to check if user has the required permissions
    const hasPermission = () => {
      if (user && token) {
        if(user.role === 'counsellor')
        {
            let counsellorPermission = ['counsellor']
            if(Array.isArray(perProp)) {
                if(perProp.some((permission) => counsellorPermission.includes(permission))) {
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
}

export default CounsellorPermission