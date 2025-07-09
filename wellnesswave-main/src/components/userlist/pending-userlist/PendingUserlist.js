import React from 'react'
import { useNavigate } from "react-router-dom";

const PendingUserlist = ({selectedType, list}) => {
  const move = useNavigate()
  
  const moveToDetails = (user) => {
    move('/user-details', { state: {user} });
  }

  return (
    <>
    {list.map((user) => (
      <div key={user?._id} className="flex border-2 text-black rounded-md px-4 py-2">
          <div className="text-center p-1 w-[230px] border cursor-pointer" 
          onClick={()=> moveToDetails(user)}
          >
            {user?.email}
          </div>
          {/* {(selectedType === 'Pending' || selectedType === 'Approved') && (
            <div className="text-center p-1 basis-20 border">
              <input
                type="checkbox"
                checked={user?.active}
                onChange={() => handlePermissionChange(user?._id)}
                className="cursor-pointer"
              />
            </div>
          )} */}
      </div>
    ))}
    </>
  )
}

export default PendingUserlist