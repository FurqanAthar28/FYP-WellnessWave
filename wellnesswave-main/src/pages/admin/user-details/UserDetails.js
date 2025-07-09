import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { fetchAllCounsellorAppointmentsForAdmin, fetchUserAppointments } from "../../../redux/actions/appointmentActions/appointmentActions";
import { useDispatch, useSelector } from "react-redux";
import { assignCounsellorToUser, changePermission, fetchCounsellors, fetchOneUser } from "../../../redux/actions/adminActions/adminActions";
import { showToast } from "../../../components/common/toasts/Toast";

const UserDetails = () => {
  const dispatch = useDispatch();
  const move = useNavigate();
  const location = useLocation(); // Hook to access location and route state
  const admin = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  
  const users = useSelector((state) => state?.admin?.users);
  const counsellors = useSelector((state) => state?.admin?.counsellors);

  const { user } = location.state;
  const [userData, setUserData] = useState(user)
  const [userAppointments, setUserAppointments] = useState()
  const [counsellorAppointments, setCounsellorAppointments] = useState()

  console.log("Counsellor Appointments:",counsellorAppointments)
  const moveBack = () => {
    move(-1);
  };
  const handlePermissionChange = async (userId) => {

    if(!userData.counsellorId && userData.role !== 'counsellor') {
      showToast("First assign counsellor to user","error")
      return;
    }
    await dispatch(changePermission(token, admin._id, userId, users));
    await getUser()
    await getCounsellors()
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

  const getAppointments = async () => {
    const result = await fetchUserAppointments(token, user._id);
    if(result.success)    
        setUserAppointments(result.userAppointments)
  };
  
  const getCounsellorAppointments = async () => {
    const result = await fetchAllCounsellorAppointmentsForAdmin(token, user._id);
    if(result.success)    
      setCounsellorAppointments(result.counsellorAppointments)
  };
  
  const getCounsellors = async () => {
    await fetchCounsellors(token);
  };
  
  const getUser = async () => {
    const result = await fetchOneUser(token,user._id);
    console.log("Response For User:",result)
    if(result.success)    
        setUserData(result.user)
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (admin && token) {
          await getAppointments();
        }
      } catch (error) {
        console.error("Error Fetching Appointments:", error);
      }
    };
    const fetchCounsellorAppointments = async () => {
      try {
        if (admin && token) {
          await getCounsellorAppointments();
        }
      } catch (error) {
        console.error("Error Fetching Appointments:", error);
      }
    };
    const fetchCounsellors = async () => {
      try {
        if (admin && token) {
          await getCounsellors();
        }
      } catch (error) {
        console.error("Error Fetching Counsellors:", error);
      }
    };

    fetchAppointments();
    fetchCounsellorAppointments()
    fetchCounsellors();
  }, [admin ]);
    
  const CounsellorAssignment = () => {
    const assignedCounsellor = userData.counsellorId
    ? counsellors?.find((counsellor) => counsellor?._id === userData?.counsellorId)
    : undefined;

      return (
        <div className="w-full flex justify-center">
          <select
            className="block w-full mt-2 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-indigo-600"
            onChange={(e) => handleAssignCounsellor(e.target.value)}
          >
            {assignedCounsellor ? (
              <option value={assignedCounsellor._id}>{assignedCounsellor.name}</option>
            ) : (
              <option value="">Select Counsellor</option>
            )}       
            {assignedCounsellor? ( counsellors?.filter((counsellor) => counsellor._id !== assignedCounsellor._id).map((counsellor) => (
              <option key={counsellor?._id} value={counsellor?._id}>
                {counsellor?.name}
              </option>
            ))):(
              counsellors?.map((counsellor) => (
                <option key={counsellor?._id} value={counsellor?._id}>
                  {counsellor?.name}
                </option>
              ))
            )}
            
          </select>
        </div>
      );  
  };
  
  const handleAssignCounsellor = async (counsellorId) => {
    const assignedCounsellorId = counsellorId
    // Logic to assign the selected counsellor to the user
    dispatch(assignCounsellorToUser(token, admin._id, userData._id, assignedCounsellorId, users));
    await getUser(); // Refresh user data after assignment
    await getCounsellors()
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full lg:w-2/3 xl:w-1/2">
          <div className="flex justify-between items-center">
            <h1 className="text-indigo-600 text-center my-4 text-4xl font-bold">
              User Details
            </h1>
            <FaArrowAltCircleLeft
              size={40}
              className="mt-2 cursor-pointer"
              onClick={moveBack}
            />
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="py-2 px-4 bg-gray-100 font-medium">Name:</td>
                <td className="py-2 px-4">{userData.name}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-2 px-4 bg-gray-100 font-medium">Email:</td>
                <td className="py-2 px-4">{userData.email}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-2 px-4 bg-gray-100 font-medium">Contact:</td>
                <td className="py-2 px-4">{userData.contact}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-2 px-4 bg-gray-100 font-medium">Approved:</td>
                <td className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={userData?.active}
                    onChange={() => handlePermissionChange(userData?._id)}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
              {userData.role === "faculty" && (
                <>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 bg-gray-100 font-medium">
                      Employee ID:
                    </td>
                    <td className="py-2 px-4">
                      {userData.facultyDetails.employeeId}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 bg-gray-100 font-medium">
                      Designation:
                    </td>
                    <td className="py-2 px-4">
                      {userData.facultyDetails.designation}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 bg-gray-100 font-medium">
                      Assigned Counsellor
                    </td>
                    <td className="py-2 px-4">
                      {CounsellorAssignment( )}
                    </td>
                  </tr>  
                </>
              )}
              {userData.role === "staff" && (
                <>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 bg-gray-100 font-medium">
                      Employee ID:
                    </td>
                    <td className="py-2 px-4">
                      {userData.staffDetails.employeeId}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 bg-gray-100 font-medium">
                      Designation:
                    </td>
                    <td className="py-2 px-4">
                      {userData.staffDetails.designation}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 bg-gray-100 font-medium">
                      Department:
                    </td>
                    <td className="py-2 px-4">
                      {userData.staffDetails.department}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 bg-gray-100 font-medium">
                      Assigned Counsellor
                    </td>
                    <td className="py-2 px-4">
                      {CounsellorAssignment( )}
                    </td>
                  </tr>  
                </>
              )}
              {userData.role === "student" && (
                <>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 bg-gray-100 font-medium">
                      Roll No:
                    </td>
                    <td className="py-2 px-4">{userData.studentDetails.rollNo}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 bg-gray-100 font-medium">
                      Degree:
                    </td>
                    <td className="py-2 px-4">{userData.studentDetails.degree}</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 bg-gray-100 font-medium">
                      Assigned Counsellor
                    </td>
                    <td className="py-2 px-4">
                      {CounsellorAssignment()}
                    </td>
                  </tr>                  
                </>
              )}
              {userData.role === "counsellor" && (
                <>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 bg-gray-100 font-medium">
                      Employee ID:
                    </td>
                    <td className="py-2 px-4">
                      {userData.counsellorDetails.employeeId}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-2 px-4 bg-gray-100 font-medium">
                      Designation:
                    </td>
                    <td className="py-2 px-4">
                      {userData.counsellorDetails.designation}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          {user.role !== 'counsellor' && userAppointments?.length > 0 ? (
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
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Attendance</th>

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
                      <td className="border pl-[50px] py-[5px]">{appointment.status}</td>
                      <td className="border pl-[50px] py-[5px]">{appointment.attendance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            user.role !== "counsellor" && (
              <p className="mt-8 text-gray-600">No appointments booked yet.</p>)
          )}
          {user.role === 'counsellor' && counsellorAppointments?.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-indigo-800 mb-2">
                Booked Appointments:
              </h3>
              <table className="w-full border-collapse border border-gray-800">
                <thead className="text-white">
                  <tr className="bg-indigo-800">
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Starting Time</th>
                    <th className="border p-2">Ending Time</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {counsellorAppointments
                  .sort((a, b) => new Date(a.startTime) - new Date(b.startTime)) // Sort appointments by date
                  .map((appointment, index) => (
                    <tr key={index}>
                      <td className="border pl-[50px] py-[5px]">{appointment.userId.name}</td>
                      <td className="border pl-[50px] py-[5px]">{formatDate(appointment.date, 1)}</td>
                      <td className="border pl-[50px] py-[5px]">{formatTime(appointment.startTime)}</td>
                      <td className="border pl-[50px] py-[5px]">{formatTime(appointment.endTime)}</td>
                      <td className="border pl-[50px] py-[5px]">{appointment.status}</td>
                      <td className="border pl-[50px] py-[5px]">{appointment.attendance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            user.role === "counsellor" && (
              <p className="mt-8 text-gray-600">No appointments booked yet.</p>)
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
