import axios from "axios";
import { serverUrl } from "../../../ServerLink";
import { showToast } from "../../../components/common/toasts/Toast";

export const fetchAllPosts = (token) =>{    
    return async (dispatch) => {
      try {
        dispatch({ type: "POSTS_REQUEST" });

        const response = await axios.get(`${serverUrl}/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("All Post",response.data.posts);

        if (response.status === 200) {
          const { posts } = response.data;
          dispatch({ type: "POSTS_SUCCESS", payload: posts });
        } 
        else {
          dispatch({
            type: "POSTS_FAILURE",
            payload: { error: response.data.message },
          });
        }
      } 
      catch (error) {
        console.error("Error fetching Posts:", error);
        dispatch({
            type: "POSTS_FAILURE",
            payload: { error: "Error fetching Posts:" },
        });
      }
    };
}
export const fetchAllPostsOfCounsellor = (token, counsellorId) =>{    
    return async (dispatch) => {
      try {
        dispatch({ type: "POSTS_REQUEST" });

        const response = await axios.get(`${serverUrl}/posts/counsellor/${counsellorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("All Post",response.data.posts);

        if (response.status === 200) {
          const { posts } = response.data;
          dispatch({ type: "POSTS_SUCCESS", payload: posts });
        } 
        else {
          dispatch({
            type: "POSTS_FAILURE",
            payload: { error: response.data.message },
          });
        }
      } 
      catch (error) {
        console.error("Error fetching Posts:", error);
        dispatch({
            type: "POSTS_FAILURE",
            payload: { error: "Error fetching Posts:" },
        });
      }
    };
}

export const createAPost = (data, posts,token) =>{    
    return async (dispatch) => {
      try {
        dispatch({ type: "POSTS_REQUEST" });

        const response = await axios.post(`${serverUrl}/posts`, data,{
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("Post",response.data.post);

        if (response.status === 201) {
          const { post } = response.data;
          // Dispatch success action if needed
          let updatedPosts = [...posts, post]
      
          dispatch({ type: "POSTS_SUCCESS", payload: updatedPosts });
          showToast(response.data.message, 'success');
        } 
        else {
          dispatch({
            type: "POSTS_FAILURE",
            payload: { error: response.data.message },
          });
        }
      } 
      catch (error) {
        console.error("Error fetching Posts:", error);
        dispatch({
            type: "POSTS_FAILURE",
            payload: { error: "Error fetching Posts:" },
        });
      }
    };
}

