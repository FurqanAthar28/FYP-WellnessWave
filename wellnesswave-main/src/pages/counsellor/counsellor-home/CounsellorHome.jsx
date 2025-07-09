import React, { useState } from 'react';
import Sidebar from '../../../components/common/sidebar/Sidebar';
import CounsellorPosts from '../counsellor-posts/CounsellorPosts';
import CounsellorAppointments from '../counsellor-appointments/CounsellorAppointments';

const CounsellorHome = () => {
  const [selected, setSelected] = useState('Posts');
  const handleSelect = (item) => {
    setSelected(item);
  };

  return (
    <div className="flex h-full bg-gray-100 ">
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 h-full overflow-y-auto "> {/* Adjust ml-48 based on your sidebar width */}
        <Sidebar items={['Posts','Appointments']} selected={selected} onSelect={handleSelect} />
        {selected === 'Posts' &&
          <div className ="flex">
            <div className = "left-0 h-full z-10 bg-gray-100 w-48"></div>
            <CounsellorPosts />
          </div> 
        }
        {selected === 'Appointments' && 
          <div className ="flex">
            <div className = "left-0 h-full z-10 bg-gray-100 w-48"></div>
            <CounsellorAppointments />
        </div> 
        }
      </div>
    </div>
  );
};

export default CounsellorHome;
