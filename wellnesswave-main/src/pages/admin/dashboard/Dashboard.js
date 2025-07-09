import React, { useState } from 'react';
import Sidebar from '../../../components/common/sidebar/Sidebar';
import Userlist from '../userlist/Userlist';

const Dashboard = () => {
  const [selected, setSelected] = useState('Users');
  const handleSelect = (item) => {
    setSelected(item);
  };

  return (
    <>
      <div className="flex h-full bg-gray-100">
        {/* Sidebar */}        
        <div className="fixed left-0 h-full z-10 bg-gray-100 w-48">
          <Sidebar items={['Users']} selected={selected} onSelect={handleSelect} />
        </div>

        {/* Main Content */}
        <div className="flex-1 h-full ml-48 overflow-y-auto"> {/* Adjust ml-48 based on your sidebar width */}
          {selected === 'Users' && <Userlist />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
