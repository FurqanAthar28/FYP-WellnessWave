import React, { useEffect, useState } from "react";
import {
  changePermission,
  fetchUsers,
} from "../../../redux/actions/adminActions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PendingUserlist from "../../../components/userlist/pending-userlist/PendingUserlist";
import ApprovedUserlist from "../../../components/userlist/approved-userlist/ApprovedUserlist";

const Userlist = () => {
  const dispatch = useDispatch();
  const admin = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const users = useSelector((state) => state?.admin?.users);

  // states
  const [selected, setSelected] = useState({
    type: "Approved",
    users: users?.filter((user)=> user.active && user.role !== 'admin'),
  });
  const userType = [
    { type: "Pending", users: users?.filter((user)=> !user.active && user.role !== 'admin') },
    { type: "Approved", users: users?.filter((user)=> user.active && user.role !== 'admin') }
  ];
  const handleSelect = (item) => {
    setSelected(item);
  };

  const handlePermissionChange = async (userId) =>{
    await dispatch(changePermission(token, admin._id, userId, users))
    await getUsers();
  }

  // Fetch All Users.
  const getUsers = async () => {
    dispatch(fetchUsers(token));
  };

  useEffect(() => {
    async function getData() {
      // Call the getUsers function when the component mounts
      await getUsers();
    }
    getData();
  }, []);

  useEffect(() => {
    // Check if users is not empty and update selected state accordingly
    if (users.length > 0) {
      setSelected({ type: "Approved", users: users?.filter((user)=> user.active && user.role !== 'admin') });
    }
  }, [users]); // Add users as a dependency

  return (
    <>
      <div className="flex border-b border-slate-300">
        {userType.map((user, i) => (
          <div key={i} className="flex w-[50%] ">
            <div className="flex items-center justify-center w-full">
              <h2
                className={`text-2xl cursor-pointer font-semibold ${
                  selected?.type === user.type ? "text-indigo-600 border-b border-indigo-600" : "text-indigo-600"
                }`}
                onClick={() => handleSelect(user)}
              >
                {user.type}
              </h2>
            </div>
            <div className="line relative shadow shadow-slate-200 rounded-md bg-slate-200 top-[1px] w-[2px] h-[60px]"></div>
          </div>
        ))}
      </div>

      <div className="flex-1 rounded-lg overflow-y-auto bg-gray-100">
        {selected?.type === "Pending" && (
          <PendingUserlist
            selectedType={selected?.type}
            list={users?.filter((user) => !user.active && user.role !== "admin")}
          />
        )}

        {selected?.type === "Approved" && selected?.users?.length > 0 && (
            <ApprovedUserlist
              selectedType={selected?.type}
              approvedUsers= {users?.filter((user)=> user.active && user.role !== 'admin')}
              changePermission={handlePermissionChange}
            />
        )}
      </div>
    </>
  );
};

export default Userlist;
