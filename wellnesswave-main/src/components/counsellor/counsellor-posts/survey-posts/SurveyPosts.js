import React from 'react';

const SurveyPosts = ({ posts }) => {
  return (
    <div className="w-full flex-col inline-block bg-indigo-50 pl-10 pt-10 pb-10">
      {posts?.map((post, i) => (
        <div className="w-3/5 mx-auto rounded-md border bg-white mb-5 border-black shadow-lg pt-5 pb-5 pr-5" key={i}>
          <h3 className="ml-5 text-indigo-800 mb-5 font-bold text-2xl underline">{post?.heading}</h3>
          <p className="ml-5 text-md italic overflow-y-auto">
            {post?.body}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SurveyPosts;
