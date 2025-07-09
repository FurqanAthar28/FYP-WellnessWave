import React from 'react';

const Sidebar = ({ items, selected, onSelect }) => {
  return (
    <div className="fixed left-0 h-full z-10 bg-gray-100 w-48">
      <div className="flex flex-col bg-gray-100">
        {items.map((item, index) => (
          <div
            key={index}
            className={`py-2 px-4 cursor-pointer ${selected === item ? 'bg-blue-500 text-white' : 'text-gray-800 hover:bg-blue-100'}`}
            onClick={() => onSelect(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
