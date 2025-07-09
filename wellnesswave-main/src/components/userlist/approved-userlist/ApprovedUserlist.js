import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCounsellorModal from "../../admin/modal/AddCounsellorModal";

const ApprovedUserlist = ({
  selectedType,
  approvedUsers,
  changePermission
}) => {
  const move = useNavigate();
  const [selectedSubType, setSelectedSubType] = useState("Students");

  // Modal states and functions
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(false)
  const openModal = () => {
    setShowModal(true)
  }

  const subs = [
    { type: "Students", users: approvedUsers.filter(user => user.role === "student") },
    { type: "Faculty", users: approvedUsers.filter(user => user.role === "faculty") },
    { type: "Staff", users: approvedUsers.filter(user => user.role === "staff") },
    { type: "Counsellors", users: approvedUsers.filter(user => user.role === "counsellor") },
  ];

  const handleSubTypeSelect = (subtype) => {
    setSelectedSubType(subtype);
  };

  const moveToDetails = (user) => {
    move("/user-details", { state: { user } });
  };

  const handleChange = (userId) => {
    changePermission(userId);
  };

  return (
    <>
      <div className="w-full flex-col bg-gray-100 pl-10 pt-10 pb-10">
        <div className="flex justify-center mb-3">
          {subs.map((subtype, index) => (
            <button
              key={index}
              className={`mr-3 px-3 py-1 rounded-md ${
                selectedSubType === subtype.type
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700"
              }`}
              onClick={() => handleSubTypeSelect(subtype.type)}
            >
              {subtype.type}
            </button>
          ))}
        </div>

        <div className="w-full flex-col inline-block">
          {subs.find(subtype => subtype.type === selectedSubType)?.users
            .map((user) => (
              <div
                key={user._id}
                className="flex border-2 text-black rounded-md px-4 py-2"
              >
                <div
                  className="text-center p-1 w-[230px] border cursor-pointer"
                  onClick={() => moveToDetails(user)}
                >
                  {user.email}
                </div>
                {selectedType === "Approved" && (
                  <div className="text-center p-1 basis-20 border">
                    <input
                      type="checkbox"
                      checked={user.active}
                      onChange={() => handleChange(user._id)}
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      {selectedSubType === "Counsellors" && (
        <button className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full shadow-lg" onClick={openModal}>
          Add Counsellor
        </button>
        )
      }

      <AddCounsellorModal show={showModal} handleClose={closeModal}/>
    </>
  );
};

export default ApprovedUserlist;
