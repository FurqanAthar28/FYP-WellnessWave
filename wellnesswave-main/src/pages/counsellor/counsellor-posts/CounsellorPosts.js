import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createAPost, fetchAllPosts, fetchAllPostsOfCounsellor } from '../../../redux/actions/postActions/postActions';
import SurveyPosts from '../../../components/counsellor/counsellor-posts/survey-posts/SurveyPosts';
import ExercisePosts from '../../../components/counsellor/counsellor-posts/exercise-posts/ExercisePosts';
import AddPostModal from '../../../components/counsellor/modals/AddPostModal';

const CounsellorPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);
  const user = JSON.parse(localStorage.getItem("user")); 
  const token = localStorage.getItem("token"); 
  const [selected, setSelected] = useState('Survey');

  const handleSelect = (item) => {
    setSelected(item);
  };

  // Modal states and functions
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(false)
  const openModal = () => {
      console.log("Modal opened")
      setShowModal(true)
  }
  const addPost = async (data) => {
    data = {...data, userId: user._id}
    await dispatch(createAPost(data, posts, token))
    await getPosts()
  }

  const getPosts = async () => {
    await dispatch(fetchAllPostsOfCounsellor(token, user._id));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (user && token) {
        await getPosts();
      }
    };
    fetchPosts()
  }, []);

  return (
    <>
    <div className= "flex flex-col w-full">
      <div className='flex rounded-md justify-center h-[70px] shadow-md shadow-slate-300'>
        <div className='headings flex w-[50%] '>
          <div className='flex items-center justify-center w-full'>
            <h2 className='text-2xl text-indigo-600 cursor-pointer font-semibold' onClick={() => handleSelect('Survey')}>
              Surveys
            </h2>
          </div>
        </div>
        <div className='line relative shadow shadow-slate-200 rounded-md bg-slate-200 top-[6px] w-[2px] h-[60px]'></div>
        <div className='headings flex w-[50%] '>
          <div className='flex items-center justify-center w-full'>
            <h2 className='text-2xl text-indigo-600 cursor-pointer font-semibold' onClick={() => handleSelect('Exercise')}>
              Exercise
            </h2>
          </div>
        </div>
      </div>

      {/* Conditional rendering based on selected state */}
      {selected === 'Survey' && <SurveyPosts posts={posts.filter((post) => post.type === 'Survey')}/>}
      {selected === 'Exercise' && <ExercisePosts posts={posts.filter((post) => post.type === 'Exercise')}/>}

      {/* Add button for opening modal */}
      <button className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full shadow-lg" onClick={openModal}>
        Add Post
      </button>

      <AddPostModal show={showModal} handleClose={closeModal} handlePost={addPost}/>
    </div>

    </>
  );
};

export default CounsellorPosts;
