const initialState = {
    posts: [],
    isLoading: false,
    error: null,
  };
  
export default (state = initialState, action) => 
{
    switch (action.type) {
        // Post Cases
        case "POSTS_REQUEST":
        state = {
            ...state,
            isLoading: true,
        };
        break;

        case "POSTS_SUCCESS":
        state = {
            ...state,
            posts: action.payload,
            isLoading: false,
        };
        break;

        case "POSTS_FAILURE":
        state = {
            ...state,
            isLoading: false,
            error: action.payload.error,
        };
        break;
    }    
    return state;
}