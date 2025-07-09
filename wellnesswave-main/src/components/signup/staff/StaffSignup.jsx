import React from 'react'

const StaffSignup = ({ formData, setFormData, handleSubmit }) => {


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
    <div>
      <label className="font-medium">Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
      />
    </div>
    <div>
      <label className="font-medium">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
      />
    </div>
    <div>
      <label className="font-medium">Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
      />
    </div>
    <div>
      <label className="font-medium">Contact:</label>
      <input
        type="number"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        maxLength={11}
        minLength={11}
        required
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
      />
    </div>
    <div>
      <label className="font-medium">Employee Id:</label>
      <input
        type="text"
        name="employeeId"
        value={formData.employeeId}
        onChange={handleChange}
        required
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
      />
    </div>
    <div>
      <label className="font-medium">Designation:</label>
      <input
        type="text"
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        required
        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
      />
    </div>
    <button
      type="submit"
      className="px-5 py-3 text-white duration-150 bg-indigo-600 rounded-full hover:bg-indigo-500 active:bg-indigo-700 text-md"
    >
      Sign Up
    </button>
  </form>
  )
}

export default StaffSignup