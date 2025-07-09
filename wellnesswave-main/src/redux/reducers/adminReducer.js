const initialState = {
    users: [],
    pendingUsers:[],
    approvedUsers:[],
    students:[],
    faculty:[],
    staff:[],
    counsellors:[],
    loading: false,
    error: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case "USERS_REQUEST":
        state = {
          ...state,
          loading: true,
        };
        break;
  
      case "USERS_SUCCESS":
        state = {
          ...state,
          users: action.payload.users,
          pendingUsers: action.payload.pendingUsers,
          approvedUsers: action.payload.approvedUsers,
          students: action.payload.students,
          faculty: action.payload.faculty,
          staff: action.payload.staff,
          counsellors: action.payload.counsellors,
          loading: false,
        };
        break;
  
      case "USERS_FAILURE":
        state = {
          ...state,
          loading: false,
          error: action.payload.error,
        };
        break;

      case "UPDATE_USERS_REQUEST":
        state = {
          ...state,
          loading: true,
        };
        break;
  
      case "UPDATE_USERS_SUCCESS":
        state = {
          ...state,
          users: action.payload.users,
          loading: false,
        };
        break;
  
      case "UPDATE_USERS_FAILURE":
        state = {
          ...state,
          loading: false,
          error: action.payload.error,
        };
        break;
      
        case "UPDATE_COUNSELLORS_REQUEST":
        state = {
          ...state,
          loading: true,
        };
        break;
  
      case "UPDATE_COUNSELLORS_SUCCESS":
        state = {
          ...state,
          counsellors: action.payload.counsellors,
          loading: false,
        };
        break;
  
      case "UPDATE_COUNSELLORS_FAILURE":
        state = {
          ...state,
          loading: false,
          error: action.payload.error,
        };
        break;

      case "CLEAR_ADMIN":
        state = {
          ...initialState,
        };
        break;
    }
    return state;
  };
  