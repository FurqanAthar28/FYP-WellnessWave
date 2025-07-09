import React, { useEffect, useState } from "react";
import img0 from "../../../assets/images/Green-removebg-preview.png";
import {ReactComponent as LogoutIcon} from "../../../assets/images/logout_button.svg"
import { Link } from "react-router-dom";
import { showToast } from "../toasts/Toast";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../../redux/actions/authActions/authActions";

const Navbar = () => {
  
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)  
  const [user, setUser] = useState()
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    setUser(storedUser)
  }, [auth])
  
  const signOut = () =>{
    dispatch(signout())
    showToast('Signed out Successfully', "success")
  }
  
  const renderUserLinks = () => {  
    return (
      <>
        <Link to="/home" className="mx-2 my-1.5 px-1.5 py-1 text-white italic font-semibold rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700">Home</Link>
        <Link to="/appointment-booking" className="mx-2 my-1.5 px-1.5 py-1 text-white italic font-semibold rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700">Appointment</Link>
        <Link to="/indicators" className="mx-2 my-1.5 px-1.5 py-1 text-white italic font-semibold rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700">Indicators</Link>  
      </>
    );
  };

  const renderAdminLinks = () =>{
    return (
      <>
        {/* <Link to="/dashboard" className="mx-2 my-1.5 px-1.5 py-1 text-white italic bg-indigo-200 font-semibold rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700">Users</Link>   */}
      </>
    ) 
  }

  const renderCounsellorLinks = () =>{
    return (
      <>
        <Link to="/counsellor-home" className="mx-2 my-1.5 px-1.5 py-1 text-white italic font-semibold rounded-lg hover:bg-indigo-500 active:bg-indigo-700">Home</Link>  
      </> 
    ) 
  }

  return (
    <>
      {user && (
        <nav className="w-full bg-indigo-900 p-3 h-28 flex sticky top-0 justify-between items-center z-50">
          <div>
            <img
              src={img0}
              width={80}
              height={60}
              alt="Logo"
              className="ml-5"
            />
          </div>
          <div className="flex ml-10 my-8 p-4">
            {user.role === 'admin' ? 
              renderAdminLinks() : 
              user.role === 'counsellor' ?
                renderCounsellorLinks() :
                renderUserLinks()
            }
          </div>
          <div className="flex items-center">
            <p className="text-white mr-5 font-style: italic">{user?.name}</p>
            <Link onClick={signOut} to="/" className="mx-2 my-1.5">
              <LogoutIcon className="" />
            </Link> 
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
