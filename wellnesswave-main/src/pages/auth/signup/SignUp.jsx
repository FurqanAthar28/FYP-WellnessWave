import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import img2 from "../../../assets/images/Green-removebg-preview.png";
import { signup } from "../../../redux/actions/authActions/authActions";
import { useDispatch } from "react-redux";
import StudentSignup from "../../../components/signup/student/StudentSignup";
import FacultySignup from "../../../components/signup/faculty/FacultySignup";
import StaffSignup from "../../../components/signup/staff/StaffSignup";
import CounsellorSignup from "../../../components/signup/counsellor/CounsellorSignup";

const SignUp = () => {
  const move = useNavigate();
  // State to track which form to display
  const [selectedOption, setSelectedOption] = useState("student");

  const [studentFormData, setStudentFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: 0,
    role: "student",
    // student
    rollNo: "",
    degree: "",
  });

  const [facultyFormData, setFacultyFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: 0,
    role: "faculty",
    // faculty
    employeeId: "",
    designation: "",
    department: "",
  });
  
  const [staffFormData, setStaffFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: 0,
    role: "staff",
    // staff
    employeeId: "",
    designation: ""
  });
  const [counsellorFormData, setCounsellorFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: 0,
    role: "counsellor",
    // staff
    employeeId: "",
    designation: ""
  });

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData;
    if (selectedOption === "student") {
      formData = studentFormData;
    } else if (selectedOption === "faculty") {
      formData = facultyFormData;
    } else if (selectedOption === "staff") {
      formData = staffFormData;
    } else if (selectedOption === "counsellor") {
      formData = counsellorFormData;
    }
  
    console.log("Form Data:", formData);
    signup(formData, move);
  };
  

  return (
    <main className="w-full flex">
      <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <div className="flex items-center justify-center">
            <img
              src={img2}
              width={150}
              height={150}
              className="w-100"
              alt="Wellness Wave"
            />
          </div>
          <div className=" mt-16 space-y-3">
            <h3 className="text-white text-4xl font-bold">Wellness Wave</h3>
            <p className="text-gray-300 text-md">
              Create an account and take a step for the betterment of your
              mental health.
            </p>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            filter: "blur(118px)",
          }}
        ></div>
      </div>

      <div className="flex-1 flex items-center justify-center h-screen text-md overflow-y-auto">
        <div className={`${selectedOption === 'student'? 'mt-[226px] mb-[50px]': 
                           selectedOption === 'faculty'? 'mt-[320px] mb-[50px]':
                           'mt-[227px] mb-[50px]'
        }  w-full max-w-md space-y-4 px-4 bg-white text-gray-600 sm:px-0`}>
          <div className="">
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-3xl font-bold">Sign Up</h3>

              <div className="flex ml-[0px] relative right-[7px]">
                <NavLink
                  onClick={() => handleOptionChange("student")}
                  className="mx-1 px-4 py-1 text-white duration-150 rounded-full bg-indigo-500 active:bg-indigo-700 text-md"
                >
                  Student
                </NavLink>
                <NavLink
                  onClick={() => handleOptionChange("faculty")}
                  className="mx-1 px-4 py-1 text-white duration-150 rounded-full bg-indigo-500 active:bg-indigo-700 text-md"
                >
                  Faculty
                </NavLink>
                <NavLink
                  onClick={() => handleOptionChange("staff")}
                  className="mx-1 px-4 py-1 text-white duration-150 rounded-full bg-indigo-500 active:bg-indigo-700 text-md"
                >
                  Staff
                </NavLink>
                {/* <NavLink
                  onClick={() => handleOptionChange("counsellor")}
                  className="mx-1 px-4 py-1 text-white duration-150 rounded-full bg-indigo-500 active:bg-indigo-700 text-md"
                >
                  Counsellor
                </NavLink> */}
              </div>
              <p className="text-md">
                Already have an account? 
                <Link
                  to="/"
                  className="ml-2 font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>

          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto"></p>
          </div>

          <div>

            {/* Conditional rendering of signup forms */}
            {selectedOption === "student" && (
              <StudentSignup
                formData={studentFormData}
                setFormData={setStudentFormData}
                handleSubmit={handleSubmit}
              />
            )}
            {selectedOption === "faculty" && (
              <FacultySignup
                formData={facultyFormData}
                setFormData={setFacultyFormData}
                handleSubmit={handleSubmit}
              />
            )}
            {selectedOption === "staff" && (
              <StaffSignup
                formData={staffFormData}
                setFormData={setStaffFormData}
                handleSubmit={handleSubmit}
              />
            )}
            {selectedOption === "counsellor" && (
              <CounsellorSignup
                formData={counsellorFormData}
                setFormData={setCounsellorFormData}
                handleSubmit={handleSubmit}
              />
            )}

          </div>

        </div>
      </div>
    </main>
  );
};

export default SignUp;
