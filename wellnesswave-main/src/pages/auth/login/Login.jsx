import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import img1 from "../../../assets/images/Green-removebg-preview.png";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { signin } from "../../../redux/actions/authActions/authActions";

const Login = () => {
  const dispatch = useDispatch()
  const move = useNavigate();

  const [formData, setFormData] = useState({
    email: "", password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signin(formData, move))
    
  };
  return (
    <main className="w-full flex">
      <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <div className="flex items-center justify-center">
            <img
              src={img1}
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
      <div className="flex-1 flex items-center justify-center h-screen text-md">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="">
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-3xl font-bold">Log In</h3>
              <p className="text-md">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Signup
                </Link>
              </p>
            </div>
          </div>
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto"></p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Email:</label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password:</label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 text-white text-md duration-150 bg-indigo-600 rounded-full hover:bg-indigo-500 active:bg-indigo-700"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
