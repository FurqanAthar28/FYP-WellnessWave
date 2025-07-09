import React, { useState } from 'react';

const ExercisePosts = ({ posts }) => {
  const [selected, setSelected] = useState('Depression');
  const subs = ['Depression', 'Anxiety', 'Panic Attacks'];

  const handleSubTypeSelect = (subtype) => {
    setSelected(subtype);
  };

  const filteredPosts = posts.filter((post) => post.subType === selected);

  return (
    <div className="w-full flex-col bg-indigo-50 pl-10 pt-10 pb-10">
      <div className="flex justify-center mb-3">
        {subs.map((subtype, index) => (
          <button
            key={index}
            className={`mr-3 px-3 py-1 rounded-md ${
              selected === subtype ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700'
            }`}
            onClick={() => handleSubTypeSelect(subtype)}
          >
            {subtype}
          </button>
        ))}
      </div>

      <div className="w-full flex-col inline-block">
        {filteredPosts.map((post, i) => (
          <div className="w-3/5 mx-auto rounded-md border bg-white mb-5 border-black shadow-lg pt-5 pb-5 pr-5" key={i}>
            <h3 className="ml-5 text-indigo-800 mb-5 font-bold text-2xl underline">{post?.heading}</h3>
            <p className="ml-5 text-md italic overflow-y-auto">{post?.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExercisePosts;
